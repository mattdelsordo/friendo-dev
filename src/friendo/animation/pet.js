import FAnimation from './f-animation'
import { left, right } from '../art/art-util'
import { drawHandDown as paintHand } from '../art/props/hand'

const FRAME_DELAY = 1

export default class APet extends FAnimation {
  constructor(old, phrases) {
    super(old, phrases)

    this.isSmiling = true
    this.frameDelay = FRAME_DELAY
    this.frames = [
      this.frame1.bind(this),
      this.frame2.bind(this),
      this.frame3.bind(this),
      this.frame4.bind(this),
    ]
  }

  subframeA(g, x, y, friendo, blink, words) {
    // pre-compute constants for drawing for ease of readability
    const { thighGap, bodyOffset } = friendo.element
    const legBrush = friendo.element.legBrush(friendo)
    const armBrush = friendo.element.armBrush(friendo)
    const armOffset = {
      x: friendo.element.armOffset.xOffset,
      y: friendo.element.legHeight - friendo.element.armOffset.yOffset,
    }
    const armAngle = 0.25 // pi radians

    left(g, x - thighGap, y, legBrush) // left leg
    right(g, x + thighGap, y, legBrush) // right leg
    left(g, x - armOffset.x, y - armOffset.y, armBrush, armAngle)// left arm
    right(g, x + armOffset.x, y - armOffset.y, armBrush, armAngle)// right arm
    const computedTethers = friendo.element.drawCore(
      g,
      x,
      y - bodyOffset,
      friendo,
      blink,
      true,
    )
    if (words) {
      friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, words)
    }
    return computedTethers
  }

  subframeB(g, x, y, friendo, blink, words) {
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
    const computedTethers = friendo.element.drawCore(
      g,
      x,
      y - bodyOffset,
      friendo,
      blink,
      true,
    )
    if (words) {
      friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, words)
    }
    return computedTethers
  }

  handUp(g, x, y) {
    paintHand(g, x - 4, y - 3)
  }

  handDown(g, x, y) {
    paintHand(g, x - 4, y + 1)
  }

  // !!!!! this is not defined when the functions get called in context
  frame1(g, x, y, friendo, blink, words) {
    const t = this.subframeA(g, x, y, friendo, blink, words)
    this.handUp(g, x, t.hairY)
  }

  frame2(g, x, y, friendo, blink, words) {
    const t = this.subframeA(g, x, y, friendo, blink, words)
    this.handDown(g, x, t.hairY)
  }

  frame3(g, x, y, friendo, blink, words) {
    const t = this.subframeB(g, x, y, friendo, blink, words)
    this.handUp(g, x, t.hairY)
  }

  frame4(g, x, y, friendo, blink, words) {
    const t = this.subframeB(g, x, y, friendo, blink, words)
    this.handDown(g, x, t.hairY)
  }
}
