import { STATS } from '../constants'
import { AIR_OUTLINE, AIR_SKIN } from '../../art/colors'
import Element from './element'
import ELEMENTS from './elements'
import { drawHookMarker } from '../../art/hook-marker'
import { drawOutlinedPolygon } from '../../art/art-util'

/**
 * Specifies how a air friendo is drawn
 */

export default class Air extends Element {
  constructor() {
    super()
    this.id = ELEMENTS.AIR
  }

  setColors(g) {
    g.fillStyle = AIR_SKIN
    g.strokeStyle = AIR_OUTLINE
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
    }
    return {
      xOffset: 24,
      yOffset: -18,
    }
  }

  drawCoreSegment(g, x, y) {
    drawOutlinedPolygon(g, [x, x - 25, x, x + 25], [y - 50, y - 25, y, y - 25])

    drawHookMarker(g, x, y)
  }

  drawLvl5Core(g, x, y, friendo) {
    this.drawHeadSegment(g, x, y - 120, friendo)
    this.drawCoreSegment(g, x - 30, y - 90, friendo)
    this.drawCoreSegment(g, x + 30, y - 90, friendo)
    this.drawCoreSegment(g, x, y - 60, friendo)
    this.drawCoreSegment(g, x - 30, y - 30, friendo)
    this.drawCoreSegment(g, x + 30, y - 30, friendo)
    this.drawCoreSegment(g, x, y, friendo)
  }

  drawLvl4Core(g, x, y, friendo) {
    this.drawHeadSegment(g, x, y - 60, friendo)
    this.drawCoreSegment(g, x - 30, y - 30, friendo)
    this.drawCoreSegment(g, x + 30, y - 30, friendo)
    this.drawCoreSegment(g, x, y, friendo)
  }

  drawLvl3Core(g, x, y, friendo) {
    this.drawHeadSegment(g, x, y - 26, friendo)
    this.drawCoreSegment(g, x + 30, y + 4, friendo)
    this.drawCoreSegment(g, x - 30, y + 4, friendo)
  }

  drawLvl2Core(g, x, y, friendo) {
    this.drawHeadSegment(g, x - 30, y - 30, friendo)
    this.drawCoreSegment(g, x, y, friendo)
  }

  drawLvl1Core(g, x, y, friendo) {
    this.drawHeadSegment(g, x, y, friendo)
  }

  armBrush(friendo) {
    return (_g) => {
      if (friendo.stats[STATS.ARM] > 0) {
        drawOutlinedPolygon(
          _g,
          [0, -(this.armGirth / 2), 0, (this.armGirth / 2)],
          [0, (this.armLength / 2), this.armLength, (this.armLength / 2)],
          true,
        )
      }
    }
  }

  legBrush(friendo) {
    return (_g) => {
      if (friendo.stats[STATS.LEG] > 0) {
        drawOutlinedPolygon(
          _g,
          [
            0,
            (this.legGirth / 2),
            0,
            -(this.legGirth / 2),
            0,
            -(this.legGirth / 4),
            -(this.legGirth / 4) - (this.footLength / 4),
            -(this.legGirth / 4) - (this.footLength / 2),
            -(this.legGirth / 4) - (this.footLength / 4),
            -(this.legGirth / 4),
          ],
          [
            0,
            -(this.legHeight / 2),
            -this.legHeight,
            -(this.legHeight / 2),
            0,
            -this.footHeight,
            -this.footHeight,
            0,
            0,
            -this.footHeight],
          true,
        )
      }
    }
  }
}