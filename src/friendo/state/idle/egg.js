/**
 * Draws egg without speech
 * Egg shakes at an interval based on egg stat level
 */

import State from '../state'
import AEgg from '../../animation/egg'
import { MAX_EGG_LEVEL, STATS, STATES, ENERGY_COST_EGG } from '../../constants'

export default class Egg extends State {
  constructor(savedState) {
    if (!savedState) savedState = {}
    super(savedState)
    this.id = STATES.BABY
    this.fatigueCost = ENERGY_COST_EGG

    // check for "idleness" using this field,
    // not sure how great a polymorphic check would be since
    // egg and idle have different behavior
    this.isIdle = true
    this.reps = -1

    // phrasebook left blank to avoid speaking while and egg
    this.anim = new AEgg(savedState.anim, () => [''])
  }

  _doTransitionToIdle(friendo) {
    if (friendo.getStat(STATS.EGG) === MAX_EGG_LEVEL) {
      friendo.hatch()
    }
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
}
