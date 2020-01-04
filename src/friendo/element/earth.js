import { STATS } from '../constants'
import {
  EARTH_EGG_OUTLINE,
  EARTH_EGG_SKIN,
  EARTH_OUTLINE,
  EARTH_SKIN,
} from '../art/colors'
import Element from './element'
import ELEMENTS from './elements'
import { EARTH_SPEECH_STYLE, EARTH_TEXT_SIZE } from '../art/art-config'

/**
 * Specifies how a earth friendo is drawn
 */

export default class Earth extends Element {
  constructor() {
    super()
    this.id = ELEMENTS.EARTH

    this.strokeStyle = EARTH_OUTLINE
    this.fillStyle = EARTH_SKIN
    this.eggStroke = EARTH_EGG_OUTLINE
    this.eggFill = EARTH_EGG_SKIN
    this.textStyle = EARTH_SPEECH_STYLE
    this.textSize = EARTH_TEXT_SIZE
  }

  computeArmTethers(friendo) {
    if (friendo.getStatStage(STATS.CORE) > 4) {
      return {
        xOffset: 75,
        yOffset: -135,
      }
    } else if (friendo.getStatStage(STATS.CORE) > 3) {
      return {
        xOffset: 50,
        yOffset: -90,
      }
    } else if (friendo.getStatStage(STATS.CORE) > 2) {
      return {
        xOffset: 25,
        yOffset: -100,
      }
    } else if (friendo.getStatStage(STATS.CORE) > 1) {
      return {
        xOffset: 25,
        yOffset: -60,
      }
    }

    return {
      xOffset: 25,
      yOffset: -30,
    }
  }
}

