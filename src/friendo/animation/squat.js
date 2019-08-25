import FAnimation from './f-animation'
import { left, right } from '../art/art-util'

export default class ASquat extends FAnimation {
  constructor(old, phrases) {
    super(old, phrases)
    this.frames = [
      this.frame1.bind(this),
      this.frame2.bind(this),
    ]
  }

  frame1(g, x, y, friendo, blink, words) {
    this.subframe(g, x, y, friendo, blink, words, 0.3)
  }

  frame2(g, x, y, friendo, blink, words) {
    this.subframe(g, x, y, friendo, blink, words)
  }

  subframe(g, x, y, friendo, blink, words, squatFactor = 0) {
    const squatAmount = squatFactor * friendo.element.bodyOffset

    // pre-compute constants for drawing for ease of readability
    const thighGap = friendo.element.thighGap * (1 + squatFactor)
    const bodyOffset = friendo.element.bodyOffset - squatAmount
    const legBrush = friendo.element.legBrush(friendo)
    const armBrush = friendo.element.armBrush(friendo)
    const armOffset = {
      x: friendo.element.armOffset.xOffset,
      y: friendo.element.legHeight - friendo.element.armOffset.yOffset - squatAmount,
    }
    const armAngle = 0.30 // pi radians

    left(g, x - thighGap, y, legBrush) // left leg
    right(g, x + thighGap, y, legBrush) // right leg
    left(g, x - armOffset.x, y - armOffset.y, armBrush, armAngle)// left arm
    right(g, x + armOffset.x, y - armOffset.y, armBrush, armAngle)// right arm
    const computedTethers = friendo.element.drawCore(g, x, y - bodyOffset, friendo, this.blink)
    if (words) {
      friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, words)
    }
  }
}
