import State from './state'
import { left, right } from '../../art/art-util'

export default class Idle extends State {

  draw(g, x, y, friendo) {
    super.draw()

    const legHeight = friendo.element.drawLegs(g, x, y, friendo)
    const { armX, armY } = friendo.element.computeArmTethers()
    left(g, x-armX, y-legHeight+armY, friendo.element.armBrush(friendo), 0.25)// left arm
    right(g, x+armX, y-legheight+armY, friendo.element.armBrush(friendo), 0.25)// right arm
    friendo.element.drawCore(g, x, y-legHeight, friendo, this.doBlink)
  }

  handleAction(action) {
    // based off of action and current state switch the state
  }
}
