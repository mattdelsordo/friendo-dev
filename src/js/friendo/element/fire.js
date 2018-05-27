import { STATS } from '../constants'
import { FIRE_SKIN, FIRE_OUTLINE } from '../../art/colors'
import Element, { ELEMENTS } from './element'

/**
 * Specifies how a fire friendo is drawn
 */

export default class Fire extends Element{
  constructor(g) {
    super(g)
    this.id = STATS.FIRE
  }

  setColors(g) {
    g.fillStyle = FIRE_SKIN
    g.strokeStyle = FIRE_OUTLINE
  }

  drawEyes(g, x, y, friendo, doBlink) {
    if (friendo.stats[STATS.SIGHT] > 6) {
      // lvl 7 and up, 3 eyes
      // fire types are a special case
      drawEye(g, x, y - 6, doBlink)
      drawEye(g, x - 6, y + 4, doBlink)
      drawEye(g, x + 6, y + 4, doBlink)
    } else if (friendo.stats[STATS.SIGHT] > 3) {
      // lvl 4 and up, 2 eyes
      // eyes must be moved down if a fire element
      drawEye(g, x - 8, y, doBlink)
      drawEye(g, x + 8, y, doBlink)
    } else {
      // default = 1 eye
      drawEye(g, x, y, doBlink)
    }

    drawHookMarker(g, x, y)
  }

  drawFace(g, x, y, friendo, doBlink) {
    // if the friendo is a fire element, the face needs to be drawn
    // farther down to fit in the core segment
    drawLine(g, x - 5, y + 6, x + 5, y + 6) // mouth
    drawLine(g, x - 1, y - 5, x - 1, y + 2) // vertical nose
    drawLine(g, x - 2, y + 2, x + 3, y + 2) // horizontal nose
    drawEyes(g, x, y - 8, doBlink)

    drawHookMarker(g, x, y)
  }

  drawLvl5Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 86, friendo, doBlink)

    g.save()
    g.translate(x, y - 86)
    g.rotate(Math.PI)
    drawCoreSegment(g, 25, 0, friendo)
    drawCoreSegment(g, -24, 0, friendo)
    g.restore()

    drawCoreSegment(g, x - 25, y, friendo)
    drawCoreSegment(g, x + 25, y, friendo)
  }

  drawLvl4Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 66, friendo, doBlink)

    g.save()
    g.translate(x - 25, y - 66)
    g.rotate(Math.PI)
    drawCoreSegment(g, 0, 0, friendo)
    g.restore()

    g.save()
    g.translate(x + 25, y - 66)
    g.rotate(Math.PI)
    drawCoreSegment(g, 0, 0, friendo)
    g.restore()

    g.save()
    g.translate(x, y - 23)
    g.rotate(Math.PI)
    drawCoreSegment(g, 0, 0, friendo)
    g.restore()
  }

  drawLvl3Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 43, friendo, doBlink)
    drawCoreSegment(g, x - 25, y)
    drawCoreSegment(g, x + 25, y)
  }

  drawLvl2Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y - 23, friendo, doBlink)

    g.save()
    g.translate(x, y - 23)
    g.rotate(Math.PI)
    drawCoreSegment(g, 0, 0, friendo)
    g.restore()
  }

  drawLvl1Core(g, x, y, friendo, doBlink) {
    this.drawHeadSegment(g, x, y, friendo, doBlink)
  }

  drawHeadSegment(g, x, y, friendo, doBlink) {
    drawBackHair(g, x, y - 42) // back hair on top of head core
    drawCoreSegment(g, x, y) // head core
    drawFace(g, x, y - 12, doBlink) // face relative to head core
    drawFrontHair(g, x, y - 42) // front hair on top of head core

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

  drawArm(g, x, y, w, h) {
    drawOutlinedPolygon(g,
      [x, x-(w/2), x,],
      [y, y+(h/2), y+h,],
      true)
  }
}
