import Exert from './exert'
import { STATS, STATES } from '../../constants'
import AMunch from '../../animation/munch'
import { TASTE_VERB } from '../../text/game-text'

export default class Munch extends Exert {
  constructor(savedState, reps) {
    super(savedState, reps)
    this.id = STATES.TASTE
    this.stat = STATS.TASTE
    this.verb = TASTE_VERB
    this.anim = new AMunch(savedState)
  }
}
