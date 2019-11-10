import { STATS, FOODS, FLAG_NEW_FOOD_ALERT } from './constants'
import ELEMENTS from './element/elements'
import selectElement from './element/select-element'
import Egg from './state/idle/egg'
import { Egg as Zodiac } from './horoscope/zodiac'

/**
 * Specifies default values for new Friendos
 * */

export const DEFAULT_NAME = 'Friendtholemew'
export const DEFAULT_OWNER = 'Mrot'

export const DEFAULT_STATS = {
  [STATS.CORE]: 0,
  [STATS.LEG]: 0,
  [STATS.ARM]: 0,
  [STATS.SIGHT]: 0,
  [STATS.HAIR]: 0,
  [STATS.TASTE]: 0,
  [STATS.DOG]: 0,
  [STATS.MEME]: 0,
  [STATS.EGG]: 1,
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
  [STATS.EGG]: 1,
}

export const DEFAULT_EXP = {
  [STATS.CORE]: 0,
  [STATS.LEG]: 0,
  [STATS.ARM]: 0,
  [STATS.SIGHT]: 0,
  [STATS.HAIR]: 0,
  [STATS.TASTE]: 0,
  [STATS.DOG]: 0,
  [STATS.MEME]: 0,
  [STATS.EGG]: 0,
}

export const DEFAULT_ELEMENT = selectElement(ELEMENTS.EARTH)
export const DEFAULT_STATE = new Egg()
export const DEFAULT_ZODIAC = new Zodiac()

export const DEFAULT_FOOD_PREF = 0
export const DEFAULT_FOOD_EMOJI = '1f35e'
export const DEFAULT_FOOD = FOODS[0]

// default x/y at which a friendo is drawn
export const DEFAULT_HOOK = { x: 200, y: 350 }

export const DEFAULT_GAME_FLAGS = {
  [FLAG_NEW_FOOD_ALERT]: false,
}
