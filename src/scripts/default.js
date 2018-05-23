
import { STATS } from './friendo/constants'
import Element, { ELEMENTS } from './element/element'

/**
 * Specifies default values for new Friendos
 * */

export const DEFAULT_NAME = 'Friendtholemew'
export const DEFAULT_OWNER = 'Mrot'

export const DEFAULT_STATS = {
  [STATS.CORE]: 1,
  [STATS.LEG]: 0,
  [STATS.ARM]: 0,
  [STATS.SIGHT]: 1,
  [STATS.HAIR]: 0,
  [STATS.TASTE]: 1,
  [STATS.DOG]: 0,
  [STATS.MEME]: 1,
}

export const DEFAULT_ELEMENT = new Element(ELEMENTS.EARTH)

// default x/y at which a friendo is drawn
export const DEFAULT_HOOK = { x: 200, y: 350 }
