import phrasebook from '../phrases/idle-phrases'
import FAnimation from '../animation/f-animation'
import { STATES } from '../constants'
import { DEFAULT_VERB } from '../phrases/game-text'

/**
 *  defines the animation to be done in a given state
 */

export default class State {
  constructor(oldState, initialReps) {
    if (!oldState) oldState = {}
    this.id = oldState.id || 'state default'

    // helps store how much longer to remain in this state
    // currently 1 rep == 1 second
    this.reps = initialReps || oldState.reps

    // exp added to a stat's total on a rep
    this.expReward = 0
    this.stat = null

    // modifier on fatigue when existing in this state
    this.fatigueCost = 0
    // base modifier on hunger
    this.hungerMultiplier = 0

    // set animation
    this.anim = new FAnimation(oldState.anim, phrasebook)

    // override to transition to something OTHER than idle
    // e.g. for incubate
    this.idleState = STATES.IDLE
    this.isIdle = false

    // text displayed to indicate state
    this.verb = DEFAULT_VERB
  }

  toJSON() {
    return {
      id: this.id,
      reps: this.reps,
      anim: this.anim,
    }
  }

  getReps() { return this.reps }

  // handle transitions to a new state given input of a state ID
  // returns true if the transition was a success
  handleAction() {
    return false
  }

  // draws a single frame of this state's associated animation
  draw(g, x, y, friendo) {
    this.anim.draw(g, x, y, friendo)
  }

  // conditions to return to Idle and Sleep respectively
  // base check is just for whether
  _doTransitionToIdle() {
    return false
  }
  _doTransitionToSleep() {
    return false
  }

  // computes food reward for feeding, flat for everything else
  _getHungerCost(friendo) {
    return friendo.maxBelly * this.hungerMultiplier
  }

  // computes passive fatigue cost
  _getFatigueCost(friendo) {
    return friendo.getHungerModifier()
  }

  // behavior associated with a single rep of an exercise, a single "tick" of a state
  doRep(friendo) {
    // reduce reps to time the amount of time in the state
    if (this.reps >= 0) {
      this.reps -= 1
    }

    // if exercising, reward exp
    if (this.stat !== null) {
      friendo.addExp(this.stat, this.expReward)
    }

    // modify friendo fatigue and hunger
    friendo.modifyHunger(this._getHungerCost(friendo))
    friendo.modifyFatigue(this._getFatigueCost(friendo))

    // console.log(`reps: ${this.reps}, state: ${this.id}, energy: ${friendo.getNetEnergy()},
    //   stat exp: ${friendo.getExp(this.stat)}, stat level: ${friendo.getStat(this.stat)}`)

    // check for exhaustion condition, transition to sleep if satisfied
    if (this._doTransitionToSleep(friendo)) {
      friendo.setState(STATES.SLEEP, friendo.getBellyPercent())
    }
    // check for the completion of the state timer
    if (this._doTransitionToIdle(friendo)) {
      friendo.setState(this.idleState)
    }
  }
}
