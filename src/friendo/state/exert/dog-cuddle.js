import Exert from './exert'
import { STATS, STATES } from '../../constants'
import ACuddle from '../../animation/dog-cuddle'
import { DOG_VERB } from '../../text/game-text'

export default class DogCuddle extends Exert {
  constructor(savedState, reps) {
    super(savedState, reps)
    this.id = STATES.DOG
    this.stat = STATS.DOG
    this.verb = DOG_VERB
    this.anim = new ACuddle(savedState)
  }
}
