import { STATS } from '../friendo/constants'
import { WATER_OUTLINE, WATER_SKIN } from '../colors'

/**
 * Specifies how a water friendo is drawn
 */

export default class WATER {
  constructor() {
    this.id = STATS.WATER
  }

  setColors(g) {
    g.fillStyle = WATER_SKIN
    g.strokeStyle = WATER_OUTLINE
  }
}
