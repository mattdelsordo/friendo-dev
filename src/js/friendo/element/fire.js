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

  drawCoreSegment(g, x, y) {
    drawOutlinedPolygon(g, [x, x - 25, x + 25], [y - 43, y, y])

    drawHookMarker(g, x, y)
  }

  drawEyes(g, x, y, friendo) {
    if (friendo.stats[STATS.SIGHT] > 6) {
      // lvl 7 and up, 3 eyes
      // fire types are a special case
      this.drawEye(g, x, y - 6, friendo.state.blink)
      this.drawEye(g, x - 6, y + 4, friendo.state.blink)
      this.drawEye(g, x + 6, y + 4, friendo.state.blink)
    } else if (friendo.stats[STATS.SIGHT] > 3) {
      // lvl 4 and up, 2 eyes
      // eyes must be moved down if a fire element
      this.drawEye(g, x - 6, y + 4, friendo.state.blink)
      this.drawEye(g, x + 6, y + 4, friendo.state.blink)
    } else {
      // default = 1 eye
      this.drawEye(g, x, y, friendo.state.blink)
    }

    drawHookMarker(g, x, y)
  }

  drawFace(g, x, y, friendo) {
    // if the friendo is a fire element, the face needs to be drawn
    // farther down to fit in the core segment
    drawLine(g, x - 5, y + 6, x + 5, y + 6) // mouth
    drawLine(g, x - 1, y - 5, x - 1, y + 2) // vertical nose
    drawLine(g, x - 2, y + 2, x + 3, y + 2) // horizontal nose
    this.drawEyes(g, x, y - 8, friendo)

    drawHookMarker(g, x, y)
  }

  drawHeadSegment(g, x, y, friendo) {
    this.drawBackHair(g, x, y - 42, friendo) // back hair on top of head core
    this.drawCoreSegment(g, x, y, friendo) // head core
    this.drawFace(g, x, y - 12, friendo) // face relative to head core
    this.drawFrontHair(g, x, y - 42, friendo) // front hair on top of head core

    let speechX = x + 30
    // move speech more to right if hair too big
    if (friendo.stats[STATS.HAIR] == 10) speechX += 14
    else if (friendo.stats[STATS.HAIR] == 9) speechX += 10
    else if (friendo.stats[STATS.HAIR] == 8) speechX += 6
    this.speak(g, speechX, y - 36, friendo) // handle speech

    drawHookMarker(g, x, y)
  }

  drawLvl5Core(g, x, y, friendo) {
    this.drawHeadSegment(g, x, y - 86, friendo)

    g.save()
    g.translate(x, y - 86)
    g.rotate(Math.PI)
    this.drawCoreSegment(g, 25, 0, friendo)
    this.drawCoreSegment(g, -24, 0, friendo)
    g.restore()

    this.drawCoreSegment(g, x - 25, y, friendo)
    this.drawCoreSegment(g, x + 25, y, friendo)
  }

  drawLvl4Core(g, x, y, friendo) {
    this.drawHeadSegment(g, x, y - 66, friendo)

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

  drawLvl3Core(g, x, y, friendo) {
    this.drawHeadSegment(g, x, y - 43, friendo)
    this.drawCoreSegment(g, x - 25, y)
    this.drawCoreSegment(g, x + 25, y)
  }

  drawLvl2Core(g, x, y, friendo) {
    this.drawHeadSegment(g, x, y - 23, friendo)

    g.save()
    g.translate(x, y - 23)
    g.rotate(Math.PI)
    this.drawCoreSegment(g, 0, 0, friendo)
    g.restore()
  }

  drawLvl1Core(g, x, y, friendo) {
    this.drawHeadSegment(g, x, y, friendo)
  }

  armBrush(friendo) {
    return (_g) => {
      if (friendo.stats[STATS.ARM] > 0) {
        drawOutlinedPolygon(_g,
          [0, -(this.armGirth / 2), 0],
          [0, (this.armLength / 2), this.armLength],
          true,
        )
      }
    }
  }

  legBrush(friendo) {
    return (_g) => {
      if (friendo.stats[STATS.LEG] > 0) {
        drawOutlinedPolygon(_g,
          [0, 0, 0 - this.legGirth, 0, -(this.footLength / 2), -this.footLength],
          [0, 0 - this.legHeight, -(this.legHeight / 2), 0, -this.footHeight, 0],
          true,
        )
      }
    }
  }
}
