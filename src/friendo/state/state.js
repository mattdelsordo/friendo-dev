import phrasebook from '../phrases/idle-phrases'
import FAnimation from '../animation/f-animation'

/**
 *  defines the animation to be done in a given state
 */

export const ID = 'state_default'

export default class State {
  constructor(oldState) {
    if (!oldState) oldState = {}
    this.id = oldState.id || ID

    // helps store how much longer to remain in this state
    this.reps = oldState.reps || 0

    // set animation
    this.anim = new FAnimation(oldState.anim, phrasebook)

    // keep track of the state this should default back to
    this.returnTo = this.id
  }

  toJSON() {
    return {
      id: this.id,
      reps: this.reps,
      anim: this.anim,
    }
  }

  setReps(reps) { this.reps = reps }
  getReps() { return this.reps }

  draw(g, x, y, friendo) {
    this.anim.draw(g, x, y, friendo)
  }
}
