
import Exercise from './exercise'
import { left, right } from '../../../art/art-util'
import { STATS } from '../../constants'

export const ID = `state_${STATS.SIGHT}`

export default class ReadBook extends Exercise {
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
        this.frame1(g, x, y, friendo, 0.40, 0.05)
        break
      case 0:
      case 1:
      default:
        this.frame1(g, x, y, friendo)
        break
    }
  }

  frame1(g, x, y, friendo, armAngle = 0.25, squatFactor = 0) {
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

    // const dumbbellBrush = (_g) => {
    //   dumbbell(
    //     _g,
    //     friendo.element.handCoord.x,
    //     friendo.element.handCoord.y,
    //     friendo.element.armGirth,
    //   )
    // }
    // left(g, x - armOffset.x, y - armOffset.y, dumbbellBrush, armAngle) // left dumbbell
    // right(g, x + armOffset.x, y - armOffset.y, dumbbellBrush, armAngle) // right dumbbell

    const computedTethers = friendo.element.drawCore(g, x, y - bodyOffset, friendo, this.blink)
    friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, friendo)
  }
}
