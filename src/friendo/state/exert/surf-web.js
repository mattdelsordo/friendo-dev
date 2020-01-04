import Exert from './exert'
import { STATS, STATES } from '../../constants'
import ASurf from '../../animation/surf-web'
import { MEME_VERB } from '../../phrases/game-text'

export default class SurfWeb extends Exert {
  constructor(savedState, reps) {
    super(savedState, reps)
    this.id = STATES.MEME
    this.stat = STATS.MEME
    this.anim = new ASurf(savedState, this.phrasebook)
    this.verb = MEME_VERB
  }
}
