import State from './state'
import { left, right } from '../../art/art-util'
import { drawHandDown as paintHand } from '../../art/props/hand'

export const ID = 'state_pet'

export default class Petting extends State {
  constructor(savedState) {
    super(savedState)
    this.id = ID
    this.frame = savedState.frame || 0
    this.isSmiling = true
  }

  draw(g, x, y, friendo) {
    super.draw(g, x, y, friendo)

    // decide which frame shall be displayed
    this.frame = (this.frame + 1) % 4
    let computedTethers
    switch (this.frame) {
      case 0:
        computedTethers = this.frame1(g, x, y, friendo)
        this.handUp(g, x, computedTethers.hairY)
        break
      case 1:
        computedTethers = this.frame1(g, x, y, friendo)
        this.handDown(g, x, computedTethers.hairY)
        break
      case 2:
        computedTethers = this.frame2(g, x, y, friendo)
        this.handUp(g, x, computedTethers.hairY)
        break
      case 3:
        computedTethers = this.frame2(g, x, y, friendo)
        this.handDown(g, x, computedTethers.hairY)
        break
      default:
        computedTethers = this.frame1(g, x, y, friendo)
        this.handUp(g, x, computedTethers.hairY)
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
    const computedTethers = friendo.element.drawCore(
      g,
      x,
      y - bodyOffset,
      friendo,
      this.blink,
      true,
    )
    friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, friendo)
    return computedTethers
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
    const computedTethers = friendo.element.drawCore(
      g,
      x,
      y - bodyOffset,
      friendo,
      this.blink,
      true,
    )
    friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, friendo)
    return computedTethers
  }

  handUp(g, x, y) {
    paintHand(g, x - 4, y - 3)
  }

  handDown(g, x, y) {
    paintHand(g, x - 4, y + 1)
  }
}
