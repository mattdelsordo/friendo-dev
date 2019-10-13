/**
 * Abstract parent class for states that cost low quantities of energy and don't reward exp
 * States that exert and relax states default back to
 */

import State from '../state'
import phrasebook from '../../phrases/idle-phrases'
import AIdle from '../../animation/idle'
import { ENERGY_COST_IDLE, STATES } from '../../constants'

export default class Idle extends State {
  constructor(savedState) {
    super(savedState)
    this.id = STATES.IDLE
    this.phrasebook = phrasebook
    this.anim = new AIdle(savedState.anim, phrasebook)
    this.returnTo = this.id
    this.fatigueCost = ENERGY_COST_IDLE

    // check for "idleness" using this field,
    // not sure how great a polymorphic check would be since
    // egg and idle have different behavior
    this.isIdle = true
    this.reps = -1
  }

  _doTransitionToSleep(friendo) {
    return friendo.getNetEnergy() <= 0
  }

  handleAction(friendo, action, reps) {
    switch (action) {
      case STATES.ARM:
      case STATES.DOG:
      case STATES.HAIR:
      case STATES.TASTE:
      case STATES.SIGHT:
      case STATES.CORE:
      case STATES.LEG:
      case STATES.MEME:
      case STATES.FEED:
      case STATES.PET:
        friendo.setState(action, reps)
        return true
      default:
        return false
    }
  }
}
