import Exert from './exert'
import { STATS, STATES } from '../../constants'
import ARead from '../../animation/read'
import { SIGHT_VERB } from '../../phrases/game-text'

export default class ReadBook extends Exert {
  constructor(savedState, reps) {
    super(savedState, reps)
    this.id = STATES.SIGHT
    this.stat = STATS.SIGHT

    this.anim = new ARead(savedState, this.phrasebook)
    this.verb = SIGHT_VERB
  }
}
