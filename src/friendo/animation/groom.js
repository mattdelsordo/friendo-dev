import FAnimation from './f-animation'
import { left, right } from '../art/art-util'
import drawHairbrush from '../art/props/hairbrush'

const rotateHairbrush = (g, x, y, angle = 0) => {
  g.save()

  g.translate(x, y)
  g.rotate(Math.PI * angle)
  g.translate(-x, -y)

  drawHairbrush(g, x, y)

  g.restore()
}

export default class AGroom extends FAnimation {
  constructor(old, phrases) {
    super(old, phrases)

    this.isSmiling = true

    this.frameDelay = 1
    this.frames = [
      this.frame1.bind(this),
      this.frame2.bind(this),
      this.frame3.bind(this),
      this.frame4.bind(this),
    ]
  }

  /* eslint-disable prefer-destructuring */
  frame1(g, x, y, friendo, blink, words) {
    const cT = this.subframe1(g, x, y, friendo, blink, words)
    rotateHairbrush(g, x + 24 + (cT.hairXOffset || 0), cT.hairY - 4, -0.25)
  }

  frame2(g, x, y, friendo, blink, words) {
    const cT = this.subframe1(g, x, y, friendo, blink, words)
    rotateHairbrush(g, x + 22 + (cT.hairXOffset || 0), cT.hairY, -0.25)
  }

  frame3(g, x, y, friendo, blink, words) {
    const cT = this.subframe2(g, x, y, friendo, blink, words)
    rotateHairbrush(g, x + 26 + (cT.hairXOffset || 0), cT.hairY + 4, -0.25)
  }

  frame4(g, x, y, friendo, blink, words) {
    const cT = this.subframe2(g, x, y, friendo, blink, words)
    rotateHairbrush(g, x + 28 + (cT.hairXOffset || 0), cT.hairY + 6, -0.25)
  }
  /* eslint-enable prefer-destructuring */

  subframe1(g, x, y, friendo, blink, words) {
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
    if (words) {
      friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, words)
    }
    return computedTethers
  }

  subframe2(g, x, y, friendo, blink, words) {
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
    if (words) {
      friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, words)
    }
    return computedTethers
  }
}
