import State from './state'
import { left, right } from '../../art/art-util'
import paintHand from '../../art/hand'

export const ID = 'state_pet'

export default class Petting extends State {
  constructor(savedState) {
    super(savedState)
    this.id = ID
    this.frame = savedState.frame || 0
  }

  draw(g, x, y, friendo) {
    super.draw(g, x, y, friendo)

    // decide which frame shall be displayed
    this.frame = (this.frame + 1) % 4
    switch (this.frame) {
      case 0:
        this.frame1(g, x, y, friendo)
        this.handUp(g, x, y)
        break
      case 1:
        this.frame1(g, x, y, friendo)
        this.handDown(g, x, y)
        break
      case 2:
        this.frame2(g, x, y, friendo)
        this.handUp(g, x, y)
        break
      case 3:
        this.frame2(g, x, y, friendo)
        this.handDown(g, x, y)
        break
      default:
        this.frame1(g, x, y, friendo)
        this.handUp(g, x, y)
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
      y: friendo.element.legHeight - friendo.element.armOffset.yOffset,
    }
    const armAngle = 0.25 // pi radians

    left(g, x - thighGap, y, legBrush) // left leg
    right(g, x + thighGap, y, legBrush) // right leg
    left(g, x - armOffset.x, y - armOffset.y, armBrush, armAngle)// left arm
    right(g, x + armOffset.x, y - armOffset.y, armBrush, armAngle)// right arm
    friendo.element.drawCore(g, x, y - bodyOffset, friendo, this.blink)
  }

  frame2(g, x, y, friendo) {
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
    friendo.element.drawCore(g, x, y - bodyOffset, friendo, this.blink)
  }

  handUp(g, x, y) {
    paintHand(g, x - 4, y - 86)
  }

  handDown(g, x, y) {
    paintHand(g, x - 4, y - 82)
  }
}
