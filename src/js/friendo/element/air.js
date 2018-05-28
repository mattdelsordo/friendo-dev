import { STATS } from '../constants'
import { AIR_OUTLINE, AIR_SKIN } from '../../art/colors'
import Element from './element'
import ELEMENTS from './elements'
import { drawHookMarker } from '../../art/hook-marker'
import { drawOutlinedPolygon } from '../../art/art-util'

/**
 * Specifies how a air friendo is drawn
 */

export default class Air extends Element{
  constructor() {
    super()
    this.id = ELEMENTS.AIR
  }

  setColors(g) {
    g.fillStyle = AIR_SKIN
    g.strokeStyle = AIR_OUTLINE
  }

  drawLvl5Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 120, friendo, doBlink)
    this.drawCoreSegment(g, x - 30, y - 90, friendo)
    this.drawCoreSegment(g, x + 30, y - 90, friendo)
    this.drawCoreSegment(g, x, y - 60, friendo)
    this.drawCoreSegment(g, x - 30, y - 30, friendo)
    this.drawCoreSegment(g, x + 30, y - 30, friendo)
    this.drawCoreSegment(g, x, y, friendo)
  }

  drawLvl4Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 60, friendo, doBlink)
    this.drawCoreSegment(g, x - 30, y - 30, friendo)
    this.drawCoreSegment(g, x + 30, y - 30, friendo)
    this.drawCoreSegment(g, x, y, friendo)
  }

  drawLvl3Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 26, friendo, doBlink)
    this.drawCoreSegment(g, x + 30, y + 4, friendo)
    this.drawCoreSegment(g, x - 30, y + 4, friendo)
  }

  drawLvl2Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x - 30, y - 30, friendo, doBlink)
    this.drawCoreSegment(g, x, y, friendo)
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

  armBrush(g, x, y, w, h) {
    drawOutlinedPolygon(g,
      [x, x - (w / 2), x, x + (w / 2)],
      [y, y + (h / 2), y + h, y + (h / 2)],
      true,
    )
  }

  drawLeg(g, x, y, legGirth, legHeight, footLength, footHeight) {
    drawOutlinedPolygon(g,
      [x, x+(legGirth/2),  x,           x-(legGirth/2),  x, x-(legGirth/4), x-(legGirth/4)-(footLength/4), x-(legGirth/4)-(footLength/2), x-(legGirth/4)-(footLength/4),x-(legGirth/4)],
      [y, y-(legHeight/2), y-legHeight, y-(legHeight/2), y, y-footHeight,     y-footHeight, y, y, y-footHeight],
      true,
    )
  }

  drawCoreSegment(g, x, y) {
    drawOutlinedPolygon(g, [x, x - 25, x, x + 25], [y - 50, y - 25, y, y - 25])

    drawHookMarker(g, x, y)
  }
}
