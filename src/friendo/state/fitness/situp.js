/**
 * Defines friendo behavior when performing core exercises
 */

import Exercise from './exercise'
import { left, down } from '../../../art/art-util'
import { STATS } from '../../constants'

export const ID = `state_${STATS.CORE}`

export default class Situp extends Exercise {
  constructor(savedState) {
    super(savedState)
    this.id = ID
  }

  draw(g, x, y, friendo) {
    super.draw(g, x, y, friendo)

    // decide which frame shall be displayed
    this.frame = (this.frame + 1) % 4
    switch (this.frame) {
      case 2:
      case 3:
        down(g, (_g, _x, _y) => {
          this.frame2(_g, _x, _y, friendo)
        }, x, y)
        break
      case 0:
      case 1:
      default:
        down(g, (_g, _x, _y) => {
          this.frame1(_g, _x, _y, friendo)
        }, x, y)
        break
    }
  }

  frame1(g, x, y, friendo) {
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
    friendo.element.speak(g, (computedTethers.speech.x + 50), computedTethers.speech.y, friendo)
  }

  frame2(g, x, y, friendo) {
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
    friendo.element.speak(g, (computedTethers.speech.x + 50), computedTethers.speech.y, friendo)
  }
}
