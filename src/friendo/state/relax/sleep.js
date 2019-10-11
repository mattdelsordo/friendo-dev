/**
 * Define behavior for a sleeping friendo
 */

import phrasebook from '../../phrases/sleep-phrases'
import { ENERGY_COST_SLEEP, STATES } from '../../constants'
import Relax from './relax'
import ASleep from '../../animation/sleep'

export default class Sleep extends Relax {
  constructor(savedState) {
    super(savedState)
    this.id = STATES.SLEEP
    this.fatigueCost = ENERGY_COST_SLEEP
    this.anim = new ASleep(savedState.anim, phrasebook)
    this.reps = -1
  }

  // sleep only transitions to idle when friendo is at max energy
  _doTransitionToIdle(friendo) {
    return friendo.getEnergyPercent() >= 1
  }
}
