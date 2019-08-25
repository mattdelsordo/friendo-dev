import FAnimation from './f-animation'
import { down, left } from '../art/art-util'

export default class ASitup extends FAnimation {
  constructor(old, phrases) {
    super(old, phrases)
    this.frames = [
      this.frame1.bind(this),
      this.frame2.bind(this),
    ]
  }

  // compose old frames to compensate for lack of old draw method
  frame1(g, x, y, friendo, blink, words) {
    down(g, (_g, _x, _y) => {
      this.subframe1(_g, _x, _y, friendo, blink, words)
    }, x, y)
  }

  frame2(g, x, y, friendo, blink, words) {
    down(g, (_g, _x, _y) => {
      this.subframe2(_g, _x, _y, friendo, blink, words)
    }, x, y)
  }

  subframe1(g, x, y, friendo, blink, words) {
    // pre-compute constants for drawing for ease of readability
    const { thighGap, bodyOffset } = friendo.element
    const legBrush = friendo.element.legBrush(friendo)
    const armBrush = friendo.element.armBrush(friendo)
    const armOffset = {
      x: friendo.element.armOffset.xOffset,
      y: friendo.element.legHeight - friendo.element.armOffset.yOffset - bodyOffset,
    }
    const armAngle = 0.15 // pi radians

    left(g, x - thighGap, y + bodyOffset, legBrush) // left leg
    left(g, x + thighGap, y + bodyOffset, legBrush) // right leg
    left(g, x - armOffset.x, y - armOffset.y, armBrush, armAngle)// left arm

    const computedTethers = friendo.element.drawCore(g, x, y, friendo, this.blink)
    left(g, x + armOffset.x, y - armOffset.y, armBrush, armAngle)// right arm
    if (words) {
      friendo.element.speak(g, (computedTethers.speech.x + 50), computedTethers.speech.y, words)
    }
  }

  subframe2(g, x, y, friendo, blink, words) {
    // pre-compute constants for drawing for ease of readability
    const { thighGap, bodyOffset } = friendo.element
    const legBrush = friendo.element.legBrush(friendo)
    const armBrush = friendo.element.armBrush(friendo)
    const armOffset = {
      x: friendo.element.armOffset.xOffset,
      y: friendo.element.legHeight - friendo.element.armOffset.yOffset - bodyOffset,
    }
    const armAngle = 0.25 // pi radians

    left(g, x - thighGap, y + bodyOffset, legBrush) // left leg
    left(g, x + thighGap, y + bodyOffset, legBrush) // right leg
    left(g, x - armOffset.x - 6, y - armOffset.y, armBrush, armAngle)// left arm

    const computedTethers = friendo.element.drawCore(g, x - 6, y, friendo, this.blink)
    left(g, x + (armOffset.x - 6), y - armOffset.y, armBrush, armAngle)// right arm
    if (words) {
      friendo.element.speak(g, (computedTethers.speech.x + 50), computedTethers.speech.y, words)
    }
  }
}
