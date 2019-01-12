import { BLINK_TIME, SPEAK_TIME, BLINK_CHANCE, SPEAK_CHANCE, TOTAL_EVENT_CHANCE } from '../constants'
import phrasebook from '../phrases/idle-phrases'

/**
 *  defines the animation to be done in a given state
 */

export const ID = 'state_default'

export default class State {
  constructor(oldState) {
    if (!oldState) oldState = {}

    this.id = oldState.id || ID

    this.blinkRate = oldState.blinkRate || BLINK_CHANCE
    this.speakRate = oldState.speakRate || SPEAK_CHANCE
    this.blink = oldState.blink || 0
    this.speak = oldState.speak || 0
    // helps store how much longer to remain in this state
    this.reps = oldState.reps || 0

    // handle case where oldState is JSON rather than an object
    this.phrasebook = oldState.phrasebook || phrasebook
    this.words = oldState.words || 'Hi!'

    // keep track of the state this should default back to
    this.returnTo = this.id
  }

  toJSON() {
    return {
      id: this.id,
      blinkRate: this.blinkRate,
      speakRate: this.speakRate,
      blink: this.blink,
      speak: this.speak,
      words: this.words,
      reps: this.reps,
    }
  }

  setReps(reps) { this.reps = reps }
  getReps() { return this.reps }

  draw(g, x, y, friendo) {
    /**
     *  I know this is terrible practice but sorry yes my draw method has side effects
     */
    // handle blink
    if (this.blink > 0) {
      this.blink -= 1
    } else if (Math.random() * TOTAL_EVENT_CHANCE < this.blinkRate) {
      // not blinking, chance to blink
      this.blink = BLINK_TIME
    }

    // handle speech
    if (this.speak > 0) {
      this.speak -= 1
    } else if (Math.random() * TOTAL_EVENT_CHANCE < this.speakRate) {
      this.speak = SPEAK_TIME
      this.words = this.pickPhrase(friendo)
    }

    friendo.element.setColors(g)
  }

  pickPhrase(friendo) {
    const list = this.phrasebook(friendo)
    const selected = Math.floor(Math.random() * list.length)
    // console.log(`Picked phrase ${selected}`)
    return list[selected]
  }
}
