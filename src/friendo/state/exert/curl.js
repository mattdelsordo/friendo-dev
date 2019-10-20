
import Exert from './exert'
import { STATS, STATES } from '../../constants'
import ACurl from '../../animation/curl'
import { ARM_VERB } from '../../phrases/game-text'

export default class Curls extends Exert {
  constructor(savedState, reps) {
    super(savedState, reps)
    this.id = STATES.ARM
    this.stat = STATS.ARM

    this.anim = new ACurl(savedState, this.phrasebook)
    this.verb = ARM_VERB
  }
}
