import { STATS, STATES } from '../../constants'
import Exert from './exert'
import AGroom from '../../animation/groom'
import { HAIR_VERB } from '../../phrases/game-text'

export default class Groom extends Exert {
  constructor(savedState, reps) {
    super(savedState, reps)
    this.id = STATES.HAIR
    this.stat = STATS.HAIR

    this.anim = new AGroom(savedState, this.phrasebook)
    this.verb = HAIR_VERB
  }
}
