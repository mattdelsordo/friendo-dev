import { STATS } from '../friendo/constants'
import { FIRE_SKIN, FIRE_OUTLINE } from '../colors'

/**
 * Specifies how a fire friendo is drawn
 */

export default class Fire {
  constructor() {
    this.id = STATS.FIRE
  }

  setColors(g) {
    g.fillStyle = FIRE_SKIN
    g.strokeStyle = FIRE_OUTLINE
  }
}
