import { STATS } from '../friendo/constants'
import { EARTH_OUTLINE, EARTH_SKIN } from '../colors'

/**
 * Specifies how a earth friendo is drawn
 */

export default class Earth {
  constructor() {
    this.id = STATS.EARTH
  }

  setColors(g) {
    g.fillStyle = EARTH_SKIN
    g.strokeStyle = EARTH_OUTLINE
  }
}

