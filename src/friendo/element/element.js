import { DEFAULT_SKIN, DEFAULT_OUTLINE } from '../../art/colors'
import { STATS } from '../constants'
import ELEMENTS from './elements'
import { drawHookMarker } from '../../art/hook-marker'
import { drawDiglettHair, drawLusciousHairBack, drawLusciousHairFront, drawStevenHair } from '../../art/props/hair'
import { drawOval, drawLine, drawOutlinedRect, drawOutlinedPolygon, drawSpeech } from '../../art/art-util'
import * as Measurements from '../measurements'
import { oneLens, twoLens, threeLens } from '../../art/props/glasses'

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

  // compute where arms should be tethered
  // delegated to child classes
  computeArmTethers() {
    return {
      xOffset: 0,
      yOffset: 0,
    }
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
    this.handCoord = this.computeHandCoord()
  }

  computeHandCoord() {
    return {
      x: this.armGirth / 2,
      y: this.armLength,
    }
  }

  drawCoreSegment(g, x, y) {
    drawOutlinedRect(g, x - 25, y - 50, 50, 50)

    drawHookMarker(g, x, y)
  }


  drawEye(g, x, y, doBlink, smile) {
    // save fill color so that we can paint a full eye
    const fillPre = g.fillStyle
    const strokePre = g.strokeStyle
    g.fillStyle = strokePre
    if (smile) {
      const left = { x: -5, y: 0 }
      const mid = { x: 0, y: -6 }
      const right = { x: 5, y: 0 }
      drawLine(g, x + left.x, y + left.y, x + mid.x, y + mid.y)
      drawLine(g, x + mid.x, y + mid.y, x + right.x, y + right.y)
    } else if (doBlink) {
      drawLine(g, x - 5, y - 4, x + 5, y - 4)
    } else {
      drawOval(g, x - 5, y - 10, 10, 10) // rim
      drawOval(g, x - 3, y - 8, 6, 6, true) // pupil
    }
    g.fillStyle = fillPre

    drawHookMarker(g, x, y)
  }

  drawEyes(g, x, y, friendo, doBlink) {
    if (friendo.stats[STATS.SIGHT] > 6) {
      // lvl 7 and up, 3 eyes
      // fire types are a special case
      this.drawEye(g, x, y - 8, doBlink, friendo.state.isSmiling)
      this.drawEye(g, x - 8, y, doBlink, friendo.state.isSmiling)
      this.drawEye(g, x + 8, y, doBlink, friendo.state.isSmiling)

      // handle glasses
      // doesn't need glasses to see anymore after 9
      if (friendo.state.glasses && friendo.stats[STATS.SIGHT] < 10) threeLens(g, x, y)
    } else if (friendo.stats[STATS.SIGHT] > 3) {
      // lvl 4 and up, 2 eyes
      // eyes must be moved down if a fire element
      this.drawEye(g, x - 8, y, doBlink, friendo.state.isSmiling)
      this.drawEye(g, x + 8, y, doBlink, friendo.state.isSmiling)

      // handle glasses
      if (friendo.state.glasses) twoLens(g, x, y)
    } else {
      // default = 1 eye
      this.drawEye(g, x, y, doBlink, friendo.state.isSmiling)

      // handle glasses
      if (friendo.state.glasses) oneLens(g, x, y)
    }

    drawHookMarker(g, x, y)
  }

  drawMouth(g, x, y, friendo) {
    const MOUTH_START = x - 5
    const MOUTH_LENGTH = 10
    const MOUTH_OPEN_HEIGHT = 3

    const tempFill = g.fillStyle
    g.fillStyle = g.strokeStyle

    if (friendo.state.mouthIsOpen) {
      g.fillRect(MOUTH_START, y, MOUTH_LENGTH, MOUTH_OPEN_HEIGHT)
    } else {
      drawLine(g, MOUTH_START, y, MOUTH_START + MOUTH_LENGTH, y)
    }

    g.fillStyle = tempFill

    return { mouth: { x: MOUTH_START + (MOUTH_LENGTH / 2), y } }
  }

  drawFace(g, x, y, friendo, doBlink) {
    // if the friendo is a fire element, the face needs to be drawn
    // farther down to fit in the core segment

    const mouthTether = this.drawMouth(g, x, y, friendo)// mouth
    drawLine(g, x - 1, y - 11, x - 1, y - 4) // vertical nose
    drawLine(g, x - 2, y - 4, x + 3, y - 4) // horizontal nose
    this.drawEyes(g, x, y - 14, friendo, doBlink)

    drawHookMarker(g, x, y)
    return mouthTether
  }

  drawHeadSegment(g, x, y, friendo, doBlink) {
    const hairY = -50

    this.drawBackHair(g, x, y + hairY, friendo) // back hair on top of head core
    this.drawCoreSegment(g, x, y, friendo) // head core
    const mouthTethers = this.drawFace(g, x, y - 12, friendo, doBlink) // face relative to head core
    this.drawFrontHair(g, x, y + hairY, friendo) // front hair on top of head core

    let speechX = 30
    // move speech more to right if hair too big
    if (friendo.stats[STATS.HAIR] === 10) speechX += 14
    else if (friendo.stats[STATS.HAIR] === 9) speechX += 10
    else if (friendo.stats[STATS.HAIR] === 8) speechX += 6
    // this.speak(g, speechX, y - 36, friendo) // handle speech

    drawHookMarker(g, x, y)

    return Object.assign({}, {
      hairY: y + hairY,
      speech: { y: y - 36, x: speechX },
    }, mouthTethers)
  }

  drawLvl5Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y - 150, friendo, doBlink)

    this.drawCoreSegment(g, x - 50, y - 100, friendo)
    this.drawCoreSegment(g, x + 50, y - 100, friendo)
    this.drawCoreSegment(g, x, y - 100, friendo)
    this.drawCoreSegment(g, x, y - 50, friendo)
    this.drawCoreSegment(g, x, y, friendo)

    return computedTethers
  }

  drawLvl4Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y - 100, friendo, doBlink)
    this.drawCoreSegment(g, x - 25, y - 50)
    this.drawCoreSegment(g, x + 25, y - 50)
    this.drawCoreSegment(g, x, y)
    return computedTethers
  }

  drawLvl3Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y - 100, friendo, doBlink)
    this.drawCoreSegment(g, x, y - 50, friendo)
    this.drawCoreSegment(g, x, y, friendo)
    return computedTethers
  }

  drawLvl2Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y - 50, friendo, doBlink)
    this.drawCoreSegment(g, x, y, friendo)
    return computedTethers
  }

  drawLvl1Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y, friendo, doBlink)
    return computedTethers
  }

  // core drawing delegated to child elements
  drawCore(g, x, y, friendo, doBlink) {
    if (friendo.stats[STATS.CORE] > 8) {
      // 5-6 segments
      return this.drawLvl5Core(g, x, y, friendo, doBlink)
    } else if (friendo.stats[STATS.CORE] > 6) {
      // 4 segments
      return this.drawLvl4Core(g, x, y, friendo, doBlink)
    } else if (friendo.stats[STATS.CORE] > 4) {
      // 3 segments
      return this.drawLvl3Core(g, x, y, friendo, doBlink)
    } else if (friendo.stats[STATS.CORE] > 2) {
      // 2 segments
      return this.drawLvl2Core(g, x, y, friendo, doBlink)
      /* eslint-disable-next-line */
    } else {
      // 1 segment
      return this.drawLvl1Core(g, x, y, friendo, doBlink)
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
          [
            (this.legGirth / 2),
            (this.legGirth / 2),
            -(this.legGirth / 2),
            -(this.legGirth / 2),
            -this.footLength,
            -this.footLength],
          [
            0,
            -this.legHeight,
            -this.legHeight,
            -this.footHeight,
            -this.footHeight,
            0,
          ],
          true,
        )
      }
    }
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
    else if (friendo.stats[STATS.HAIR] > 0 && friendo.stats[STATS.HAIR] < 4) {
      drawDiglettHair(g, x, y, friendo.stats[STATS.HAIR])
    }

    drawHookMarker(g, x, y)
  }

  // positions speech and handles speaking when in a speaking state
  speak(g, x, y, friendo) {
    if (friendo.state.speak) {
      drawSpeech(g, x, y, friendo.state.words)
    }
  }
}
