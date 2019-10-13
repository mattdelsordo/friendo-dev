import { STATS, STATES } from '../../constants'
import Exert from './exert'
import AGroom from '../../animation/groom'

export default class Groom extends Exert {
  constructor(savedState, reps) {
    super(savedState, reps)
    this.id = STATES.HAIR
    this.stat = STATS.HAIR

    this.anim = new AGroom(savedState, this.phrasebook)
  }
}
