/**
 * Draws egg without speech
 * Egg shakes at an interval based on egg stat level
 */

import Egg from './egg'
import AEgg from '../../animation/egg'
import { STATES, HATCH_DUR } from '../../constants'

export default class Hatch extends Egg {
  constructor(savedState) {
    if (!savedState) savedState = {}
    super(savedState)
    this.id = STATES.HATCH

    // keep buttons disabled if in this state
    this.isIdle = false
    this.reps = HATCH_DUR

    // phrasebook left blank to avoid speaking while and egg
    this.anim = new AEgg(savedState.anim, () => [''])
  }

  handleAction() {
    return false
  }

  _doTransitionToHatch() {
    return this.reps <= 0
  }
  _doHatch(friendo) {
    friendo.hatch()
  }
}
