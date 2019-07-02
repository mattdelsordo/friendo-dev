/**
 * Draws egg without speech
 * Egg shakes at an interval based on egg stat level
 */

import State from '../state'
import AEgg from '../../animation/egg'

export const ID = 'state_baby'

export default class Egg extends State {
  constructor(savedState) {
    if (!savedState) savedState = {}
    super(savedState)
    this.id = ID
    this.returnTo = this.id

    // phrasebook left blank to avoid speaking while and egg
    this.anim = new AEgg(savedState.anim, () => [''])
  }
}
