/**
 * Defines friendo behavior when performing leg exercises
 */

import Exercise from './exercise'
import { left, right } from '../../art/art-util'
import { ACTIONS } from '../../constants'

export const ID = ACTIONS.LEG

export default class Squat extends Exercise {
  constructor(savedState) {
    super(savedState)
    this.id = ID
  }

  draw(g, x, y, friendo) {
    super.draw(g, x, y, friendo)

    // decide which frame shall be displayed
    this.frame = (this.frame + 1) % 5
    switch (this.frame) {
      case 2:
      case 3:
        return this.frame1(g, x, y, friendo, 0.30)
      case 0:
      case 1:
      default:
        return this.frame1(g, x, y, friendo)
    }
  }

  frame1(g, x, y, friendo, squatFactor = 0) {
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
    friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, friendo)
  }
}
