/**
 * Define behavior for a sleeping friendo
 */

import { SleepPhrasebook } from '../../text/phrasebooks/sleep'
import { STATES } from '../../constants'
import {
  HUNGER_MULTIPLIER_SLEEP,
  ENERGY_COST_SLEEP,
  HUNGER_MULTIPLIER_IDLE,
  SLEEP_BELLY_THRESHOLD,
} from '../../balance'
import Relax from './relax'
import ASleep from '../../animation/sleep'
import { ASLEEP_EMOJI, SLEEP_VERB } from '../../text/game-text'

export default class Sleep extends Relax {
  constructor(savedState, bellyPercent) {
    super(savedState)
    this.id = STATES.SLEEP
    this.fatigueCost = ENERGY_COST_SLEEP
    this.hungerMultiplier = HUNGER_MULTIPLIER_SLEEP
    this.phrasebook = new SleepPhrasebook()
    this.anim = new ASleep(savedState.anim)
    this.reps = -1
    this.verb = SLEEP_VERB
    this.emoji = ASLEEP_EMOJI

    // tracks if the friendo fell asleep from being famished
    this.famished = (bellyPercent <= 0)
  }

  // sleep only transitions to idle when friendo is at max energy
  _doTransitionToIdle(friendo) {
    return friendo.getEnergyPercent() >= 1
  }

  _getHungerCost(friendo) {
    // stop restoring belly once we hit the threshold at which hunger modifier = 0
    if (this.famished) {
      if (friendo.getNetBelly() >= (friendo.maxBelly * SLEEP_BELLY_THRESHOLD)) return 0
      return friendo.maxBelly * HUNGER_MULTIPLIER_SLEEP
    }

    // if not famished, reduce belly to 40%
    if (friendo.getNetBelly() <= (friendo.maxBelly * SLEEP_BELLY_THRESHOLD)) return 0
    return friendo.maxBelly * HUNGER_MULTIPLIER_IDLE
  }

  // exercise returns a flat fatigue cost
  _getFatigueCost() {
    return this.fatigueCost
  }
}
