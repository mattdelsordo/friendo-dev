/**
 * Draws egg without speech
 * Egg shakes at an interval based on egg stat level
 */

import State from '../state'
import AEgg from '../../animation/egg'
import EmptyPhrasebook from '../../text/phrasebooks/phrasebook'
import { STATS, STATES } from '../../constants'
import { MAX_EGG_LEVEL } from '../../balance'
import { BABY_EMOJI, EGG_VERB } from '../../text/game-text'

export default class Egg extends State {
  constructor(savedState) {
    if (!savedState) savedState = {}
    super(savedState)
    this.id = STATES.BABY

    // check for "idleness" using this field,
    // not sure how great a polymorphic check would be since
    // egg and idle have different behavior
    this.isIdle = true
    this.reps = -1

    // phrasebook left blank to avoid speaking while and egg
    this.anim = this._newAnimation(savedState.anim, new EmptyPhrasebook())
    this.verb = EGG_VERB
    this.emoji = BABY_EMOJI
  }

  _newAnimation(old, phrases) {
    return new AEgg(old, phrases)
  }

  _doTransitionToHatch(friendo) {
    return friendo.getStat(STATS.EGG) === MAX_EGG_LEVEL
  }
  _doHatch(friendo) {
    friendo.setState(STATES.HATCH)
  }

  // egg can't have fatigue
  _getFatigueCost() {
    return 0
  }
  _getHungerCost() {
    return 0
  }

  handleAction(friendo, action, reps) {
    switch (action) {
      case STATES.EGG:
        friendo.setState(action, reps)
        return true
      default:
        return false
    }
  }

  // overload this to trigger the hatching animation
  doRep(friendo) {
    super.doRep(friendo)

    if (this._doTransitionToHatch(friendo)) {
      this._doHatch(friendo)
    }
  }
}
