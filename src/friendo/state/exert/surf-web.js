import Exert from './exert'
import { STATS, STATES } from '../../constants'
import ASurf from '../../animation/surf-web'
import { MEME_VERB } from '../../text/game-text'

export default class SurfWeb extends Exert {
  constructor(savedState, reps) {
    super(savedState, reps)
    this.id = STATES.MEME
    this.stat = STATS.MEME
    this.verb = MEME_VERB
  }

  _newAnimation(old, phrases) {
    return new ASurf(old, phrases)
  }
}
