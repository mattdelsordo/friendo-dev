import { STATS } from '../constants'
import { EARTH_OUTLINE, EARTH_SKIN } from '../../art/colors'
import Element, { ELEMENTS } from './element'

/**
 * Specifies how a earth friendo is drawn
 */

export default class Earth extends Element{
  constructor(g) {
    super(g)
    this.id = STATS.EARTH
  }

  setColors(g) {
    g.fillStyle = EARTH_SKIN
    g.strokeStyle = EARTH_OUTLINE
  }

  drawLvl5Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 150, friendo, doBlink)
    drawCoreSegment(g, x - 50, y - 100, friendo)
    drawCoreSegment(g, x + 50, y - 100, friendo)
    drawCoreSegment(g, x, y - 100, friendo)
    drawCoreSegment(g, x, y - 50, friendo)
    drawCoreSegment(g, x, y, friendo)
  }

  drawLvl4Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 100, friendo, doBlink)
    drawCoreSegment(g, x - 25, y - 50, friendo)
    drawCoreSegment(g, x + 25, y - 50, friendo)
    drawCoreSegment(g, x, y, friendo)
  }

  drawLvl3Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 100, friendo, doBlink)
    drawCoreSegment(g, x, y - 50, friendo)
    drawCoreSegment(g, x, y, friendo)
  }

  drawLvl2Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 50, friendo, doBlink)
    drawCoreSegment(g, x, y, friendo)
  }

  drawLvl1Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y, doBlink, friendo)
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

  drawArm(g, x, y, w, h) {
    drawOutlinedRect(g, x, y, w, h)
  }
}

