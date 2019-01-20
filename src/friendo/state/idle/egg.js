/**
 * Draws egg without speech
 * Egg shakes at an interval based on egg stat level
 */

import State from '../state'
import { STATS } from '../../constants'

export const ID = 'state_baby'

export default class Egg extends State {
  constructor(savedState) {
    if (!savedState) savedState = {}
    super(savedState)
    this.id = ID
    this.shaking = savedState.shaking || false

    // Left blank to avoid speaking while and egg
    this.phrasebook = () => ['']
    this.words = ''

    this.returnTo = this.id
  }

  draw(g, x, y, friendo) {
    super.draw(g, x, y, friendo)

    // Shake if not currently shaking and with a probability
    // based on egg level
    const rand = Math.floor(Math.random() * 100)
    const shake = friendo._stats[STATS.EGG] >= rand
    if (!this.shaking && shake) {
      this.shaking = true
    }

    // do a shake
    if (this.shaking) {
      this.shaking = false
      return this.frame2(g, x, y, friendo)
    }
    return this.frame1(g, x, y, friendo)
  }

  frame1(g, x, y, friendo) {
    friendo.element.drawEgg(g, x, y, friendo)
  }

  frame2(g, x, y, friendo) {
    friendo.element.drawEgg(g, x + 2, y, friendo)
  }
}
