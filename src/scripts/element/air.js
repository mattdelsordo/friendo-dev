import { STATS } from '../friendo/constants'
import { AIR_OUTLINE, AIR_SKIN } from '../colors'

/**
 * Specifies how a air friendo is drawn
 */

export default class Air {
  constructor() {
    this.id = STATS.AIR
  }

  setColors(g) {
    g.fillStyle = AIR_SKIN
    g.strokeStyle = AIR_OUTLINE
  }
}
