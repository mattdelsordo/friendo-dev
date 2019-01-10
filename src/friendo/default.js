import { STATS } from './constants'
import ELEMENTS from './element/elements'
import selectElement from './element/select-element'
import Egg from './state/egg'

/**
 * Specifies default values for new Friendos
 * */

export const DEFAULT_NAME = 'Friendtholemew'
export const DEFAULT_OWNER = 'Mrot'

export const DEFAULT_LEVEL = 0

export const DEFAULT_STATS = {
  [STATS.CORE]: 0,
  [STATS.LEG]: 0,
  [STATS.ARM]: 0,
  [STATS.SIGHT]: 0,
  [STATS.HAIR]: 0,
  [STATS.TASTE]: 0,
  [STATS.DOG]: 0,
  [STATS.MEME]: 0,
}

export const DEFAULT_STAT_STAGES = {
  [STATS.CORE]: 0,
  [STATS.LEG]: 0,
  [STATS.ARM]: 0,
  [STATS.SIGHT]: 0,
  [STATS.HAIR]: 0,
  [STATS.TASTE]: 0,
  [STATS.DOG]: 0,
  [STATS.MEME]: 0,
}

export const DEFAULT_HIDDEN_STATS = {
  [STATS.EGG]: 1,
}

export const DEFAULT_HIDDEN_STAT_STAGES = {
  [STATS.EGG]: 1,
}

export const DEFAULT_ELEMENT = selectElement(ELEMENTS.EARTH)
export const DEFAULT_STATE = new Egg()

// default x/y at which a friendo is drawn
export const DEFAULT_HOOK = { x: 200, y: 350 }
