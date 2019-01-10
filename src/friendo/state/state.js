import { BLINK_TIME, SPEAK_TIME, BLINK_CHANCE, SPEAK_CHANCE, TOTAL_EVENT_CHANCE } from '../constants'
import phrasebook from '../phrases/idle-phrases'
import loadState from './load-state'

/**
 *  defines the animation to be done in a given state
 */

export const ID = 'state_default'

export default class State {
  constructor(oldState) {
    if (oldState) {
      this.id = oldState.id

      this.blinkRate = oldState.blinkRate
      this.speakRate = oldState.speakRate
      this.blink = oldState.blink
      this.speak = oldState.speak

      // handle case where oldState is JSON rather than an object
      this.phrasebook = oldState.phrasebook || phrasebook
      this.words = oldState.words
    } else {
      this.id = ID

      this.blinkRate = BLINK_CHANCE
      this.speakRate = SPEAK_CHANCE
      this.blink = 0
      this.speak = 0

      this.phrasebook = phrasebook
      this.words = 'Hi'
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

  handleAction(action, friendo, callback) {
    /* eslint-disable-next-line no-console */
    friendo.state = loadState(this, action)
    if (callback) callback()
  }

  pickPhrase(friendo) {
    const list = this.phrasebook(friendo)
    const selected = Math.floor(Math.random() * list.length)
    // console.log(`Picked phrase ${selected}`)
    return list[selected]
  }
}
