import { STATES } from '../../constants'
import { ENERGY_COST_PET } from '../../balance'
import phrasebook from '../../phrases/idle-phrases'
import APet from '../../animation/pet'
import Relax from './relax'

export default class Petting extends Relax {
  constructor(savedState) {
    super(savedState)
    this.id = STATES.PET
    this.fatigueCost = ENERGY_COST_PET
    this.anim = new APet(savedState.old, phrasebook)
    this.reps = 2
  }

  // exercise returns a flat fatigue cost
  _getFatigueCost() {
    return this.fatigueCost
  }
}
