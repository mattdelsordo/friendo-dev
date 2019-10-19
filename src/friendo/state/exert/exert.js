/**
 * Abstract parent class for states that cost large amounts of fatigue and reward exp
 */

import State from '../state'
import phrasebook from '../../phrases/fitness-phrases'
import { BASE_EXP_REWARD, HUNGER_MULTIPLIER_EXERT, EXERCISE_COST, STAT_MAX } from '../../balance'

export default class Exert extends State {
  constructor(savedState, reps) {
    super(savedState, reps)
    this.phrasebook = phrasebook
    this.words = 'feel the burn'
    this.frame = 0
    this.id = 'abstract_exert'
    this.stat = 'error'
    this.expReward = BASE_EXP_REWARD
    this.fatigueCost = EXERCISE_COST
    this.hungerMultiplier = HUNGER_MULTIPLIER_EXERT
  }

  _doTransitionToIdle(friendo) {
    if (friendo.getStat(this.stat) >= STAT_MAX) return true
    else if (this.reps <= 0) return true
    return false
  }

  _doTransitionToSleep(friendo) {
    if (friendo.getNetEnergy() <= 0) return true
    return false
  }

  // exercise returns a flat fatigue cost
  _getFatigueCost() {
    return this.fatigueCost
  }
}
