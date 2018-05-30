import { STATS } from '../constants'
import { EARTH_OUTLINE, EARTH_SKIN } from '../../art/colors'
import Element from './element'
import ELEMENTS from './elements'

/**
 * Specifies how a earth friendo is drawn
 */

export default class Earth extends Element {
  constructor() {
    super()
    this.id = ELEMENTS.EARTH
  }

  setColors(g) {
    g.fillStyle = EARTH_SKIN
    g.strokeStyle = EARTH_OUTLINE
  }

  computeArmTethers(friendo) {
    if (friendo.stats[STATS.CORE] > 8) {
      return {
        xOffset: 75,
        yOffset: -135,
      }
    } else if (friendo.stats[STATS.CORE] > 6) {
      return {
        xOffset: 50,
        yOffset: -90,
      }
    } else if (friendo.stats[STATS.CORE] > 4) {
      return {
        xOffset: 25,
        yOffset: -100,
      }
    } else if (friendo.stats[STATS.CORE] > 2) {
      return {
        xOffset: 25,
        yOffset: -60,
      }
    } else {
      return {
        xOffset: 25,
        yOffset: -30,
      }
    }
  }
}

