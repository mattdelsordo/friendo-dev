/**
 * Abstract parent class for states that restore energy and reward no exp
 */
import State from '../state'

export default class Relax extends State {
  constructor(savedState) {
    super(savedState)
    this.ID = 'abstract_relax'
    this.frame = 0
    this.fatigueCost = -1
  }

  _doTransitionToIdle() {
    return this.reps <= 0
  }
  _doTransitionToSleep() {
    return false
  }
}
