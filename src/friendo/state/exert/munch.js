import Exert from './exert'
import { STATS, STATES } from '../../constants'
import AMunch from '../../animation/munch'

export default class Munch extends Exert {
  constructor(savedState, reps) {
    super(savedState, reps)
    this.id = STATES.TASTE
    this.stat = STATS.TASTE

    this.anim = new AMunch(savedState, this.phrasebook)
  }
}
