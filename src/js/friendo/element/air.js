import { STATS } from '../constants'
import { AIR_OUTLINE, AIR_SKIN } from '../../art/colors'
import Element from './element'

/**
 * Specifies how a air friendo is drawn
 */

export default class Air extends Element{
  constructor(g) {
    super(g)
    this.id = STATS.AIR
  }

  setColors(g) {
    g.fillStyle = AIR_SKIN
    g.strokeStyle = AIR_OUTLINE
  }

  drawLvl5Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 120, friendo, doBlink)
    drawCoreSegment(g, x - 30, y - 90, friendo)
    drawCoreSegment(g, x + 30, y - 90, friendo)
    drawCoreSegment(g, x, y - 60, friendo)
    drawCoreSegment(g, x - 30, y - 30, friendo)
    drawCoreSegment(g, x + 30, y - 30, friendo)
    drawCoreSegment(g, x, y, friendo)
  }

  drawLvl4Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 60, friendo, doBlink)
    drawCoreSegment(g, x - 30, y - 30, friendo)
    drawCoreSegment(g, x + 30, y - 30, friendo)
    drawCoreSegment(g, x, y, friendo)
  }

  drawLvl3Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 26, friendo, doBlink)
    drawCoreSegment(g, x + 30, y + 4, friendo)
    drawCoreSegment(g, x - 30, y + 4, friendo)
  }

  drawLvl2Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x - 30, y - 30, friendo, doBlink)
    drawCoreSegment(g, x, y, friendo)
  }

  drawLvl1Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y, doBlink, friendo)
  }

  computeArmTethers(friendo) {
    if (friendo.stats[STATS.CORE] > 8) {
      return {
        xOffset: 56,
        yOffset: -100,
      }
    } else if (friendo.stats[STATS.CORE] > 6) {
      return {
        xOffset: 54,
        yOffset: -44,
      }
    } else if (friendo.stats[STATS.CORE] > 4) {
      return {
        xOffset: 50,
        yOffset: -10,
      }
    } else if (friendo.stats[STATS.CORE] > 2) {
      return {
        xOffset: 24,
        yOffset: -18,
      }
    } else {
      return {
        xOffset: 24,
        yOffset: -18,
      }
    }
  }

  drawArm(g, x, y, w, h) {
    drawOutlinedPolygon(g,
      [x, x-(w/2), x, x+(w/2)],
      [y, y+(h/2), y+h, y+(h/2)],
      true)
  }
}
