import Exercise from './exercise'
import { left, right } from '../../art/art-util'
import { ACTIONS, STATS } from '../../constants'
import { Dog } from '../../art/props/dog'

export const ID = ACTIONS.DOG

const DOG_COORDS = [
  { x: 32, y: 0 },
  { x: -33, y: 0 },
  { x: 21, y: -60 },
  { x: -32, y: -100 },
  { x: 34, y: -146 },
]

export default class DogCuddle extends Exercise {
  constructor(savedState) {
    super(savedState)
    this.id = ID
    this.dogs = [new Dog(), new Dog(), new Dog(), new Dog(), new Dog()]
  }

  draw(g, x, y, friendo) {
    super.draw(g, x, y, friendo)

    // decide which frame shall be displayed
    this.frame = (this.frame + 1) % 4
    switch (this.frame) {
      case 2:
      case 3:
        this.frame2(g, x, y, friendo)
        break
      case 1:
      case 0:
      default:
        this.frame1(g, x, y, friendo)
        break
    }
    this.drawDogs(g, x, y, friendo, true)
  }

  coreToDogs(coreLevel) {
    if (coreLevel > 8) return 5
    else if (coreLevel > 6) return 4
    else if (coreLevel > 4) return 3
    else if (coreLevel > 2) return 2
    return 1
  }

  // Draw dogs based on predefined coordinates
  drawDogs(g, x, y, friendo, lick) {
    for (let i = 0; i < this.coreToDogs(friendo.getStatStage(STATS.CORE)); i += 1) {
      this.dogs[i].paint(g, x + DOG_COORDS[i].x, y + DOG_COORDS[i].y, lick)
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
