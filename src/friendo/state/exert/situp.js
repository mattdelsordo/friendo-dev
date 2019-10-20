/**
 * Defines friendo behavior when performing core exercises
 */

import Exert from './exert'
import { STATS, STATES } from '../../constants'
import ASitup from '../../animation/situp'
import { CORE_VERB } from '../../phrases/game-text'

export default class Situp extends Exert {
  constructor(savedState, reps) {
    super(savedState, reps)
    this.id = STATES.CORE
    this.stat = STATS.CORE
    this.anim = new ASitup(savedState, this.phrasebook)
    this.verb = CORE_VERB
  }
}
