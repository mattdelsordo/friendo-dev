import { left, right } from '../../../art/art-util'
import { STATS } from '../../constants'
import Exercise from './exercise'
import drawHairbrush from '../../../art/props/hairbrush'

export const ID = `state_${STATS.HAIR}`

const rotateHairbrush = (g, x, y, angle = 0) => {
  g.save()

  g.translate(x, y)
  g.rotate(Math.PI * angle)
  g.translate(-x, -y)

  drawHairbrush(g, x, y)

  g.restore()
}

export default class Groom extends Exercise {
  constructor(savedState) {
    super(savedState)
    this.id = ID
    this.isSmiling = true
  }

  draw(g, x, y, friendo) {
    super.draw(g, x, y, friendo)

    // decide which frame shall be displayed
    this.frame = (this.frame + 1) % 4
    let hairY
    switch (this.frame) {
      case 2:
        hairY = this.frame2(g, x, y, friendo).hair
        rotateHairbrush(g, x + 26, hairY + 4, -0.25)
        break
      case 3:
        hairY = this.frame2(g, x, y, friendo).hair
        rotateHairbrush(g, x + 28, hairY + 6, -0.25)
        break
      case 1:
        hairY = this.frame1(g, x, y, friendo).hair
        rotateHairbrush(g, x + 22, hairY, -0.25)
        break
      case 0:
      default:
        hairY = this.frame1(g, x, y, friendo).hair
        rotateHairbrush(g, x + 24, hairY - 4, -0.25)
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
    const computedTethers = friendo.element.drawCore(g, x, y - bodyOffset, friendo, this.blink)
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
    const computedTethers = friendo.element.drawCore(g, x, y - bodyOffset, friendo, this.blink)
    friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, friendo)
    return computedTethers
  }
}
