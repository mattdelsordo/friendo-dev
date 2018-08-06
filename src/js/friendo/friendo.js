// @flow

/**
 * Friendo class
 * Stores friendo stats, renders friendo at some desired coordinates
 */

import { STATS } from './constants'
import paintDogs from '../art/dog'
import selectElement from './element/select-element'
import loadState from './state/load-state'
import {
  DEFAULT_NAME,
  DEFAULT_OWNER,
  DEFAULT_STATS,
  DEFAULT_ELEMENT,
  DEFAULT_HOOK,
  DEFAULT_STATE,
} from './default'

export default class Friendo {
  // constructor takes context on which to draw
  constructor(json) {
    this.name = DEFAULT_NAME
    this.owner = DEFAULT_OWNER
    this.element = DEFAULT_ELEMENT

    // set stat defaults
    this.stats = Object.assign({}, DEFAULT_STATS)

    // set state
    this.state = DEFAULT_STATE

    // if JSON is passed in, load
    if (json) {
      console.log(`Loading Friendo from ${json}`)

      let fromJSON = JSON.parse(json)
      // console.log(typeof fromJSON)
      // console.log(`Stats: ${fromJSON.stats}`)
      // console.log(`Name: ${fromJSON.name}`)
      // console.log(`Owner: ${fromJSON.owner}`)
      // console.log(`Element: ${fromJSON.element}`)
      this.stats = fromJSON.stats
      this.state = loadState(fromJSON.state)
      this.name = fromJSON.name
      this.owner = fromJSON.owner
      this.element = selectElement(fromJSON.element)
      // remember to recompute anchors
      this.element.computeAnchors(this)
    }
  }

  // converts ya boi to a JSON string
  toJSON() {
    return {
      name: this.name,
      owner: this.owner,
      element: this.element,
      stats: this.stats,
      state: this.state,
    }
  }

  setElement = (element) => {
    this.element = selectElement(element)
    this.element.computeAnchors(this)
    console.log(`Element set to ${this.element}`)
  }

  // sets the value of a stat
  setStat = (stat, value) => {
    console.log(`${this.toJSON()}`)
    this.stats[stat] = value
    // remember to recompute anchors for drawing
    this.element.computeAnchors(this)
    console.log(`${stat} set to ${this.stats[stat]}`)
  }

  // draws the friendo to the context specified by g at specified coordinate
  draw = (canvas, context, x = DEFAULT_HOOK.x, y = DEFAULT_HOOK.y) => {
    paintDogs(context, this.stats[STATS.DOG], canvas.width, canvas.height)
    this.state.draw(context, x, y, this)
  }

  handleAction = (action) => {
    this.state.handleAction(action)
  }
}
