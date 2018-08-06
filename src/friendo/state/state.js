import { BLINK_TIME, SPEAK_TIME, BLINK_CHANCE, SPEAK_CHANCE, TOTAL_EVENT_CHANCE } from '../constants'
import phrasebook from '../phrases/idle-phrases'

/**
 *  defines the animation to be done in a given state
 */

export const ID = 'state_default'

export default class State {
  constructor(savedState) {
    this.id = ID

    this.blinkRate = BLINK_CHANCE
    this.speakRate = SPEAK_CHANCE
    this.blink = 0
    this.speak = 0

    this.phrasebook = phrasebook
    this.words = 'Hi'

    if (savedState) {
      this.blinkRate = savedState.blinkRate
      this.speakRate = savedState.speakRate
      this.blink = savedState.blink
      this.speak = savedState.speak
      this.words = savedState.words
    }
  }

  toJSON() {
    return {
      id: this.id,
      blinkRate: this.blinkRate,
      speakRate: this.speakRate,
      blink: this.blink,
      speak: this.speak,
      words: this.words,
    }
  }

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

  handleAction(action) {
    console.log(`Handling ${action}`)
  }

  pickPhrase(friendo) {
    const list = this.phrasebook(friendo)
    const selected = Math.floor(Math.random() * list.length)
    // console.log(`Picked phrase ${selected}`)
    return list[selected]
  }
}
