/**
 * Defines friendo behavior when performing leg exercises
 */

import Exert from './exert'
import ASquat from '../../animation/squat'
import { STATS, STATES } from '../../constants'
import { LEG_VERB } from '../../text/game-text'

export default class Squat extends Exert {
  constructor(savedState, reps) {
    super(savedState, reps)
    this.id = STATES.LEG
    this.stat = STATS.LEG
    this.verb = LEG_VERB
    this.anim = new ASquat(savedState)
  }
}
