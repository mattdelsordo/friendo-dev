/**
 * Friendo class
 * Stores friendo stats, renders friendo at some desired coordinates
 */

/* eslint-disable no-console */

import { LEVEL_MAX, MAX_DOGS, STATS } from './constants'
import { Dog, calcDogX, calcDogY } from '../art/props/dog'
import selectElement from './element/select-element'
import loadState from './state/load-state'
import {
  DEFAULT_NAME,
  DEFAULT_OWNER,
  DEFAULT_STATS,
  DEFAULT_ELEMENT,
  DEFAULT_HOOK,
  DEFAULT_STATE,
  DEFAULT_STAT_STAGES,
  DEFAULT_LEVEL,
} from './default'

export default class Friendo {
  // constructor takes context on which to draw
  constructor(json) {
    this.name = DEFAULT_NAME
    this.owner = DEFAULT_OWNER
    this.element = DEFAULT_ELEMENT

    // set stat defaults
    this._stats = Object.assign({}, DEFAULT_STATS)
    // stat stages are cached rather than recomputed on each draw
    this._statStage = Object.assign({}, DEFAULT_STAT_STAGES)
    this.level = DEFAULT_LEVEL

    // set state
    this.state = DEFAULT_STATE

    // if JSON is passed in, load
    if (json) {
      console.log(`Loading Friendo from ${json}`)

      const fromJSON = JSON.parse(json)
      // console.log(typeof fromJSON)
      // console.log(`Stats: ${fromJSON.stats}`)
      // console.log(`Name: ${fromJSON.name}`)
      // console.log(`Owner: ${fromJSON.owner}`)
      // console.log(`Element: ${fromJSON.element}`)
      this._stats = fromJSON.stats
      this.state = loadState(fromJSON.state, fromJSON.state.id)
      this.name = fromJSON.name
      this.owner = fromJSON.owner
      this.element = selectElement(fromJSON.element)
    }

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
    this._statStage[stat] = (this._stats[stat] > 0 ? Math.floor(this._stats[stat] / 10) + 1 : 0)
  }

  // calls setStatStage on every stat
  // should only be called by the constructor
  initializeStatStages() {
    Object.keys(this._stats).forEach((key) => {
      this.setStatStage(key)
    })
  }

  computeLevel() {
    // sum stats but skip first level
    const statSum = Object.values(this._stats).reduce((l, r) => Number(l) + (r < 2 ? 0 : r - 1))

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

  handleAction(action) {
    this.state.handleAction(action, this)
  }
}
