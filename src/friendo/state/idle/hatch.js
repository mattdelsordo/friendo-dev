/**
 * Draws egg without speech
 * Egg shakes at an interval based on egg stat level
 */

import Egg from './egg'
import { STATES, HATCH_DUR } from '../../constants'
import { HATCH_VERB } from '../../text/game-text'

export default class Hatch extends Egg {
  constructor(savedState) {
    if (!savedState) savedState = {}
    super(savedState)
    this.id = STATES.HATCH

    // keep buttons disabled if in this state
    this.isIdle = false
    this.reps = HATCH_DUR
    this.verb = HATCH_VERB

    // inherits animation of Egg
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
