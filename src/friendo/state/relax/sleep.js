/**
 * Define behavior for a sleeping friendo
 */

import phrasebook from '../../phrases/sleep-phrases'
import { STATES } from '../../constants'
import { BELLY_COST_SLEEP, ENERGY_COST_SLEEP } from '../../balance'
import Relax from './relax'
import ASleep from '../../animation/sleep'

export default class Sleep extends Relax {
  constructor(savedState) {
    super(savedState)
    this.id = STATES.SLEEP
    this.fatigueCost = ENERGY_COST_SLEEP
    this.hungerCost = BELLY_COST_SLEEP
    this.anim = new ASleep(savedState.anim, phrasebook)
    this.reps = -1
  }

  // sleep only transitions to idle when friendo is at max energy
  _doTransitionToIdle(friendo) {
    return friendo.getEnergyPercent() >= 1
  }

  _getHungerCost(friendo) {
    // stop restoring belly once we hit the threshold at which hunger modifier = 0
    if (friendo.getNetBelly() >= (friendo.maxBelly / 2)) return 0

    return this.hungerCost
  }
}
