import FAnimation from './f-animation'
import { left, right } from '../art/art-util'
import { drawOpenBook } from '../art/props/book'

export default class ARead extends FAnimation {
  constructor(old) {
    super(old)

    this.glasses = true

    this.frames = [
      this.frame1.bind(this),
      this.frame2.bind(this),
    ]
  }

  frame1(g, x, y, friendo, blink, words) {
    this.subframe(g, x, y, friendo, blink, words)
  }

  frame2(g, x, y, friendo, blink, words) {
    this.subframe(g, x, y, friendo, blink, words, 0.40, 0.05)
  }

  subframe(g, x, y, friendo, blink, words, armAngle = 0.25, squatFactor = 0) {
    // pre-compute constants for drawing for ease of readability
    const { thighGap } = friendo.element
    const squatOffset = friendo.element.bodyOffset * squatFactor
    const bodyOffset = friendo.element.bodyOffset - squatOffset
    const legBrush = friendo.element.legBrush(friendo)
    const armBrush = friendo.element.armBrush(friendo)
    const armOffset = {
      x: friendo.element.armOffset.xOffset,
      y: friendo.element.legHeight - friendo.element.armOffset.yOffset,
    }

    left(g, x - thighGap, y, legBrush) // left leg
    right(g, x + thighGap, y, legBrush) // right leg
    left(g, x - armOffset.x, y - armOffset.y, armBrush, armAngle)// left arm
    right(g, x + armOffset.x, y + (-armOffset.y + squatOffset), armBrush, 0.2)// right arm

    left(g, x - armOffset.x, y - armOffset.y, (_g) => {
      drawOpenBook(_g, friendo.element.handCoord.x, friendo.element.handCoord.y)
    }, armAngle)

    const computedTethers = friendo.element.drawCore(g, x, y - bodyOffset, friendo, this.blink)
    if (words) {
      friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, words)
    }
  }
}
