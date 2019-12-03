import { DEFAULT_SKIN, DEFAULT_OUTLINE, DEFAULT_EGG_SKIN, DEFAULT_EGG_OUTLINE } from '../art/colors'
import { STATS } from '../constants'
import ELEMENTS from './elements'
import { drawHookMarker } from '../art/hook-marker'
import { drawDiglettHair, drawLusciousHairBack, drawLusciousHairFront, drawStevenHair } from '../art/props/hair'
import { drawOval, drawLine, drawOutlinedRect, drawOutlinedPolygon, drawSpeech } from '../art/art-util'
import * as Measurements from '../measurements'
import { oneLens, twoLens, threeLens } from '../art/props/glasses'
import { crack1, crack2, crack3 } from '../art/props/egg-cracks'
import birthdayHat from '../art/props/birthday-hat'
import birthdayText from '../art/props/birthday-banner'
import { DEFAULT_SPEECH_STYLE, SPEECH_SIZE } from '../art/art-config'

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
    this.handCoord = { x: 0, y: 0 }

    this.hairY = -50

    this.strokeStyle = DEFAULT_OUTLINE
    this.fillStyle = DEFAULT_SKIN
    this.eggStroke = DEFAULT_EGG_OUTLINE
    this.eggFill = DEFAULT_EGG_SKIN

    this.textStyle = DEFAULT_SPEECH_STYLE
    this.textSize = SPEECH_SIZE
  }

  toJSON() {
    return this.id
  }

  toString() {
    return this.id
  }

  setColors(g) {
    g.fillStyle = this.fillStyle
    g.strokeStyle = this.strokeStyle
    g.font = this.textStyle
  }

  setEggColors(g) {
    g.fillStyle = this.eggFill
    g.strokeStyle = this.eggStroke
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
    if (friendo.getStatStage(STATS.SIGHT) > 2) {
      // lvl 7 and up, 3 eyes
      // fire types are a special case
      this.drawEye(g, x, y - 8, doBlink, friendo.state.anim.isSmiling)
      this.drawEye(g, x - 8, y, doBlink, friendo.state.anim.isSmiling)
      this.drawEye(g, x + 8, y, doBlink, friendo.state.anim.isSmiling)

      // handle glasses
      // doesn't need glasses to see anymore after 9
      if (friendo.state.anim.glasses && friendo.getStatStage(STATS.SIGHT) < 4) threeLens(g, x, y)
    } else if (friendo.getStatStage(STATS.SIGHT) > 1) {
      // lvl 4 and up, 2 eyes
      // eyes must be moved down if a fire element
      this.drawEye(g, x - 8, y, doBlink, friendo.state.anim.isSmiling)
      this.drawEye(g, x + 8, y, doBlink, friendo.state.anim.isSmiling)

      // handle glasses
      if (friendo.state.anim.glasses) twoLens(g, x, y)
    } else {
      // default = 1 eye
      this.drawEye(g, x, y, doBlink, friendo.state.anim.isSmiling)

      // handle glasses
      if (friendo.state.anim.glasses) oneLens(g, x, y)
    }

    drawHookMarker(g, x, y)
  }

  // check whether it's the friendo's birthday and place hat if so
  drawBirthday(g, x, y, friendo) {
    if (friendo.zodiac.isBirthday()) {
      birthdayHat(g, x, y)
      birthdayText(g, x, y - 150)
    }
  }

  drawMouth(g, x, y, friendo) {
    const MOUTH_START = x - 5
    const MOUTH_LENGTH = 10
    const MOUTH_OPEN_HEIGHT = 3

    const tempFill = g.fillStyle
    g.fillStyle = g.strokeStyle

    if (friendo.state.anim.mouthIsOpen) {
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
    this.drawBackHair(g, x, y + this.hairY, friendo) // back hair on top of head core
    this.drawCoreSegment(g, x, y, friendo) // head core
    const mouthTethers = this.drawFace(g, x, y - 12, friendo, doBlink) // face relative to head core
    this.drawFrontHair(g, x, y + this.hairY, friendo) // front hair on top of head core

    this.drawBirthday(g, x, y + this.hairY, friendo)

    let speechX = 30
    // move speech more to right if hair too big
    if (friendo.getStat(STATS.HAIR) > 90) speechX += 14
    else if (friendo.getStat(STATS.HAIR) > 80) speechX += 10
    else if (friendo.getStat(STATS.HAIR) > 70) speechX += 6
    // this.speak(g, speechX, y - 36, friendo) // handle speech

    drawHookMarker(g, x, y)

    return Object.assign({}, {
      hairY: y + this.hairY,
      speech: { y: y - 36, x: speechX },
    }, mouthTethers)
  }

  drawLvl5Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y - 150, friendo, doBlink)

    // Only draw "shoulder pads" if the friendo HAS arms
    if (friendo.getStatStage(STATS.ARM) > 0) {
      this.drawCoreSegment(g, x - 50, y - 100, friendo)
      this.drawCoreSegment(g, x + 50, y - 100, friendo)
    }
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

  // Egg cracks are factored out so they can be overridden individually
  eggCrack1(g, x, y) {
    crack1(g, x - 10, y - 50)
  }
  eggCrack2(g, x, y) {
    crack2(g, x + 25, y - 28)
  }
  eggCrack3(g, x, y) {
    crack3(g, x - 25, y - 10)
  }
  eggHalo(g, x, y) {
    g.fillRect(x - 28, y - 53, 56, 56)
  }
  drawEggCracks(g, x, y, friendo) {
    if (friendo.getStatStage(STATS.EGG) > 1) {
      this.eggCrack1(g, x, y)
    }

    if (friendo.getStatStage(STATS.EGG) > 2) {
      this.eggCrack2(g, x, y)
      this.eggCrack3(g, x, y)
    }

    if (friendo.getStatStage(STATS.EGG) > 3) {
      g.save()
      g.globalCompositeOperation = 'destination-over'
      g.fillStyle = 'orchid'
      this.eggHalo(g, x, y)
      g.restore()
    }
  }

  drawEgg(g, x, y, friendo) {
    g.save()
    // This is incredibly hacky but use head segment to compute tethers since
    // head and egg are same size
    const tethers = this.drawHeadSegment(g, x, y, friendo, true)
    this.setEggColors(g)
    this.drawCoreSegment(g, x, y)
    this.drawEggCracks(g, x, y, friendo)
    g.restore()
    return tethers
  }

  // core drawing delegated to child elements
  drawCore(g, x, y, friendo, doBlink) {
    if (friendo.getStatStage(STATS.CORE) > 4) {
      // 5-6 segments
      return this.drawLvl5Core(g, x, y, friendo, doBlink)
    } else if (friendo.getStatStage(STATS.CORE) > 3) {
      // 4 segments
      return this.drawLvl4Core(g, x, y, friendo, doBlink)
    } else if (friendo.getStatStage(STATS.CORE) > 2) {
      // 3 segments
      return this.drawLvl3Core(g, x, y, friendo, doBlink)
    } else if (friendo.getStatStage(STATS.CORE) > 1) {
      // 2 segments
      return this.drawLvl2Core(g, x, y, friendo, doBlink)
      /* eslint-disable-next-line */
    } else if (friendo.getStatStage(STATS.CORE) > 0) {
      // 1 segment
      return this.drawLvl1Core(g, x, y, friendo, doBlink)
    }
    // egg default, even though it's also a state, for redundancy
    // it's kind of nightmarish but itll talk
    return this.drawEgg(g, x, y, friendo)
  }

  // default arm is left
  // accepts the friendo and returns a function that takes in the graphics
  // context and returns a function to draw the specific arm
  armBrush(friendo) {
    return (_g) => {
      if (friendo.getStatStage(STATS.ARM) > 0) {
        drawOutlinedRect(_g, 0, 0, this.armGirth, this.armLength)
      }
    }
  }

  // default leg is left
  // returns the function that properly draws the leg
  legBrush(friendo) {
    return (_g) => {
      if (friendo.getStatStage(STATS.LEG) > 0) {
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
    if (friendo.getStatStage(STATS.HAIR) === 3) {
      drawLusciousHairBack(g, x, y, friendo.getStat(STATS.HAIR))
    } else if (friendo.getStatStage(STATS.HAIR) === 2) {
      drawStevenHair(g, x, y, friendo.getStat(STATS.HAIR))
    }
    g.restore()
    drawHookMarker(g, x, y)
  }

  // hair that gets painted in front of the head segment
  drawFrontHair(g, x, y, friendo) {
    if (friendo.getStatStage(STATS.HAIR) === 3) {
      drawLusciousHairFront(g, x, y, friendo.getStat(STATS.HAIR))
    } else if (friendo.getStatStage(STATS.HAIR) === 1) {
      drawDiglettHair(g, x, y, friendo.getStat(STATS.HAIR))
    }

    drawHookMarker(g, x, y)
  }

  // positions speech and handles speaking when in a speaking state
  speak(g, x, y, words) {
    drawSpeech(g, x, y, words)
  }
}
