import FAnimation from './f-animation'
import { left, right } from '../art/art-util'

/**
 * Handles idle animation
 */

export default class AIdle extends FAnimation {
  constructor(old) {
    super(old)

    this.frames = [this.frame1, this.frame2]
  }

  frame2(g, x, y, friendo, blink, words) {
    // pre-compute constants for drawing for ease of readability
    const { thighGap } = friendo.element
    const bodyOffset = friendo.element.bodyOffset - (friendo.element.bodyOffset * 0.05)
    const legBrush = friendo.element.legBrush(friendo)
    const armBrush = friendo.element.armBrush(friendo)
    const armOffset = {
      x: friendo.element.armOffset.xOffset,
      y: friendo.element.legHeight - friendo.element.armOffset.yOffset,
    }
    const armAngle = 0.30 // pi radians

    left(g, x - thighGap, y, legBrush) // left leg
    right(g, x + thighGap, y, legBrush) // right leg
    left(g, x - armOffset.x, y - armOffset.y, armBrush, armAngle)// left arm
    right(g, x + armOffset.x, y - armOffset.y, armBrush, armAngle)// right arm
    const computedTethers = friendo.element.drawCore(g, x, y - bodyOffset, friendo, blink)
    if (words) {
      friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, words)
    }
  }
}
