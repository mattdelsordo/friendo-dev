import { DEFAULT_SKIN, DEFAULT_OUTLINE } from '../../art/colors'
import { STATS } from '../constants'
import ELEMENTS from './elements'
import { drawHookMarker } from '../../art/hook-marker'
import { drawDiglettHair, drawLusciousHairBack, drawLusciousHairFront, drawStevenHair } from '../../art/hair'
import { left, right, drawOval, drawLine, drawOutlinedRect, drawOutlinedPolygon } from '../../art/art-util'

/**
 * Specifies graphical representation and drawing style of a Friendo
 */

export default class Element {
  constructor() {
    this.id = ELEMENTS.NULL
  }

  toJSON() {
    return this.id
  }

  toString() {
    return this.id
  }

  setColors(g) {
    g.fillStyle = DEFAULT_SKIN
    g.strokeStyle = DEFAULT_OUTLINE
  }

  drawEyes(g, x, y, friendo, doBlink) {
    if (friendo.stats[STATS.SIGHT] > 6) {
      // lvl 7 and up, 3 eyes
      // fire types are a special case
      this.drawEye(g, x, y - 8, doBlink)
      this.drawEye(g, x - 8, y, doBlink)
      this.drawEye(g, x + 8, y, doBlink)
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

    drawLine(g, x - 5, y, x + 5, y) // mouth
    drawLine(g, x - 1, y - 11, x - 1, y - 4) // vertical nose
    drawLine(g, x - 2, y - 4, x + 3, y - 4) // horizontal nose
    this.drawEyes(g, x, y - 14, friendo, doBlink)

    drawHookMarker(g, x, y)
  }

  // core drawing delegated to child elements
  drawCore(g, x, y, friendo, doBlink) {
    if (friendo.stats[STATS.CORE] > 8) {
      // 5-6 segments
      this.drawLvl5Core(g, x, y, friendo, doBlink)
    } else if (friendo.stats[STATS.CORE] > 6) {
      // 4 segments
      this.drawLvl4Core(g, x, y, friendo, doBlink)
    } else if (friendo.stats[STATS.CORE] > 4) {
      // 3 segments
      this.drawLvl3Core(g, x, y, friendo, doBlink)
    } else if (friendo.stats[STATS.CORE] > 2) {
      // 2 segments
      this.drawLvl2Core(g, x, y, friendo, doBlink)
    } else {
      // 1 segment
      this.drawLvl1Core(g, x, y, friendo, doBlink)
    }
  }
  drawLvl5Core() {}
  drawLvl4Core() {}
  drawLvl3Core() {}
  drawLvl2Core() {}
  drawLvl1Core() {}

  drawHeadSegment(g, x, y, friendo, doBlink) {
    this.drawBackHair(g, x, y - 50, friendo) // back hair on top of head core
    this.drawCoreSegment(g, x, y, friendo) // head core
    this.drawFace(g, x, y - 12, friendo, doBlink) // face relative to head core
    this.drawFrontHair(g, x, y - 50, friendo) // front hair on top of head core

    drawHookMarker(g, x, y)
  }

  drawLegs(g, x, y, friendo) {
    if (friendo.stats[STATS.LEG] > 0) {
      // gap between legs
      const thighGap = 13

      // draw element of leg based on element of friendo
      // return the height at which to draw the body
      left(g, x - (thighGap / 2), y, this.legBrush(friendo), 0)
      right(g, x + (thighGap / 2), y, this.legBrush(friendo), 0)

      drawHookMarker(g, x, y)
    }
    // no legs, draw body just on the floor or whatever
    return 0
  }

  // hair that gets painted behind the head segment
  drawBackHair(g, x, y, friendo) {
    g.save()
    // hair needs to be at the back of EVERYTHING
    // this draws it to the 'underside' of the canvas
    g.globalCompositeOperation = 'destination-over'
    if (friendo.stats[STATS.HAIR] > 7) drawLusciousHairBack(g, x, y, friendo.stats[STATS.HAIR])
    else if (friendo.stats[STATS.HAIR] > 3) drawStevenHair(g, x, y, friendo.stats[STATS.HAIR])
    g.restore()
    drawHookMarker(g, x, y)
  }

  // hair that gets painted in front of the head segment
  drawFrontHair(g, x, y, friendo) {
    if (friendo.stats[STATS.HAIR] > 7) drawLusciousHairFront(g, x, y, friendo.stats[STATS.HAIR])
    else if (friendo.stats[STATS.HAIR] > 0 && friendo.stats[STATS.HAIR] < 4) drawDiglettHair(g, x, y, friendo.stats[STATS.HAIR])

    drawHookMarker(g, x, y)
  }

  drawFrontHair(g, x, y, friendo) {
    if (friendo.stats[STATS.HAIR] > 7) drawLusciousHairFront(g, x, y, friendo.stats[STATS.HAIR])
    else if (friendo.stats[STATS.HAIR] > 0 && friendo.stats[STATS.HAIR] < 4) drawDiglettHair(g, x, y, friendo.stats[STATS.HAIR])

    drawHookMarker(g, x, y)
  }

  // compute where arms should be tethered
  // delegated to child classes
  computeTethers(friendo) {

  }

  // default arm is left
  // accepts the friendo and returns a function that takes in the graphics
  // context and returns a function to draw the specific arm
  armBrush(friendo) {
    const armGirth = friendo.stats[STATS.ARM] * 2
    const armLength = Math.floor(((friendo.stats[STATS.ARM] - 1) * 6) + 10)

    return (_g) => {
      drawOutlinedRect(_g, 0, 0, armGirth, armLength)
    }
  }

  // default leg is left
  // returns the function that properly draws the leg
  legBrush(friendo) {
    /**
     * Parameters for drawing the legs
     * These values are complete nonsense I just fiddled till it looked like it scaled good
     */
    const legGirth = friendo.stats[STATS.LEG] * 2 // thiccness of leg
    const legHeight = ((friendo.stats[STATS.LEG] - 1) * 6) + 10 // length of leg
    const footLength = Math.floor(legGirth * 1.3) + 3
    const footHeight = legHeight / 4

    return (_g) => {
      drawOutlinedPolygon(
        _g,
        [(legGirth / 2), (legGirth / 2), -(legGirth / 2), -(legGirth / 2), -footLength, -footLength],
        [0,-legHeight, -legHeight, -footHeight, -footHeight, 0],
        true,
      )
    }
  }

  drawCoreSegment(g, x, y) {
    drawOutlinedRect(g, x - 25, y - 50, 50, 50)

    drawHookMarker(g, x, y)
  }

  drawEye(g, x, y, doBlink) {
    if (doBlink) g.fillRect(x - 5, y - 1, 10, 2)
    else {
      // save fill color so that we can paint a full eye
      const fillPre = g.fillStyle
      const strokePre = g.strokeStyle
      g.fillStyle = strokePre
      drawOval(g, x - 5, y - 10, 10, 10) // rim
      drawOval(g, x - 3, y - 8, 6, 6, true) // pupil
      g.fillStyle = fillPre
    }

    drawHookMarker(g, x, y)
  }
}
