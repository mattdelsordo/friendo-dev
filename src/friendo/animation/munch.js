import FAnimation from './f-animation'
import { drawFood } from '../art/props/food'
import { left, right } from '../art/art-util'
import { HOTDOG_EMOJI as EMOJI } from '../constants'

export default class AMunch extends FAnimation {
  constructor(old, phrases) {
    super(old, phrases)

    this.emoji = new Image()
    this.emoji.src = `./img/emoji/${EMOJI.emoji}.png`

    this.frame = 0
    this.frameDelay = 1
    this.frames = [
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
      this.frame3.bind(this),
      this.frame4.bind(this),
    ]
  }

  frame1(g, x, y, friendo, blink, words) {
    this.mouthIsOpen = false
    const cT = this.subframe1(g, x, y, friendo, blink, words)
    this.drawFood(g, cT, this.frame)
  }

  frame2(g, x, y, friendo, blink, words) {
    this.mouthIsOpen = true
    const cT = this.subframe1(g, x, y, friendo, blink, words)
    this.drawFood(g, cT, this.frame)
  }

  frame3(g, x, y, friendo, blink, words) {
    this.mouthIsOpen = false
    const cT = this.subframe2(g, x, y, friendo, blink, words)
    this.drawFood(g, cT, this.frame)
  }

  frame4(g, x, y, friendo, blink, words) {
    this.mouthIsOpen = true
    const cT = this.subframe2(g, x, y, friendo, blink, words)
    this.drawFood(g, cT, this.frame)
  }

  drawFood(g, cT, frame) {
    drawFood(g, cT.mouth.x, cT.mouth.y + 20, this.emoji, (10 - frame) / 10, EMOJI.dir)
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
    const computedTethers = friendo.element.drawCore(g, x, y - bodyOffset, friendo, this.blink)
    if (words) {
      friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, words)
    }
    return computedTethers
  }

  subframe2(g, x, y, friendo, blink, words) {
    // pre-compute constants for drawing for ease of readability
    const { thighGap } = friendo.element
    const bodyOffset = friendo.element.bodyOffset - (friendo.element.bodyOffset * 0.1)
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
    const computedTethers = friendo.element.drawCore(g, x, y - bodyOffset, friendo, this.blink)
    if (words) {
      friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, words)
    }
    return computedTethers
  }
}
