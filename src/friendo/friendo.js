/**
 * Friendo class
 * Stores friendo stats, renders friendo at some desired coordinates
 */

/* eslint-disable no-console */

import {
  LEG_UNLOCK_LEVEL,
  ARM_UNLOCK_LEVEL,
  HAIR_UNLOCK_LEVEL,
  DOG_UNLOCK_LEVEL,
  LEVEL_MAX,
  LVL_CALC_WHITELIST,
  MAX_DOGS,
  MAX_EGG_LEVEL,
  STATS,
  STAT_MAX,
  ENERGY_PER_LEVEL,
  STAT_STAGES,
  getExpCurve, MEME_EXP_MODIFIER, TASTE_ENERGY_MODIFIER,
} from './constants'
import { Dog, calcDogX, calcDogY } from './art/props/dog'
import selectElement from './element/select-element'
import loadState from './state/load-state'
import getZodiac from './horoscope/get-zodiac'
import {
  DEFAULT_NAME,
  DEFAULT_OWNER,
  DEFAULT_STATS,
  DEFAULT_ELEMENT,
  DEFAULT_STATE,
  DEFAULT_STAT_STAGES,
  DEFAULT_LEVEL,
  DEFAULT_FATIGUE,
  DEFAULT_MAX_ENERGY,
  DEFAULT_EXP,
  DEFAULT_ZODIAC,
} from './default'
import { exercise } from './actions'
import { ID as idleID } from './state/idle/idle'

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
    this.zodiac = fromJSON.zodiac ? getZodiac(fromJSON.zodiac) : DEFAULT_ZODIAC
    this.fatigue = fromJSON.fatigue || DEFAULT_FATIGUE
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
      fatigue: this.fatigue,
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
    const stages = STAT_STAGES[stat]

    // case where stat is scalar
    if (stages.length === 1) this._statStage[stat] = this.getStat(stat)
    else {
      // stage = index of largest threshold less than or equal to the stat level
      let stage = 0

      for (let i = 0; i < stages.length; i += 1) {
        if (this.getStat(stat) >= stages[i]) {
          stage = i + 1 // the stat stages are 1-indexed so you gotta correct
        }
      }

      this._statStage[stat] = stage
    }
  }

  // calls setStatStage on every stat
  // should only be called by the constructor
  initializeStatStages() {
    Object.keys(this._stats).forEach((key) => {
      this.setStatStage(key)
    })
  }

  computeLevel() {
    // if core == 0, we're still an egg
    if (this.getStat(STATS.CORE) === 0) return 0

    // compute cumulative sum but skip the first level of each stat
    // only sum up stats that are exposed to the user, e.g. not egg, energy, etc.
    const statSum = LVL_CALC_WHITELIST.reduce((l, r) =>
      Number(l) + (this._stats[r] < 2 ? 0 : this._stats[r] - 1), 1)

    // if the sum of all stats is less than one, skip rest of calcs
    if (statSum < 1) return 0

    const level = Math.floor((statSum / LEVEL_MAX) * 100) + 1

    // if level is greater than 100, just print a star
    if (level > 100) return String.fromCharCode(0x2605)
    return level
  }

  // maxumum energy is the default + 5 per every level past 1
  computeMaxEnergy() {
    // disregard level 0-1 in calcs, don't factor lvl in in to calc
    return DEFAULT_MAX_ENERGY
      + (this.level > 1 ? ((this.level * ENERGY_PER_LEVEL) - ENERGY_PER_LEVEL) : 0)
  }

  // compute level and set it in the friendo
  // also compute energy
  updateLevel() {
    this.level = this.computeLevel()
    this.maxEnergy = this.computeMaxEnergy()

    // check to see if any stats are unlocked
    if (this.getStat(STATS.LEG) < 1 && this.level >= LEG_UNLOCK_LEVEL) this.setStat(STATS.LEG, 1)
    if (this.getStat(STATS.ARM) < 1 && this.level >= ARM_UNLOCK_LEVEL) this.setStat(STATS.ARM, 1)
    if (this.getStat(STATS.HAIR) < 1 && this.level >= HAIR_UNLOCK_LEVEL) this.setStat(STATS.HAIR, 1)
    if (this.getStat(STATS.DOG) < 1 && this.level >= DOG_UNLOCK_LEVEL) this.setStat(STATS.DOG, 1)
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
    if (stat in this._stats) return this._stats[stat]
    return 0
  }

  // For calculating rank-ups, since they happen in 10 stat intervals
  getStatStage(stat) {
    if (stat in this._statStage) return this._statStage[stat]
    return 0
  }

  // returns percentage of energy the friendo currently has
  getEnergyPercent() {
    return (this.maxEnergy - this.fatigue) / this.maxEnergy
  }

  // exp multiplier based off taste level
  getFoodMultiplier() {
    return 1 + (this.getStat(STATS.TASTE) * TASTE_ENERGY_MODIFIER)
  }

  /**
   * Adds energy to the friendo's reserve
   * @param amnt - amount of fatigue to remove
   * @param feed - whether or not to factor in taste multiplier
   */
  modifyFatigue(amnt, feed = false) {
    const newAmnt = feed ? (amnt * this.getFoodMultiplier()) : amnt
    if (this.fatigue - newAmnt >= this.maxEnergy) this.fatigue = this.maxEnergy
    else if (this.fatigue - newAmnt <= 0) this.fatigue = 0
    else this.fatigue = this.fatigue - newAmnt
  }

  // exp multiplier based off meme tolerance
  getExpMultiplier() {
    return 1 + (this.getStat(STATS.MEME) * MEME_EXP_MODIFIER)
  }

  // adds exp for a given stat
  addExp(stat, amnt) {
    if (stat in this.exp) {
      // do nothing if stat is maxed out
      if (stat === STATS.EGG && this.getStat(STATS.EGG) === MAX_EGG_LEVEL) return
      else if (this.getStat(STATS.EGG) === STAT_MAX) return

      // increment exp amount, multiplied by a factor based on meme-tolerance
      this.exp[stat] += amnt * this.getExpMultiplier() * this.zodiac.getStatBonus(stat)

      // check to see if a levelup is possible
      const threshold = getExpCurve(stat)[this._stats[stat]]
      if (this.exp[stat] >= threshold) {
        this.exp[stat] -= threshold
        this.setStat(stat, this._stats[stat] + 1)
      }
    }
  }

  getExp(stat) {
    if (stat in this.exp) return this.exp[stat]
    return 0
  }

  // returns exp as a percentage of the exp needed for the level
  getExpPercent(stat) {
    if (stat in this.exp) {
      return this.exp[stat] / getExpCurve(stat)[this._stats[stat]]
    }
    return 0
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
  draw(canvas, context, x = canvas.width / 2, y = canvas.height * (7 / 8)) {
    // draw dog(s)
    if (!this.petDogs) this.initializeDogs(canvas.width, canvas.height)
    else {
      const { dog, location } = this.petDogs
      for (let i = 0; i < this.getStatStage(STATS.DOG) && i < dog.length; i += 1) {
        dog[i].paint(context, location[i].x, location[i].y)
      }
    }

    // draw the friendo
    this.state.draw(context, x, y, this)
  }

  setState(id) {
    this.state = loadState(this.state, id)
  }

  // performs behaviors associated with hatching the egg and
  // ending the tutorial
  hatch() {
    this.setStat(STATS.CORE, 1)
    this.setStat(STATS.SIGHT, 1)
    this.setStat(STATS.TASTE, 1)
    this.setStat(STATS.MEME, 1)
    this.setState(idleID)
    this.zodiac = getZodiac()
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
      // if egg is maxed out, enable starting levels set state to idle
      if (this.getStat(STATS.CORE) === 0 && this.getStat(STATS.EGG) === MAX_EGG_LEVEL) {
        this.hatch()
      } else {
        // reset state and then save
        this.setState(this.state.returnTo)
      }
      everyRep(this, false)
      end()
    })
  }
}
