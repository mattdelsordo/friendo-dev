/**
 * Friendo class
 * Stores friendo stats, renders friendo at some desired coordinates
 */

/* eslint-disable no-console */

import { EXP_THRESHOLD, LEVEL_MAX, LVL_CALC_WHITELIST, MAX_DOGS, STATS } from './constants'
import { Dog, calcDogX, calcDogY } from '../art/props/dog'
import selectElement from './element/select-element'
import loadState from './state/load-state'
import getZodiac from './horoscope/get-zodiac'
import {
  DEFAULT_NAME,
  DEFAULT_OWNER,
  DEFAULT_STATS,
  DEFAULT_ELEMENT,
  DEFAULT_HOOK,
  DEFAULT_STATE,
  DEFAULT_STAT_STAGES,
  DEFAULT_LEVEL,
  DEFAULT_ENERGY,
  DEFAULT_MAX_ENERGY,
  DEFAULT_EXP,
} from './default'
import { exercise } from './actions'

export default class Friendo {
  // helper method to create a friendo based on character creation
  static newFriendo(name, owner, element) {
    return new Friendo(JSON.stringify({ name, owner, element }))
  }

  // constructor takes context on which to draw
  constructor(json) {
    // initialize friendo from save file
    console.log(`Loading Friendo from ${json}`)
    const fromJSON = JSON.parse(json || '{}')
    this._stats = fromJSON.stats || Object.assign({}, DEFAULT_STATS)
    this.state = fromJSON.state ? loadState(fromJSON.state, fromJSON.state.id) : DEFAULT_STATE
    this.name = fromJSON.name || DEFAULT_NAME
    this.owner = fromJSON.owner || DEFAULT_OWNER
    this.element = fromJSON.element ? selectElement(fromJSON.element) : DEFAULT_ELEMENT
    this.zodiac = fromJSON.zodiac ? getZodiac(fromJSON.zodiac) : getZodiac()
    this.energy = fromJSON.energy || DEFAULT_ENERGY
    this.exp = fromJSON.exp || DEFAULT_EXP

    // set default derived values
    this._statStage = Object.assign({}, DEFAULT_STAT_STAGES)
    this.level = DEFAULT_LEVEL
    this.maxEnergy = DEFAULT_MAX_ENERGY

    // initialize stat stages, level, and anchors
    this.initializeStatStages()
    this.updateLevel()
    this.element.computeAnchors(this)
  }

  // converts ya boi to a JSON string
  toJSON() {
    return {
      name: this.name,
      owner: this.owner,
      element: this.element,
      stats: this._stats,
      state: this.state,
      zodiac: this.zodiac,
      energy: this.energy,
      exp: this.exp,
    }
  }

  setElement(element) {
    this.element = selectElement(element)
    this.element.computeAnchors(this)
    console.log(`Element set to ${this.element}`)
  }

  // stat stage is used to draw the friendo
  setStatStage(stat) {
    // stage 1 starts at 1, and then in 10 level increments
    this._statStage[stat] =
      (this._stats[stat] > 0 ? Math.floor(this._stats[stat] / 10) + 1 : 0)
  }

  // calls setStatStage on every stat
  // should only be called by the constructor
  initializeStatStages() {
    Object.keys(this._stats).forEach((key) => {
      this.setStatStage(key)
    })
  }

  computeLevel() {
    // compute cumulative sum but skip the first level of each stat
    // only sum up stats that are exposed to the user, e.g. not egg, energy, etc.
    const statSum = LVL_CALC_WHITELIST.reduce((l, r) =>
      Number(l) + (this._stats[r] < 2 ? 0 : this._stats[r] - 1), 0)

    // if the sum of all stats is less than one, skip rest of calcs
    if (statSum < 1) return 0

    const level = Math.floor((statSum / LEVEL_MAX) * 100) + 1

    // if level is greater than 100, just print a star
    if (level > 100) return String.fromCharCode(0x2605)
    return level
  }

  // compute level and set it in the friendo
  updateLevel() {
    this.level = this.computeLevel()
  }

  // sets the value of a stat
  setStat(stat, value) {
    this._stats[stat] = value
    // recompute stage of stat
    this.setStatStage(stat)
    // recompute level
    this.updateLevel()
    // remember to recompute anchors for drawing
    this.element.computeAnchors(this)
  }

  getStat(stat) {
    return this._stats[stat]
  }

  // For calculating rank-ups, since they happen in 10 stat intervals
  getStatStage(stat) {
    return this._statStage[stat]
  }

  // returns percentage of energy the friendo currently has
  getEnergyLeft() {
    return this.energy / this.maxEnergy
  }

  // adds energy to the friendo's reserve
  modifyEnergy(amnt) {
    if (amnt + this.energy >= this.maxEnergy) this.energy = this.maxEnergy
    else if (this.energy + amnt <= 0) this.energy = 0
    else this.energy = this.energy + amnt
  }

  // adds exp for a given stat
  addExp(stat, amnt) {
    if (stat in this.exp) {
      // increment exp amount
      this.exp[stat] += amnt

      // check to see if a levelup is possible
      const threshold = EXP_THRESHOLD[this._stats[stat]]
      if (this.exp[stat] >= threshold) {
        this.exp[stat] -= threshold
        this.setStat(stat, this._stats[stat] + 1)
      }
    }
  }

  // Initialize pet dogs for the eventuality of them existing
  initializeDogs(canvasW, canvasH) {
    this.petDogs = {
      dog: [],
      location: [],
    }

    for (let i = 0; i < MAX_DOGS; i += 1) {
      this.petDogs.dog.push(new Dog())
      this.petDogs.location.push({ x: calcDogX(0, canvasW), y: calcDogY(0, canvasH) })
    }
  }

  // draws the friendo to the context specified by g at specified coordinate
  draw(canvas, context, x = DEFAULT_HOOK.x, y = DEFAULT_HOOK.y) {
    // draw dog(s)
    if (!this.petDogs) this.initializeDogs(canvas.width, canvas.height)
    else {
      const { dog, location } = this.petDogs
      for (let i = 0, j = 0; j < this.getStatStage(STATS.DOG) && i < dog.length; j += 2, i += 1) {
        dog[i].paint(context, location[i].x, location[i].y)
      }
    }

    // draw the friendo
    this.state.draw(context, x, y, this)
  }

  setState(id) {
    this.state = loadState(this.state, id)
  }

  /**
   * Changes state and begins a new exercise routine
   * @param action - id of state/exercise to do
   * @param reps - # of reps to do
   * @param everyRep - function to execute on every rep (save, update UI)
   * @param end - function to call once complete (updateUI)
   */
  startExercise(action, reps = 1, everyRep, end) {
    // change state and then save
    this.setState(action)
    this.state.setReps(reps)
    everyRep(this)

    // start exercise at (reps-1) because the way they're set up
    // the 0th rep gets performed
    exercise(this, action, reps - 1, everyRep, () => {
      // reset state and then save
      this.setState(this.state.returnTo)
      everyRep(this)
      end()
    })
  }
}
