import phrasebook from '../../phrases/feed-phrases'
import { ENERGY_COST_FOOD, STATES } from '../../constants'
import AFeed from '../../animation/feed'
import Relax from './relax'

export default class Feed extends Relax {
  constructor(savedState) {
    super(savedState)
    this.id = STATES.FEED
    this.anim = new AFeed(savedState.anim, phrasebook)
    this.fatigueCost = ENERGY_COST_FOOD
    this.reps = 4
  }
}
