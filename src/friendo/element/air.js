import { STATS } from '../constants'
import { AIR_OUTLINE, AIR_SKIN, AIR_EGG_OUTLINE, AIR_EGG_SKIN } from '../../art/colors'
import Element from './element'
import ELEMENTS from './elements'
import { drawHookMarker } from '../../art/hook-marker'
import { drawOutlinedPolygon, drawPolygon } from '../../art/art-util'
import { crack1, crack2, crack3 } from '../../art/props/egg-cracks'

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

  setEggColors(g) {
    g.fillStyle = AIR_EGG_SKIN
    g.strokeStyle = AIR_EGG_OUTLINE
  }

  // override to reposition hat
  drawBirthday(g, x, y, friendo) {
    super.drawBirthday(g, x, y + 12, friendo)
  }

  computeArmTethers(friendo) {
    if (friendo.getStatStage(STATS.CORE) > 8) {
      return {
        xOffset: 56,
        yOffset: -100,
      }
    } else if (friendo.getStatStage(STATS.CORE) > 6) {
      return {
        xOffset: 54,
        yOffset: -44,
      }
    } else if (friendo.getStatStage(STATS.CORE) > 4) {
      return {
        xOffset: 50,
        yOffset: -10,
      }
    } else if (friendo.getStatStage(STATS.CORE) > 2) {
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

  computeHandCoord() {
    return {
      x: 0,
      y: this.armLength,
    }
  }

  drawCoreSegment(g, x, y) {
    drawOutlinedPolygon(g, [x, x - 25, x, x + 25], [y - 50, y - 25, y, y - 25])

    drawHookMarker(g, x, y)
  }

  drawLvl5Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y - 120, friendo, doBlink)
    this.drawCoreSegment(g, x - 30, y - 90, friendo)
    this.drawCoreSegment(g, x + 30, y - 90, friendo)
    this.drawCoreSegment(g, x, y - 60, friendo)
    this.drawCoreSegment(g, x - 30, y - 30, friendo)
    this.drawCoreSegment(g, x + 30, y - 30, friendo)
    this.drawCoreSegment(g, x, y, friendo)
    return computedTethers
  }

  drawLvl4Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y - 60, friendo, doBlink)
    this.drawCoreSegment(g, x - 30, y - 30, friendo)
    this.drawCoreSegment(g, x + 30, y - 30, friendo)
    this.drawCoreSegment(g, x, y, friendo)
    return computedTethers
  }

  drawLvl3Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y - 26, friendo, doBlink)
    this.drawCoreSegment(g, x + 30, y + 4, friendo)
    this.drawCoreSegment(g, x - 30, y + 4, friendo)
    return computedTethers
  }

  drawLvl2Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x - 30, y - 30, friendo, doBlink)
    this.drawCoreSegment(g, x, y, friendo)
    return Object.assign({}, computedTethers, { hairXOffset: -30 })
  }

  drawLvl1Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y, friendo, doBlink)
    return computedTethers
  }

  armBrush(friendo) {
    return (_g) => {
      if (friendo.getStatStage(STATS.ARM) > 0) {
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
      if (friendo.getStatStage(STATS.LEG) > 0) {
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

  // Overridden egg-drawing methods
  eggCrack1(g, x, y) {
    crack1(g, x - 8, y - 43)
  }
  eggCrack2(g, x, y) {
    crack2(g, x + 22, y - 29)
  }
  eggCrack3(g, x, y) {
    crack3(g, x - 6, y - 6)
  }
  eggHalo(g, x, y) {
    drawPolygon(g, [x, x - 28, x, x + 28], [y - 53, y - 25, y + 3, y - 25], true)
  }
}
