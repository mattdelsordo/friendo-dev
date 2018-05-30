import { BLINK_TIME, SPEAK_TIME, BLINK_CHANCE, SPEAK_CHANCE, TOTAL_EVENT_CHANCE } from '../constants'
import phrasebook from '../phrases/idle-phrases'

/**
 *  defines the animation to be done in a given state
 */

export default class State {
  constructor() {
    this.blinkRate = BLINK_CHANCE
    this.speakRate = SPEAK_CHANCE
    this.blink = 0
    this.speak = 0

    this.phrasebook = phrasebook
    this.words = 'Hi'
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
    }

    friendo.element.setColors(g)
  }

  handleAction(action) {
    console.log(`Handling ${action}`)
  }

  pickPhrase(friendo) {
    const list = this.phrasebook(friendo)
    return list[Math.random() * list.length]
  }
}
