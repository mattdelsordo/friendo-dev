/**
 * Abstract parent class for states that cost low quantities of energy and don't reward exp
 * States that exert and relax states default back to
 */

import State from '../state'
import { IdlePhrasebook } from '../../text/phrasebooks/idle'
import AIdle from '../../animation/idle'
import { STATES } from '../../constants'
import { HUNGER_MULTIPLIER_IDLE } from '../../balance'
import { IDLE_EMOJI, IDLE_VERB } from '../../text/game-text'

export default class Idle extends State {
  constructor(savedState) {
    super(savedState)
    this.id = STATES.IDLE
    this.phrasebook = new IdlePhrasebook()
    this.anim = new AIdle(savedState.anim)
    this.hungerMultiplier = HUNGER_MULTIPLIER_IDLE

    // check for "idleness" using this field,
    // not sure how great a polymorphic check would be since
    // egg and idle have different behavior
    this.isIdle = true
    this.reps = -1
    this.verb = IDLE_VERB
    this.emoji = IDLE_EMOJI
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
