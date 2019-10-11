import Exert from './exert'
import { STATS, STATES } from '../../constants'
import ARead from '../../animation/read'

export default class ReadBook extends Exert {
  constructor(savedState, reps) {
    super(savedState, reps)
    this.id = STATES.SIGHT
    this.stat = STATS.SIGHT

    this.anim = new ARead(savedState, this.phrasebook)
  }
}
