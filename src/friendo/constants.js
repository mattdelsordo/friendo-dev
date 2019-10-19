// characters for stat stage display
export const EMPTY_STAR = '\u2606'
export const FULL_STAR = '\u2605'

// maximum amount of dogs on the screen
export const MAX_DOGS = 5
export const LICK_CHANCE = 0.5

// time spent doing actions, in cycles of the game
// (currently 4/sec)
export const BLINK_TIME = 1
export const SPEAK_TIME = 20
export const HATCH_DUR = 20

// chance to blink or speak
export const TOTAL_EVENT_CHANCE = 100
export const BLINK_CHANCE = 5
export const SPEAK_CHANCE = 5

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
  [STATS.TASTE]: [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  [STATS.DOG]: [1, 20, 40, 65, 90],
  [STATS.MEME]: [1],
  [STATS.EGG]: [1, 2, 3, 4],
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
export const STATES = Object.freeze({
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
  IDLE: 'state_idle',
  BABY: 'state_baby',
  HATCH: 'state_hatch',
})

