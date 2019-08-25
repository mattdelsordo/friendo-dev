import FAnimation from './f-animation'
import dumbbell from '../art/props/dumbbell'
import { left, right } from '../art/art-util'

export default class ACurl extends FAnimation {
  constructor(old, phrases) {
    super(old, phrases)

    this.frames = [
      this.frame1.bind(this),
      this.frame2.bind(this),
    ]
  }

  frame1(g, x, y, friendo, blink, words) {
    this.subframe(g, x, y, friendo, blink, words, 0.45, 0.05)
  }

  frame2(g, x, y, friendo, blink, words) {
    this.subframe(g, x, y, friendo, blink, words)
  }

  subframe(g, x, y, friendo, blink, words, armAngle = 0.2, squat = 0) {
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

    const dumbbellBrush = (_g) => {
      dumbbell(
        _g,
        friendo.element.handCoord.x,
        friendo.element.handCoord.y,
        friendo.element.armGirth,
      )
    }
    left(g, x - armOffset.x, y - armOffset.y, dumbbellBrush, armAngle) // left dumbbell
    right(g, x + armOffset.x, y - armOffset.y, dumbbellBrush, armAngle) // right dumbbell

    const computedTethers = friendo.element.drawCore(g, x, y - bodyOffset, friendo, this.blink)
    if (words) {
      friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, words)
    }
  }
}
