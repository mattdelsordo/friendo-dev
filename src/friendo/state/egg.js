/**
 * Draws egg without speech
 * Egg shakes at an interval based on egg stat level
 */

import State from './state'

export const ID = 'state_egg'

export default class Egg extends State {
  constructor(savedState) {
    super(savedState)
    this.id = ID
    this.shaking = false

    // Left blank to avoid speaking while and egg
    this.phrasebook = () => ['']
    this.words = ''
  }

  draw(g, x, y, friendo) {
    super.draw(g, x, y, friendo)

    return this.frame1(g, x, y, friendo)
  }

  frame1(g, x, y, friendo) {
    friendo.element.drawEgg(g, x, y, friendo)
  }
}
