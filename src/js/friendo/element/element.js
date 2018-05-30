import { DEFAULT_SKIN, DEFAULT_OUTLINE } from '../../art/colors'
import { STATS } from '../constants'
import ELEMENTS from './elements'
import { drawHookMarker } from '../../art/hook-marker'
import { drawDiglettHair, drawLusciousHairBack, drawLusciousHairFront, drawStevenHair } from '../../art/hair'
import { left, right, drawOval, drawLine, drawOutlinedRect, drawOutlinedPolygon } from '../../art/art-util'
import * as Measurements from '../measurements'

/**
 * Specifies graphical representation and drawing style of a Friendo
 */

export default class Element {
  constructor() {
    this.id = ELEMENTS.NULL


    // default anchors
    this.thighGap = 0
    this.armGirth = 0
    this.armLength = 0
    this.legGirth = 0
    this.legHeight = 0
    this.footLength = 0
    this.footHeight = 0
    this.bodyOffset = this.legHeight
    this.armOffset = { xOffset: 0, yOffset: 0 }
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

  // anchors are computed in the element because they are based off friendo
  // stats but otherwise vary with element
  computeAnchors(friendo) {
    this.thighGap = Measurements.thighGap()
    this.armGirth = Measurements.armGirth(friendo)
    this.armLength = Measurements.armLength(friendo)
    this.legGirth = Measurements.legGirth(friendo)
    this.legHeight = Measurements.legHeight(friendo)
    this.bodyOffset = this.legHeight
    this.footLength = Measurements.footLength(friendo)
    this.footHeight = Measurements.footHeight(friendo)
    this.armOffset = this.computeArmTethers(friendo)
  }

  drawEyes(g, x, y, friendo) {
    if (friendo.stats[STATS.SIGHT] > 6) {
      // lvl 7 and up, 3 eyes
      // fire types are a special case
      this.drawEye(g, x, y - 8, friendo.state.blink)
      this.drawEye(g, x - 8, y, friendo.state.blink)
      this.drawEye(g, x + 8, y, friendo.state.blink)
    } else if (friendo.stats[STATS.SIGHT] > 3) {
      // lvl 4 and up, 2 eyes
      // eyes must be moved down if a fire element
      this.drawEye(g, x - 8, y, friendo.state.blink)
      this.drawEye(g, x + 8, y, friendo.state.blink)
    } else {
      // default = 1 eye
      this.drawEye(g, x, y, friendo.state.blink)
    }

    drawHookMarker(g, x, y)
  }

  drawFace(g, x, y, friendo) {
    // if the friendo is a fire element, the face needs to be drawn
    // farther down to fit in the core segment

    drawLine(g, x - 5, y, x + 5, y) // mouth
    drawLine(g, x - 1, y - 11, x - 1, y - 4) // vertical nose
    drawLine(g, x - 2, y - 4, x + 3, y - 4) // horizontal nose
    this.drawEyes(g, x, y - 14, friendo)

    drawHookMarker(g, x, y)
  }

  // core drawing delegated to child elements
  drawCore(g, x, y, friendo) {
    if (friendo.stats[STATS.CORE] > 8) {
      // 5-6 segments
      this.drawLvl5Core(g, x, y, friendo)
    } else if (friendo.stats[STATS.CORE] > 6) {
      // 4 segments
      this.drawLvl4Core(g, x, y, friendo)
    } else if (friendo.stats[STATS.CORE] > 4) {
      // 3 segments
      this.drawLvl3Core(g, x, y, friendo)
    } else if (friendo.stats[STATS.CORE] > 2) {
      // 2 segments
      this.drawLvl2Core(g, x, y, friendo)
    } else {
      // 1 segment
      this.drawLvl1Core(g, x, y, friendo)
    }
  }
  drawLvl5Core(g, x, y, friendo) {
    this.drawHeadSegment(g, x, y - 150, friendo)
    this.drawCoreSegment(g, x - 50, y - 100, friendo)
    this.drawCoreSegment(g, x + 50, y - 100, friendo)
    this.drawCoreSegment(g, x, y - 100, friendo)
    this.drawCoreSegment(g, x, y - 50, friendo)
    this.drawCoreSegment(g, x, y, friendo)
  }

  drawLvl4Core(g, x, y, friendo) {
    this.drawHeadSegment(g, x, y - 100, friendo)
    this.drawCoreSegment(g, x - 25, y - 50)
    this.drawCoreSegment(g, x + 25, y - 50)
    this.drawCoreSegment(g, x, y)
  }

  drawLvl3Core(g, x, y, friendo) {
    this.drawHeadSegment(g, x, y - 100, friendo)
    this.drawCoreSegment(g, x, y - 50, friendo)
    this.drawCoreSegment(g, x, y, friendo)
  }

  drawLvl2Core(g, x, y, friendo) {
    this.drawHeadSegment(g, x, y - 50, friendo)
    this.drawCoreSegment(g, x, y, friendo)
  }

  drawLvl1Core(g, x, y, friendo) {
    this.drawHeadSegment(g, x, y, friendo)
  }

  drawHeadSegment(g, x, y, friendo) {
    this.drawBackHair(g, x, y - 50, friendo) // back hair on top of head core
    this.drawCoreSegment(g, x, y, friendo) // head core
    this.drawFace(g, x, y - 12, friendo) // face relative to head core
    this.drawFrontHair(g, x, y - 50, friendo) // front hair on top of head core

    drawHookMarker(g, x, y)
  }

  drawLegs(g, x, y, friendo) {
    if (friendo.stats[STATS.LEG] > 0) {
      // gap between legs
      const thighGap = 13

      // draw element of leg based on element of friendo
      // return the height at which to draw the body
      left(g, x - thighGap, y, this.legBrush(friendo), 0)
      right(g, x + thighGap, y, this.legBrush(friendo), 0)

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

  // compute where arms should be tethered
  // delegated to child classes
  computeArmTethers(friendo) {
    return {
      xOffset: 0,
      yOffset: 0,
    }
  }

  // default arm is left
  // accepts the friendo and returns a function that takes in the graphics
  // context and returns a function to draw the specific arm
  armBrush(friendo) {
    return (_g) => {
      if (friendo.stats[STATS.ARM] > 0) {
        drawOutlinedRect(_g, 0, 0, this.armGirth, this.armLength)
      }
    }
  }

  // default leg is left
  // returns the function that properly draws the leg
  legBrush(friendo) {
    return (_g) => {
      if (friendo.stats[STATS.LEG] > 0) {
        drawOutlinedPolygon(
          _g,
          [(this.legGirth / 2), (this.legGirth / 2), -(this.legGirth / 2), -(this.legGirth / 2), -this.footLength, -this.footLength],
          [0, -this.legHeight, -this.legHeight, -this.footHeight, -this.footHeight, 0],
          true,
        )
      }
    }
  }

  drawCoreSegment(g, x, y) {
    drawOutlinedRect(g, x - 25, y - 50, 50, 50)

    drawHookMarker(g, x, y)
  }

  drawEye(g, x, y, doBlink) {
    // save fill color so that we can paint a full eye
    const fillPre = g.fillStyle
    const strokePre = g.strokeStyle
    g.fillStyle = strokePre
    if (doBlink) {
      g.fillRect(x - 5, y - 3, 10, 2)
    }
    else {
      drawOval(g, x - 5, y - 10, 10, 10) // rim
      drawOval(g, x - 3, y - 8, 6, 6, true) // pupil
    }
    g.fillStyle = fillPre

    drawHookMarker(g, x, y)
  }
}
