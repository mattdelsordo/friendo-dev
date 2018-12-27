import { STATS } from '../constants'
import { FIRE_SKIN, FIRE_OUTLINE, FIRE_EGG_OUTLINE, FIRE_EGG_SKIN } from '../../art/colors'
import Element from './element'
import ELEMENTS from './elements'
import { drawHookMarker } from '../../art/hook-marker'
import { drawLine, drawOutlinedPolygon } from '../../art/art-util'
import { oneLens, threeLens, twoLens } from '../../art/props/glasses'

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

  setEggColors(g) {
    g.fillStyle = FIRE_EGG_SKIN
    g.strokeStyle = FIRE_EGG_OUTLINE
  }

  computeArmTethers(friendo) {
    if (friendo.getStatStage(STATS.CORE) > 8) {
      return {
        xOffset: 42,
        yOffset: -70,
      }
    } else if (friendo.getStatStage(STATS.CORE) > 6) {
      return {
        xOffset: 42,
        yOffset: -50,
      }
    } else if (friendo.getStatStage(STATS.CORE) > 4) {
      return {
        xOffset: 22,
        yOffset: -50,
      }
    } else if (friendo.getStatStage(STATS.CORE) > 2) {
      return {
        xOffset: 22,
        yOffset: -20,
      }
    }

    return {
      xOffset: 14,
      yOffset: -20,
    }
  }

  computeHandCoord() {
    return {
      x: 0,
      y: this.armLength,
    }
  }

  drawCoreSegment(g, x, y) {
    drawOutlinedPolygon(g, [x, x - 25, x + 25], [y - 43, y, y])

    drawHookMarker(g, x, y)
  }

  drawEyes(g, x, y, friendo, doBlink) {
    if (friendo.getStatStage(STATS.SIGHT) > 6) {
      // lvl 7 and up, 3 eyes
      // fire types are a special case
      this.drawEye(g, x, y - 6, doBlink, friendo.state.isSmiling)
      this.drawEye(g, x - 6, y + 4, doBlink, friendo.state.isSmiling)
      this.drawEye(g, x + 6, y + 4, doBlink, friendo.state.isSmiling)

      // handle glasses
      // doesn't need glasses to see anymore after 9
      if (friendo.state.glasses && friendo.getStatStage(STATS.SIGHT) < 10) threeLens(g, x, y + 3)
    } else if (friendo.getStatStage(STATS.SIGHT) > 3) {
      // lvl 4 and up, 2 eyes
      // eyes must be moved down if a fire element
      this.drawEye(g, x - 6, y + 4, doBlink, friendo.state.isSmiling)
      this.drawEye(g, x + 6, y + 4, doBlink, friendo.state.isSmiling)

      // handle glasses
      if (friendo.state.glasses) twoLens(g, x, y + 3)
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
    const mouthTether = this.drawMouth(g, x, y + 6, friendo)// mouth
    drawLine(g, x - 5, y + 6, x + 5, y + 6) // mouth
    drawLine(g, x - 1, y - 5, x - 1, y + 2) // vertical nose
    drawLine(g, x - 2, y + 2, x + 3, y + 2) // horizontal nose
    this.drawEyes(g, x, y - 8, friendo, doBlink)

    drawHookMarker(g, x, y)
    return mouthTether
  }

  drawHeadSegment(g, x, y, friendo, doBlink) {
    const hairY = -42
    this.drawBackHair(g, x, y + hairY, friendo) // back hair on top of head core
    this.drawCoreSegment(g, x, y, friendo) // head core
    const mouthTethers = this.drawFace(g, x, y - 12, friendo, doBlink) // face relative to head core
    this.drawFrontHair(g, x, y + hairY, friendo) // front hair on top of head core

    let speechX = 30
    // move speech more to right if hair too big
    if (friendo.getStatStage(STATS.HAIR) === 10) speechX += 14
    else if (friendo.getStatStage(STATS.HAIR) === 9) speechX += 10
    else if (friendo.getStatStage(STATS.HAIR) === 8) speechX += 6
    // this.speak(g, speechX, y - 36, friendo) // handle speech

    drawHookMarker(g, x, y)

    return Object.assign({}, {
      hairY: y + hairY,
      speech: { y: y - 36, x: speechX },
    }, mouthTethers)
  }

  drawLvl5Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y - 86, friendo, doBlink)

    g.save()
    g.translate(x, y - 86)
    g.rotate(Math.PI)
    this.drawCoreSegment(g, 25, 0, friendo)
    this.drawCoreSegment(g, -24, 0, friendo)
    g.restore()

    this.drawCoreSegment(g, x - 25, y, friendo)
    this.drawCoreSegment(g, x + 25, y, friendo)

    return computedTethers
  }

  drawLvl4Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y - 66, friendo, doBlink)

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

    return computedTethers
  }

  drawLvl3Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y - 43, friendo, doBlink)
    this.drawCoreSegment(g, x - 25, y)
    this.drawCoreSegment(g, x + 25, y)
    return computedTethers
  }

  drawLvl2Core(g, x, y, friendo, doBlink) {
    const computedTethers = this.drawHeadSegment(g, x, y - 23, friendo, doBlink)

    g.save()
    g.translate(x, y - 23)
    g.rotate(Math.PI)
    this.drawCoreSegment(g, 0, 0, friendo)
    g.restore()

    return computedTethers
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
          [0, -(this.armGirth / 2), 0],
          [0, (this.armLength / 2), this.armLength],
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
          [0, 0, 0 - this.legGirth, 0, -(this.footLength / 2), -this.footLength],
          [0, 0 - this.legHeight, -(this.legHeight / 2), 0, -this.footHeight, 0],
          true,
        )
      }
    }
  }
}
