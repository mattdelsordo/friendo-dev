import State from './state'
import { left, right } from '../../art/art-util'

export default class Idle extends State {

  draw(g, x, y, friendo) {
    super.draw(g, x, y, friendo)

    const legHeight = friendo.element.drawLegs(g, x, y, friendo)
    const { xOffset, yOffset } = friendo.element.computeTethers(friendo)
    left(g, x-xOffset, y-legHeight+yOffset, friendo.element.armBrush(friendo), 0.25)// left arm
    right(g, x+xOffset, y-legHeight+yOffset, friendo.element.armBrush(friendo), 0.25)// right arm
    friendo.element.drawCore(g, x, y-legHeight, friendo, this.doBlink)
  }

  handleAction(action) {
    // based off of action and current state switch the state
  }
}
