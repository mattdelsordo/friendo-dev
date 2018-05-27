import { STATS } from '../constants'
import { WATER_OUTLINE, WATER_SKIN } from '../../art/colors'
import Element from './element'

/**
 * Specifies how a water friendo is drawn
 */

export default class WATER extends Element {
  constructor(g) {
    super(g)
    this.id = STATS.WATER
  }

  setColors(g) {
    g.fillStyle = WATER_SKIN
    g.strokeStyle = WATER_OUTLINE
  }

  drawLvl5Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 100, friendo, doBlink)
    drawCoreSegment(g, x - 44, y - 75, friendo)
    drawCoreSegment(g, x + 44, y - 75, friendo)
    drawCoreSegment(g, x, y - 50, friendo)
    drawCoreSegment(g, x, y, friendo)
  }

  drawLvl4Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 88, friendo, doBlink)
    drawCoreSegment(g, x - 25, y - 44, friendo)
    drawCoreSegment(g, x + 25, y - 44, friendo)
    drawCoreSegment(g, x, y, friendo)
  }

  drawLvl3Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x - 25, y - 44, friendo, doBlink)
    drawCoreSegment(g, x + 25, y - 44, friendo)
    drawCoreSegment(g, x, y, friendo)
  }

  drawLvl2Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 50, friendo, doBlink)
    drawCoreSegment(g, x, y, friendo)
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

  drawArm(g, x, y, w, h) {
    drawOutlinedOval(g, x, y, w, h)
  }
}
