import Fire from './fire'
import Water from './water'
import Air from './air'
import Earth from './earth'
import { DEFAULT_SKIN, DEFAULT_OUTLINE } from '../../art/colors'
import { STATS } from '../constants'

/**
 * Specifies graphical representation and drawing style of a Friendo
 */

// 'enum' of element indices
export const ELEMENTS = Object.freeze({
  NULL: '???',
  EARTH: 'earth',
  WATER: 'water',
  AIR: 'air',
  FIRE: 'fire',
})

export default class Element {
  constructor(g) {
    this.id = ELEMENTS.NULL
    this.setColors(g)
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

  // factory method to return a new element of a specified type
  static new(type, g) {
    switch (type) {
      case ELEMENTS.EARTH:
        return new Earth(g)
      case ELEMENTS.WATER:
        return new Water(g)
      case ELEMENTS.AIR:
        return new Air(g)
      case ELEMENTS.FIRE:
        return new Fire(g)
      default:
        return new Element(g)
    }
  }

  drawEyes(g, x, y, friendo, doBlink) {
    if (friendo.stats[STATS.SIGHT] > 6) {
      // lvl 7 and up, 3 eyes
      // fire types are a special case
      drawEye(g, x, y - 8, doBlink)
      drawEye(g, x - 8, y, doBlink)
      drawEye(g, x + 8, y, doBlink)
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

    drawLine(g, x - 5, y, x + 5, y) // mouth
    drawLine(g, x - 1, y - 11, x - 1, y - 4) // vertical nose
    drawLine(g, x - 2, y - 4, x + 3, y - 4) // horizontal nose
    drawEyes(g, x, y - 14, doBlink)

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
  drawLvl5Core(){}
  drawLvl4Core(){}
  drawLvl3Core(){}
  drawLvl2Core(){}
  drawLvl1Core(){}

  drawHeadSegment(g, x, y, friendo, doBlink) {
    drawBackHair(g, x, y - 50) // back hair on top of head core
    drawCoreSegment(g, x, y) // head core
    this.drawFace(g, x, y - 12, doBlink) // face relative to head core
    drawFrontHair(g, x, y - 50) // front hair on top of head core

    drawHookMarker(g, x, y)
  }

  // TODO: split this code into the element classes instead of the switch
  drawLegs(g, x, y, friendo) {
    if (friendo.stats[STATS.LEG] > 0) {
      /**
       * Parameters for drawing the legs
       * These values are complete nonsense I just fiddled till it looked like it scaled good
       */
      const legGirth = friendo.stats[STATS.LEG] * 2 // thiccness of leg
      const legHeight = ((friendo.stats[STATS.LEG] - 1) * 6) + 10 // length of leg
      const footLength = Math.floor(legGirth * 1.3) + 3
      const footHeight = legHeight / 4

      // gap between legs
      const thighGap = 13

      // draw element of leg based on element of friendo
      // return the height at which to draw the body
      switch (friendo.element.toString()) {
        case ELEMENTS.EARTH:
          drawEarthLeftLeg(g, x - thighGap, y, legGirth, legHeight, footLength, footHeight)
          drawEarthRightLeg(g, x + thighGap - 1, y, legGirth, legHeight, footLength, footHeight)
          return legHeight
        case ELEMENTS.WATER:
          drawWaterLeftLeg(g, x - thighGap, y, legGirth, legHeight, footLength, footHeight)
          drawWaterRightLeg(g, x + thighGap - 1, y, legGirth, legHeight, footLength, footHeight)
          return legHeight-8
        case ELEMENTS.AIR:
          drawAirLeftLeg(g, x - thighGap, y, legGirth, legHeight, footLength, footHeight)
          drawAirRightLeg(g, x + thighGap - 1, y, legGirth, legHeight, footLength, footHeight)
          return legHeight
        case ELEMENTS.FIRE:
          drawFireLeftLeg(g, x - thighGap, y, legGirth, legHeight, footLength, footHeight)
          drawFireRightLeg(g, x + thighGap - 1, y, legGirth, legHeight, footLength, footHeight)
          return legHeight
        default:
          return 0
      }

      drawHookMarker(g, x, y)

      // return leg height to calculate core height
      return legHeight
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
    else if (friendo.statsl[STATS.HAIR]  > 3) drawStevenHair(g, x, y, friendo.stats[STATS.HAIR])
    g.restore()
    drawHookMarker(g, x, y)
  }

  // hair that gets painted in front of the head segment
  drawFrontHair(g, x, y, friendo) {
    if (friendo.stats[STATS.HAIR] > 7) drawLusciousHairFront(g, x, y, friendo.stats[STATS.HAIR])
    else if (friendo.stats[STATS.HAIR] > 0 && friendo.stats[STATS.HAIR]  < 4) drawDiglettHair(g, x, y, friendo.stats[STATS.HAIR])

    drawHookMarker(g, x, y)
  }

  drawFrontHair(g, x, y, friendo) {
    if (friendo.stats[STATS.HAIR] > 7) drawLusciousHairFront(g, x, y, friendo.stats[STATS.HAIR])
    else if (friendo.stats[STATS.HAIR] > 0 && friendo.stats[STATS.HAIR]  < 4) drawDiglettHair(g, x, y, friendo.stats[STATS.HAIR])

    drawHookMarker(g, x, y)
  }

  // compute where arms should be tethered
  // delegated to child classes
  computeArmTethers() {}

  drawArm(g, x, y, friendo){}
}
