import FAnimation from './f-animation'
import { STATS } from '../constants'

/**
 * Idle egg state
 */

export default class AEgg extends FAnimation {
  constructor(old, phrases) {
    super(old, phrases)
    this.shaking = (old) ? old.shaking : false
  }

  // Egg animation has a unique draw method; it doesnt behave regularly
  draw(g, x, y, friendo) {
    this.predraw(g, x, y, friendo)

    // Shake if not currently shaking and with a probability
    // based on egg level
    const rand = Math.floor(Math.random() * 100)
    const shake =
      (friendo.getStat(STATS.EGG) < 2 ? 0 : ((friendo.getStat(STATS.EGG) - 1) * 10 >= rand))
    if (!this.shaking && shake) {
      this.shaking = true
    }

    // do a shake
    if (this.shaking) {
      this.shaking = false
      return this.frame2(g, x, y, friendo)
    }
    return this.frame1(g, x, y, friendo)
  }

  frame1(g, x, y, friendo) {
    friendo.element.drawEgg(g, x, y, friendo)
  }

  frame2(g, x, y, friendo) {
    friendo.element.drawEgg(g, x + 2, y, friendo)
  }
}
