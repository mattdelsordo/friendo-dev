import { STATES } from '../../constants'
import { ENERGY_COST_PET } from '../../balance'
import IdlePhrasebook from '../../text/phrasebooks/idle'
import APet from '../../animation/pet'
import Relax from './relax'
import { IDLE_VERB } from '../../text/game-text'

export default class Petting extends Relax {
  constructor(savedState) {
    super(savedState)
    this.id = STATES.PET
    this.fatigueCost = ENERGY_COST_PET
    this.anim = this._newAnimation(savedState.old, new IdlePhrasebook())
    this.reps = 2
    this.verb = IDLE_VERB
  }

  _newAnimation(old, phrases) {
    return new APet(old, phrases)
  }

  // exercise returns a flat fatigue cost
  _getFatigueCost() {
    return this.fatigueCost
  }
}
