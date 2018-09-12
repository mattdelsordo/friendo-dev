import State from './state'
import { left, right } from '../../art/art-util'
import phrasebook from '../phrases/feed-phrases'
import { drawGenericFood } from '../../art/props/food'

export const ID = 'state_feed'

export default class Feed extends State {
  constructor(savedState) {
    super(savedState)
    this.id = ID

    this.frame = 0

    this.phrasebook = phrasebook
    this.words = 'Yum'

    this.frameTotal = 12
  }

  draw(g, x, y, friendo) {
    super.draw(g, x, y, friendo)

    // decide which frame shall be displayed
    this.frame = (this.frame + 1) % this.frameTotal

    // state defaults
    let cT
    this.mouthIsOpen = true
    this.isSmiling = false

    switch (this.frame) {
      case 0:
      case 4:
      case 8:
        cT = this.frame1(g, x, y, friendo)
        this.drawFood(g, cT, this.frame)
        break
      case 1:
      case 5:
      case 9:
        this.mouthIsOpen = false
        cT = this.frame1(g, x, y, friendo)
        this.drawFood(g, cT, this.frame)
        break
      case 2:
      case 6:
        cT = this.frame2(g, x, y, friendo)
        this.drawFood(g, cT, this.frame)
        break
      case 3:
      case 7:
        this.mouthIsOpen = false
        cT = this.frame2(g, x, y, friendo)
        this.drawFood(g, cT, this.frame)
        break


      case 10:
      case 11:
        this.isSmiling = true
        this.mouthIsOpen = false
        cT = this.frame2(g, x, y, friendo)
        this.drawFood(g, cT, this.frame)
        break
      default:
        cT = this.frame1(g, x, y, friendo)
        this.drawFood(g, cT, this.frame)
        break
    }
  }

  drawFood(g, cT, frame) {
    drawGenericFood(g, cT.mouth.x, cT.mouth.y + 20, (10 - frame) / 10)
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
