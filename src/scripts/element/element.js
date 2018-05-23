import Fire from './fire'
import Water from './water'
import Air from './air'
import Earth from './earth'
import { DEFAULT_SKIN, DEFAULT_OUTLINE } from '../colors'

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

  // factory method to return a new element of a specified type
  static new(type) {
    switch (type) {
      case ELEMENTS.EARTH:
        return new Earth()
      case ELEMENTS.WATER:
        return new Water()
      case ELEMENTS.AIR:
        return new Air()
      case ELEMENTS.FIRE:
        return new Fire()
      default:
        return new Element()
    }
  }
}
