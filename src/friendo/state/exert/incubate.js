/**
 * Incubation stat extends egg state to draw the incubation lamp over it
 * TECHNICALLY this is an exercise but it shares more code with the egg class
 */

import { EmptyPhrasebook } from '../../text/phrasebooks/phrasebook'
import AIncubate from '../../animation/incubate'
import { STATS, STATES } from '../../constants'
import { MAX_EGG_LEVEL, ENERGY_COST_INCUBATE } from '../../balance'
import Exert from './exert'
import { BABY_EMOJI, INCUBATE_VERB } from '../../text/game-text'

export default class Incubate extends Exert {
  constructor(savedState, reps) {
    super(savedState, reps)
    this.id = STATES.EGG
    this.stat = STATS.EGG
    this.fatigueCost = ENERGY_COST_INCUBATE
    this.phrasebook = new EmptyPhrasebook()
    this.anim = new AIncubate(savedState.anim)
    this.idleState = STATES.BABY
    this.verb = INCUBATE_VERB
    this.emoji = BABY_EMOJI
  }

  // have to override this because this has a different stat max
  _doTransitionToIdle(friendo) {
    if (friendo.getStat(this.stat) === MAX_EGG_LEVEL) return true
    else if (this.reps <= 0) return true
    return false
  }

  _doTransitionToSleep() {
    return false
  }
}
