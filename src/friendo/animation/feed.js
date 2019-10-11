import FAnimation from './f-animation'
import { left, right } from '../art/art-util'
import { drawGenericFood } from '../art/props/food'

export default class AFeed extends FAnimation {
  constructor(old, phrases) {
    super(old, phrases)
    this.frameDelay = 1
    this.frames = [
      this.frame1.bind(this),
      this.frame1.bind(this),
      this.frame1.bind(this),
      this.frame2.bind(this),
      this.frame3.bind(this),
      this.frame4.bind(this),
      this.frame1.bind(this),
      this.frame2.bind(this),
      this.frame3.bind(this),
      this.frame4.bind(this),
      this.frame1.bind(this),
      this.frame2.bind(this),
      this.frame5.bind(this),
      this.frame5.bind(this),
      this.frame5.bind(this),
      this.frame5.bind(this),
    ]
  }

  subframe1(g, x, y, friendo, blink, words) {
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
    const computedTethers = friendo.element.drawCore(g, x, y - bodyOffset, friendo, blink)
    if (words) {
      friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, words)
    }
    return computedTethers
  }

  subframe2(g, x, y, friendo, blink, words) {
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
    return computedTethers
  }

  drawFood(g, cT, frame) {
    drawGenericFood(g, cT.mouth.x, cT.mouth.y + 20, (10 - frame) / 10)
  }

  frame1(g, x, y, friendo, blink, words) {
    this.mouthIsOpen = true
    this.isSmiling = false
    const t = this.subframe1(g, x, y, friendo, blink, words)
    this.drawFood(g, t, this.frame)
  }

  frame2(g, x, y, friendo, blink, words) {
    this.mouthIsOpen = false
    this.isSmiling = false
    const t = this.subframe1(g, x, y, friendo, blink, words)
    this.drawFood(g, t, this.frame)
  }

  frame3(g, x, y, friendo, blink, words) {
    this.mouthIsOpen = true
    this.isSmiling = false
    const t = this.subframe2(g, x, y, friendo, blink, words)
    this.drawFood(g, t, this.frame)
  }

  frame4(g, x, y, friendo, blink, words) {
    this.mouthIsOpen = false
    this.isSmiling = false
    const t = this.subframe2(g, x, y, friendo, blink, words)
    this.drawFood(g, t, this.frame)
  }

  frame5(g, x, y, friendo, blink, words) {
    this.isSmiling = true
    this.mouthIsOpen = false
    const t = this.subframe2(g, x, y, friendo, blink, words)
    this.drawFood(g, t, this.frame)
  }
}
