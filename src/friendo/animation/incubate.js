import AEgg from './egg'
import lamp from '../art/props/lamp'

export default class AIncubate extends AEgg {
  draw(g, x, y, friendo) {
    super.draw(g, x, y, friendo)

    lamp(g, x, y)
  }
}
