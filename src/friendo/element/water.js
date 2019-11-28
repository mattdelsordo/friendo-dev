import { STATS } from '../constants'
import {
  WATER_OUTLINE,
  WATER_SKIN,
  WATER_EGG_OUTLINE,
  WATER_EGG_SKIN,
} from '../art/colors'
import Element from './element'
import ELEMENTS from './elements'
import { drawHookMarker } from '../art/hook-marker'
import { drawOval, drawOutlinedOval } from '../art/art-util'
import { crack1, crack2, crack3 } from '../art/props/egg-cracks'
import { WATER_SPEECH_STYLE, WATER_TEXT_SIZE } from '../art/art-config'
import { idlePhrasesWater } from '../text/phrases/idle'
import { fitnessPhrasesWater } from '../text/phrases/fitness'
import { sleepPhrasesWater } from '../text/phrases/sleep'
import { feedPhrasesWater } from '../text/phrases/feed'

/**
 * Specifies how a water friendo is drawn
 */

export default class WATER extends Element {
  constructor() {
    super()
    this.id = ELEMENTS.WATER

    this.strokeStyle = WATER_OUTLINE
    this.fillStyle = WATER_SKIN
    this.eggStroke = WATER_EGG_OUTLINE
    this.eggFill = WATER_EGG_SKIN
    this.textStyle = WATER_SPEECH_STYLE
    this.textSize = WATER_TEXT_SIZE

    this.phrases = {
      idle: idlePhrasesWater,
      fitness: fitnessPhrasesWater,
      sleep: sleepPhrasesWater,
      feed: feedPhrasesWater,
    }
  }

  computeAnchors(friendo) {
    super.computeAnchors(friendo)
    this.bodyOffset -= 5 // tweak body offset to make sure body and legs connect
  }

  computeArmTethers(friendo) {
    if (friendo.getStatStage(STATS.CORE) > 4) {
      return {
        xOffset: 60,
        yOffset: -90,
      }
    } else if (friendo.getStatStage(STATS.CORE) > 3) {
      return {
        xOffset: 50,
        yOffset: -75,
      }
    } else if (friendo.getStatStage(STATS.CORE) > 2) {
      return {
        xOffset: 50,
        yOffset: -64,
      }
    } else if (friendo.getStatStage(STATS.CORE) > 1) {
      return {
        xOffset: 22,
        yOffset: -40,
      }
    }

    return {
      xOffset: 25,
      yOffset: -30,
    }
  }

  drawCoreSegment(g, x, y) {
    drawOutlinedOval(g, x - 25, y - 50, 50, 50)

    drawHookMarker(g, x, y)
  }

  drawLvl5Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y - 100, friendo, doBlink)

    // Only draw "shoulder pads" if the friendo HAS arms
    if (friendo.getStatStage(STATS.ARM) > 0) {
      this.drawCoreSegment(g, x - 44, y - 75, friendo)
      this.drawCoreSegment(g, x + 44, y - 75, friendo)
    } else {
      this.drawCoreSegment(g, x - 44, y - 75, friendo)
      this.drawCoreSegment(g, x + 44, y - 25, friendo)
    }
    this.drawCoreSegment(g, x, y - 50, friendo)
    this.drawCoreSegment(g, x, y, friendo)
    return computedTethers
  }

  drawLvl4Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y - 88, friendo, doBlink)
    this.drawCoreSegment(g, x - 25, y - 44, friendo)
    this.drawCoreSegment(g, x + 25, y - 44, friendo)
    this.drawCoreSegment(g, x, y, friendo)
    return computedTethers
  }

  drawLvl3Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x - 25, y - 44, friendo, doBlink)
    this.drawCoreSegment(g, x + 25, y - 44, friendo)
    this.drawCoreSegment(g, x, y, friendo)
    return Object.assign({}, computedTethers, { hairXOffset: -25 })
  }

  drawLvl2Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y - 50, friendo, doBlink)
    this.drawCoreSegment(g, x, y, friendo)
    return computedTethers
  }

  drawLvl1Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y, friendo, doBlink)
    return computedTethers
  }

  armBrush(friendo) {
    return (_g) => {
      if (friendo.getStatStage(STATS.ARM) > 0) {
        drawOutlinedOval(_g, 0, 0, this.armGirth, this.armLength)
      }
    }
  }

  legBrush(friendo) {
    return (_g) => {
      if (friendo.getStatStage(STATS.LEG) > 0) {
        drawOutlinedOval(
          _g,
          -this.footLength,
          -this.footHeight,
          this.footLength,
          this.footHeight,
        )
        drawOutlinedOval(
          _g,
          -(this.legGirth / 2),
          -this.legHeight,
          this.legGirth,
          this.legHeight,
        )
        drawOval(
          _g,
          -this.footLength + 1,
          -this.footHeight + 1,
          this.footLength - 4,
          this.footHeight - 3,
          true,
        )
      }
    }
  }

  // Overridden egg-drawing methods
  eggCrack1(g, x, y) {
    crack1(g, x - 10, y - 48)
  }
  eggCrack2(g, x, y) {
    crack2(g, x + 24, y - 28)
  }
  eggCrack3(g, x, y) {
    crack3(g, x - 20, y - 10)
  }
  eggHalo(g, x, y) {
    drawOval(g, x - 28, y - 53, 56, 56, true)
  }
}
