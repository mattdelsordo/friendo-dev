import { STATS, STATES } from '../../constants'
import Exert from './exert'
import AGroom from '../../animation/groom'
import { HAIR_VERB } from '../../text/game-text'

export default class Groom extends Exert {
  constructor(savedState, reps) {
    super(savedState, reps)
    this.id = STATES.HAIR
    this.stat = STATS.HAIR
    this.verb = HAIR_VERB
    this.anim = new AGroom(savedState)
  }
}
