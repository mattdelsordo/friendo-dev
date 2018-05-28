import { BLINK_TIME, SPEAK_TIME, BLINK_CHANCE, SPEAK_CHANCE } from '../constants'

/**
 *  defines the animation to be done in a given state
 */

export default class State {
  constructor() {
    this.blink = 0
    this.speak = 0
  }

  draw = (g, x, y, friendo) => {
    /**
     *  I know this is terrible practice but sorry yes my draw method has side effects
     */
    // handle blink
    if (this.blink > 0) {
      this.blink -= 1
    } else if (Math.random() * 10 < BLINK_CHANCE) {
      // not blinking, chance to blink
      this.blink = BLINK_TIME
    }

    // handle speech
    if (this.speak > 0) {
      this.speak -= 1
    } else if (Math.random() * 10 < SPEAK_CHANCE) {
      this.speak = SPEAK_TIME
    }

    friendo.element.setColors(g)
  }

  handleAction(action) {}
}
