/**
 * Factory to create the various element types
 */

// factory for element types
import ELEMENTS from './elements'
import Earth from './earth'
import Water from './water'
import Air from './air'
import Fire from './fire'

export default (type) => {
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
      throw new Error(`Attempted to load invalid element "${type}"`)
  }
}
