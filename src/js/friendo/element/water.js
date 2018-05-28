import { STATS } from '../constants'
import { WATER_OUTLINE, WATER_SKIN } from '../../art/colors'
import Element from './element'
import ELEMENTS from './elements'
import { drawHookMarker } from '../../art/hook-marker'
import { drawOval, drawOutlinedOval } from '../../art/art-util'

/**
 * Specifies how a water friendo is drawn
 */

export default class WATER extends Element {
  constructor() {
    super()
    this.id = ELEMENTS.WATER
  }

  setColors(g) {
    g.fillStyle = WATER_SKIN
    g.strokeStyle = WATER_OUTLINE
  }

  drawLvl5Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 100, friendo, doBlink)
    this.drawCoreSegment(g, x - 44, y - 75, friendo)
    this.drawCoreSegment(g, x + 44, y - 75, friendo)
    this.drawCoreSegment(g, x, y - 50, friendo)
    this.drawCoreSegment(g, x, y, friendo)
  }

  drawLvl4Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 88, friendo, doBlink)
    this.drawCoreSegment(g, x - 25, y - 44, friendo)
    this.drawCoreSegment(g, x + 25, y - 44, friendo)
    this.drawCoreSegment(g, x, y, friendo)
  }

  drawLvl3Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x - 25, y - 44, friendo, doBlink)
    this.drawCoreSegment(g, x + 25, y - 44, friendo)
    this.drawCoreSegment(g, x, y, friendo)
  }

  drawLvl2Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 50, friendo, doBlink)
    this.drawCoreSegment(g, x, y, friendo)
  }

  drawLvl1Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y, friendo, doBlink)
  }

  computeArmTethers(friendo) {
    if (friendo.stats[STATS.CORE] > 8) {
      return {
        xOffset: 60,
        yOffset: -90,
      }
    } else if (friendo.stats[STATS.CORE] > 6) {
      return {
        xOffset: 50,
        yOffset: -75,
      }
    } else if (friendo.stats[STATS.CORE] > 4) {
      return {
        xOffset: 50,
        yOffset: -64,
      }
    } else if (friendo.stats[STATS.CORE] > 2) {
      return {
        xOffset: 22,
        yOffset: -40,
      }
    } else {
      return {
        xOffset: 25,
        yOffset: -30,
      }
    }
  }

  armBrush(g, x, y, w, h) {
    drawOutlinedOval(g, x, y, w, h)
  }

  drawLeg(g, x, y, legGirth, legHeight, footLength, footHeight) {
    drawOutlinedOval(g, x - footLength, y - footHeight, footLength, footHeight)
    drawOutlinedOval(g, x - (legGirth / 2), y - legHeight, legGirth, legHeight)
    drawOval(g, x - footLength + 1, y - footHeight + 1, footLength - 4, footHeight - 3, true)
  }

  drawCoreSegment(g, x, y) {
    drawOutlinedOval(g, x - 25, y - 50, 50, 50)

    drawHookMarker(g, x, y)
  }
}
