/**
 * Define behavior for a sleeping friendo
 */

import { left, right } from '../../../art/art-util'
import phrasebook from '../../phrases/sleep-phrases'
import { ACTIONS } from '../../constants'
import Exercise from './exercise'

export const ID = ACTIONS.SLEEP

export default class Sleep extends Exercise {
  constructor(savedState) {
    super(savedState)
    this.id = ID

    this.frame = 0

    this.phrasebook = phrasebook
    this.words = 'zZZ'
  }

  draw(g, x, y, friendo) {
    super.draw(g, x, y, friendo)
    this.frame1(g, x, y, friendo)
  }

  frame1(g, x, y, friendo) {
    // pre-compute constants for drawing for ease of readability
    const { thighGap } = friendo.element
    const bodyOffset = friendo.element.bodyOffset - (friendo.element.bodyOffset * 0.1)
    const legBrush = friendo.element.legBrush(friendo)
    const armBrush = friendo.element.armBrush(friendo)
    const armOffset = {
      x: friendo.element.armOffset.xOffset,
      y: friendo.element.legHeight - friendo.element.armOffset.yOffset,
    }
    const armAngle = 0.15 // pi radians

    left(g, x - thighGap, y, legBrush) // left leg
    right(g, x + thighGap, y, legBrush) // right leg
    left(g, x - armOffset.x, y - armOffset.y, armBrush, armAngle)// left arm
    right(g, x + armOffset.x, y - armOffset.y, armBrush, armAngle)// right arm
    const computedTethers = friendo.element.drawCore(g, x, y - bodyOffset, friendo, true)
    friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, friendo)
  }
}
