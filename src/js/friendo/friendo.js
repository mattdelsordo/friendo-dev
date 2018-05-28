/**
 * Friendo class
 * Stores friendo stats, renders friendo at some desired coordinates
 */

import { STATS } from './constants'
import { paintDogs } from '../art/dog'
import selectElement from './element/select-element'
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

      const fromJSON = JSON.parse(json)
      this.stats = fromJSON.stats
      this.name = fromJSON.name
      this.owner = fromJSON.owner
      this.element = selectElement(fromJSON.element)
    }
  }

  // converts ya boi to a JSON string
  toJSON = () =>
    JSON.stringify({
      name: this.name,
      owner: this.owner,
      element: this.element,
      stats: this.stats,
    })

  setElement = (element) => {
    this.element = selectElement(element)
    console.log(`Element set to ${this.element}`)
  }

  // sets the value of a stat
  setStat = (stat, value) => {
    this.stats[stat] = value
    console.log(`${stat} set to ${this.stats[stat]}`)
  }

  // draws the friendo to the context specified by g at specified coordinate
  draw = (canvas, x = DEFAULT_HOOK.x, y = DEFAULT_HOOK.y) => {
    const g = canvas.getContext('2d')
    paintDogs(g, this.stats[STATS.DOG], canvas.width, canvas.height)
    this.state.draw(g, x, y, this)
  }

  handleAction = (action) => {
    this.state.handleAction(action)
  }
}
