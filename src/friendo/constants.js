// characters for stat stage display
export const EMPTY_STAR = '\u2606'
export const FULL_STAR = '\u2605'

// maximum level in a given element
export const STAT_MAX = 100
// egg stat has different max
export const MAX_EGG_LEVEL = 4

// cumulative levels at which you unlock certain stats
export const LEG_UNLOCK_LEVEL = 2
export const ARM_UNLOCK_LEVEL = 3
export const HAIR_UNLOCK_LEVEL = 5
export const DOG_UNLOCK_LEVEL = 10

// maximum amount of dogs on the screen
export const MAX_DOGS = 5
export const LICK_CHANCE = 0.5

// time spent doing actions, in cycles of the game
// (currently 4/sec)
export const BLINK_TIME = 1
export const SPEAK_TIME = 20

// chance to blink or speak
export const TOTAL_EVENT_CHANCE = 100
export const BLINK_CHANCE = 5
export const SPEAK_CHANCE = 5

// default rep length in MS - related to value in UI
export const REP_LENGTH = 5000 // 5 seconds
export const FEED_REP_LENGTH = 2750
export const PET_REP_LENGTH = 2000

// energy costs
export const EXERCISE_COST = -10
export const FOOD_COST = 4
export const PET_COST = 2
export const SLEEP_COST = 1
export const EGG_COST = 0

// amount of energy a friendo gains per level
export const ENERGY_PER_LEVEL = 10

// bonuses associated with meme/taste level
export const MEME_EXP_MODIFIER = 0.03
export const TASTE_ENERGY_MODIFIER = 0.24

// 'enum' of stat indices
export const STATS = Object.freeze({
  CORE: 'core',
  LEG: 'leg',
  ARM: 'arm',
  SIGHT: 'sight',
  HAIR: 'hair',
  TASTE: 'taste',
  DOG: 'dog',
  MEME: 'meme',
  EGG: 'egg',
})

// thresholds at which stat appearance changes
export const STAT_STAGES = {
  [STATS.CORE]: [1, 14, 32, 55, 83],
  [STATS.LEG]: [1],
  [STATS.ARM]: [1],
  [STATS.SIGHT]: [1, 6, 48, 90],
  [STATS.HAIR]: [1, 20, 64],
  [STATS.TASTE]: [1],
  [STATS.DOG]: [1, 20, 40, 65, 90],
  [STATS.MEME]: [1],
  [STATS.EGG]: [1, 10, 20, 30],
}

// array of stats to actually include in level calculations
export const LVL_CALC_WHITELIST = [
  STATS.CORE,
  STATS.LEG,
  STATS.ARM,
  STATS.SIGHT,
  STATS.HAIR,
  STATS.TASTE,
  STATS.DOG,
  STATS.MEME,
]

// 'enum' of potential actions
export const ACTIONS = Object.freeze({
  CORE: `state_${STATS.CORE}`,
  LEG: `state_${STATS.LEG}`,
  ARM: `state_${STATS.ARM}`,
  SIGHT: `state_${STATS.SIGHT}`,
  HAIR: `state_${STATS.HAIR}`,
  TASTE: `state_${STATS.TASTE}`,
  DOG: `state_${STATS.DOG}`,
  MEME: `state_${STATS.MEME}`,
  EGG: `state_${STATS.EGG}`,
  SLEEP: 'state_sleep',
  PET: 'state_pet',
  FEED: 'state_feed',
})

// maximum total level
export const LEVEL_MAX = (LVL_CALC_WHITELIST.length * 99) + 1

/**
 * Defines the amount of exp needed to level up a given stat
 * This probably needs fiddled with
 */
/* eslint-disable */
export const EXP_CURVE = Array.from(Array(101), (_, i) => Math.ceil(Math.pow(i, 1.1) + 3))
export const STEEP_EXP_CURVE = Array.from(Array(101), (_, i) => Math.ceil(Math.pow(i, 1.2) + 3))
export const EGG_EXP = Array.from(Array(5), (_, i) => i + 4)

// returns the exp curve for a given stat
export const getExpCurve = (stat) => {
  switch (stat) {
    case STATS.EGG:
      return EGG_EXP
    case STATS.MEME:
    case STATS.TASTE:
      return STEEP_EXP_CURVE
    default:
      return EXP_CURVE
  }
}
