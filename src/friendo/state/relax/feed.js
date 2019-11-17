import phrasebook from '../../phrases/feed-phrases'
import { STATES, FOODS } from '../../constants'
import { ENERGY_COST_FOOD, FOOD_VALUES } from '../../balance'
import AFeed from '../../animation/feed'
import Relax from './relax'
import { EAT_VERB } from '../../phrases/game-text'

const INITIAL_REPS = 4

export default class Feed extends Relax {
  constructor(savedState, foodID) {
    super(savedState)
    this.id = STATES.FEED
    this.food = foodID
    this.anim = new AFeed(savedState.anim, phrasebook, FOODS[this.food])
    this.fatigueCost = ENERGY_COST_FOOD
    this.reps = INITIAL_REPS
    this.verb = EAT_VERB
  }

  _getHungerCost() {
    return FOOD_VALUES[this.food] / INITIAL_REPS
  }
}
