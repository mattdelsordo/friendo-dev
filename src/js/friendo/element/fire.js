import { STATS } from '../constants'
import { FIRE_SKIN, FIRE_OUTLINE } from '../../art/colors'
import Element from './element'
import ELEMENTS from './elements'
import { drawHookMarker } from '../../art/hook-marker'
import { drawLine, drawOutlinedPolygon } from '../../art/art-util'

/**
 * Specifies how a fire friendo is drawn
 */

export default class Fire extends Element {
  constructor() {
    super()
    this.id = ELEMENTS.FIRE
  }

  setColors(g) {
    g.fillStyle = FIRE_SKIN
    g.strokeStyle = FIRE_OUTLINE
  }

  drawEyes(g, x, y, friendo, doBlink) {
    if (friendo.stats[STATS.SIGHT] > 6) {
      // lvl 7 and up, 3 eyes
      // fire types are a special case
      this.drawEye(g, x, y - 6, doBlink)
      this.drawEye(g, x - 6, y + 4, doBlink)
      this.drawEye(g, x + 6, y + 4, doBlink)
    } else if (friendo.stats[STATS.SIGHT] > 3) {
      // lvl 4 and up, 2 eyes
      // eyes must be moved down if a fire element
      this.drawEye(g, x - 8, y, doBlink)
      this.drawEye(g, x + 8, y, doBlink)
    } else {
      // default = 1 eye
      this.drawEye(g, x, y, doBlink)
    }

    drawHookMarker(g, x, y)
  }

  drawFace(g, x, y, friendo, doBlink) {
    // if the friendo is a fire element, the face needs to be drawn
    // farther down to fit in the core segment
    drawLine(g, x - 5, y + 6, x + 5, y + 6) // mouth
    drawLine(g, x - 1, y - 5, x - 1, y + 2) // vertical nose
    drawLine(g, x - 2, y + 2, x + 3, y + 2) // horizontal nose
    this.drawEyes(g, x, y - 8, doBlink)

    drawHookMarker(g, x, y)
  }

  drawLvl5Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 86, friendo, doBlink)

    g.save()
    g.translate(x, y - 86)
    g.rotate(Math.PI)
    this.drawCoreSegment(g, 25, 0, friendo)
    this.drawCoreSegment(g, -24, 0, friendo)
    g.restore()

    this.drawCoreSegment(g, x - 25, y, friendo)
    this.drawCoreSegment(g, x + 25, y, friendo)
  }

  drawLvl4Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 66, friendo, doBlink)

    g.save()
    g.translate(x - 25, y - 66)
    g.rotate(Math.PI)
    this.drawCoreSegment(g, 0, 0, friendo)
    g.restore()

    g.save()
    g.translate(x + 25, y - 66)
    g.rotate(Math.PI)
    this.drawCoreSegment(g, 0, 0, friendo)
    g.restore()

    g.save()
    g.translate(x, y - 23)
    g.rotate(Math.PI)
    this.drawCoreSegment(g, 0, 0, friendo)
    g.restore()
  }

  drawLvl3Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 43, friendo, doBlink)
    this.drawCoreSegment(g, x - 25, y)
    this.drawCoreSegment(g, x + 25, y)
  }

  drawLvl2Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 23, friendo, doBlink)

    g.save()
    g.translate(x, y - 23)
    g.rotate(Math.PI)
    this.drawCoreSegment(g, 0, 0, friendo)
    g.restore()
  }

  drawLvl1Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y, friendo, doBlink)
  }

  drawHeadSegment(g, x, y, friendo, doBlink) {
    this.drawBackHair(g, x, y - 42) // back hair on top of head core
    this.drawCoreSegment(g, x, y) // head core
    this.drawFace(g, x, y - 12, doBlink) // face relative to head core
    this.drawFrontHair(g, x, y - 42) // front hair on top of head core

    drawHookMarker(g, x, y)
  }

  computeArmTethers(friendo) {
    if (friendo.stats[STATS.CORE] > 8) {
      return {
        xOffset: 42,
        yOffset: -70,
      }
    } else if (friendo.stats[STATS.CORE] > 6) {
      return {
        xOffset: 42,
        yOffset: -50,
      }
    } else if (friendo.stats[STATS.CORE] > 4) {
      return {
        xOffset: 22,
        yOffset: -50,
      }
    } else if (friendo.stats[STATS.CORE] > 2) {
      return {
        xOffset: 22,
        yOffset: -20,
      }
    } else {
      return {
        xOffset: 14,
        yOffset: -20,
      }
    }
  }

  armBrush(g, x, y, w, h) {
    drawOutlinedPolygon(g,
      [x, x - (w / 2), x],
      [y, y + (h / 2), y + h],
      true,
    )
  }

  drawLeg(g, x, y, legGirth, legHeight, footLength, footHeight) {
    drawOutlinedPolygon(g,
      [x, x,              x-legGirth,         x,  x-(footLength/2),    x-footLength],
      [y, y-legHeight,    y-(legHeight/2),    y,  y-footHeight,       y],
      true,
    )
  }

  drawCoreSegment(g, x, y) {
    drawOutlinedPolygon(g, [x, x - 25, x + 25], [y - 43, y, y])

    drawHookMarker(g, x, y)
  }
}
