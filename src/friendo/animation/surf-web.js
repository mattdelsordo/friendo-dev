import FAnimation from './f-animation'
import { left, right } from '../art/art-util'
import { drawPhone, PHONE_SCREEN_OFF, PHONE_SCREEN_ON } from '../art/props/phone'

export default class ASurf extends FAnimation {
  constructor(old) {
    super(old)

    this.frames = [
      this.frame1.bind(this),
      this.frame2.bind(this),
    ]
  }

  frame1(g, x, y, friendo, blink, words) {
    this.subframe(g, x, y, friendo, blink, words, 0.20, 0, PHONE_SCREEN_OFF)
  }

  frame2(g, x, y, friendo, blink, words) {
    this.subframe(g, x, y, friendo, blink, words, 0.30, 0.05, PHONE_SCREEN_ON)
  }

  subframe(g, x, y, friendo, blink, words, armAngle = 0.2, squat = 0, phoneScreen) {
    // pre-compute constants for drawing for ease of readability
    const { thighGap } = friendo.element
    const bodyOffset = friendo.element.bodyOffset - (friendo.element.bodyOffset * squat)
    const legBrush = friendo.element.legBrush(friendo)
    const armBrush = friendo.element.armBrush(friendo)
    const armOffset = {
      x: friendo.element.armOffset.xOffset,
      y: friendo.element.legHeight - friendo.element.armOffset.yOffset,
    }

    left(g, x - thighGap, y, legBrush) // left leg
    right(g, x + thighGap, y, legBrush) // right leg
    left(g, x - armOffset.x, y - armOffset.y, armBrush, armAngle)// left arm
    right(g, x + armOffset.x, y - armOffset.y, armBrush, armAngle)// right arm

    const computedTethers = friendo.element.drawCore(g, x, y - bodyOffset, friendo, this.blink)
    if (words) {
      friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, words)
    }

    const phoneBrush = (_g) => {
      drawPhone(_g, friendo.element.handCoord.x, friendo.element.handCoord.y, phoneScreen)
    }
    left(g, x - armOffset.x, y - armOffset.y, phoneBrush, armAngle) // phone
  }
}
