import State from './state'
import { left, right } from '../../art/art-util'
import phrasebook from '../phrases/feed-phrases'
import { handWithFood } from '../../art/props/hand'

export const ID = 'state_feed'

const HAND_X_OFFSET = 35
const HAND_Y_OFFSET = 18

export default class Idle extends State {
  constructor(savedState) {
    super(savedState)
    this.id = ID

    this.frame = 0

    this.phrasebook = phrasebook
    this.words = 'Yum'
  }

  draw(g, x, y, friendo) {
    super.draw(g, x, y, friendo)

    // decide which frame shall be displayed
    this.frame = (this.frame + 1) % 4
    let cT
    this.mouthIsOpen = true
    this.isSmiling = false
    switch (this.frame) {
      case 2:
        cT = this.frame2(g, x, y, friendo)
        handWithFood(g, cT.mouth.x - HAND_X_OFFSET, cT.mouth.y + HAND_Y_OFFSET, true)
        break
      case 3:
        this.mouthIsOpen = false
        cT = this.frame2(g, x, y, friendo)
        handWithFood(g, cT.mouth.x - HAND_X_OFFSET, cT.mouth.y + HAND_Y_OFFSET, false)
        break
      case 1:
        cT = this.frame1(g, x, y, friendo)
        handWithFood(g, cT.mouth.x - HAND_X_OFFSET, cT.mouth.y + HAND_Y_OFFSET, true)
        break
      case 0:
      default:
        this.mouthIsOpen = false
        this.isSmiling = true
        cT = this.frame1(g, x, y, friendo)
        handWithFood(g, cT.mouth.x - HAND_X_OFFSET - 30, cT.mouth.y + HAND_Y_OFFSET, true)
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
