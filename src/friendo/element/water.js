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

  computeAnchors(friendo) {
    super.computeAnchors(friendo)
    this.bodyOffset -= 5 // tweak body offset to make sure body and legs connect
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

  drawLvl5Core(g, x, y, friendo) {
    const computedTethers = this.drawHeadSegment(g, x, y - 100, friendo)
    this.drawCoreSegment(g, x - 44, y - 75, friendo)
    this.drawCoreSegment(g, x + 44, y - 75, friendo)
    this.drawCoreSegment(g, x, y - 50, friendo)
    this.drawCoreSegment(g, x, y, friendo)
    return computedTethers
  }

  drawLvl4Core(g, x, y, friendo) {
    const computedTethers = this.drawHeadSegment(g, x, y - 88, friendo)
    this.drawCoreSegment(g, x - 25, y - 44, friendo)
    this.drawCoreSegment(g, x + 25, y - 44, friendo)
    this.drawCoreSegment(g, x, y, friendo)
    return computedTethers
  }

  drawLvl3Core(g, x, y, friendo) {
    const computedTethers = this.drawHeadSegment(g, x - 25, y - 44, friendo)
    this.drawCoreSegment(g, x + 25, y - 44, friendo)
    this.drawCoreSegment(g, x, y, friendo)
    return computedTethers
  }

  drawLvl2Core(g, x, y, friendo) {
    const computedTethers = this.drawHeadSegment(g, x, y - 50, friendo)
    this.drawCoreSegment(g, x, y, friendo)
    return computedTethers
  }

  drawLvl1Core(g, x, y, friendo) {
    const computedTethers = this.drawHeadSegment(g, x, y, friendo)
    return computedTethers
  }

  armBrush(friendo) {
    return (_g) => {
      if (friendo.stats[STATS.ARM] > 0) {
        drawOutlinedOval(_g, 0, 0, this.armGirth, this.armLength)
      }
    }
  }

  legBrush(friendo) {
    return (_g) => {
      if (friendo.stats[STATS.LEG] > 0) {
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
}
