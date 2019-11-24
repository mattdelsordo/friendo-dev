/**
 * Abstract parent class for states that cost large amounts of fatigue and reward exp
 */

import State from '../state'
import FitnessPhrasebook from '../../text/phrasebooks/fitness'
import { BASE_EXP_REWARD, HUNGER_MULTIPLIER_EXERT, EXERCISE_COST, STAT_MAX } from '../../balance'
import { EXERT_EMOJI, EXERT_VERB } from '../../text/game-text'
import { STATES } from '../../constants'

export default class Exert extends State {
  constructor(savedState, reps) {
    super(savedState, reps)
    this.anim = this._newAnimation(savedState.anim, new FitnessPhrasebook())
    this.words = 'feel the burn'
    this.frame = 0
    this.id = 'abstract_exert'
    this.stat = 'error'
    this.expReward = BASE_EXP_REWARD
    this.fatigueCost = EXERCISE_COST
    this.hungerMultiplier = HUNGER_MULTIPLIER_EXERT
    this.verb = EXERT_VERB
    this.emoji = EXERT_EMOJI
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

  handleAction(friendo, action, reps) {
    switch (action) {
      case STATES.CANCEL:
        friendo.setState(this.idleState, reps)
        return true
      default:
        return false
    }
  }
}
