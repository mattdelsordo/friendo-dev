import State from './state'
import { left, right } from '../../art/art-util'

export default class Idle extends State {
  draw(g, x, y, friendo) {
    super.draw(g, x, y, friendo)

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

  handleAction(action) {
    // based off of action and current state switch the state
  }
}
