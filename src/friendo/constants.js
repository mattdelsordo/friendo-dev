// maximum level in a given element
export const STAT_MAX = 100
// egg stat has different max
export const MAX_EGG_LEVEL = 30

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
export const REP_LENGTH = 12000 // 12 seconds/.2 minutes
export const FEED_REP_LENGTH = 2750
export const PET_REP_LENGTH = 2000

// amount of experience a friendo gains per level
export const EXP_PER_LEVEL = 5

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
  [STATS.CORE]: [1, 6, 14, 36, 55],
  [STATS.LEG]: [1],
  [STATS.ARM]: [1],
  [STATS.SIGHT]: [1, 12, 72, 90],
  [STATS.HAIR]: [1, 20, 64],
  [STATS.TASTE]: [1],
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
export const EXP_CURVE = [0,8,11,15,21,29,40,56,78,109,152,212,296,414,579,810,1134,1587,2221,3109,4352,6092,8528,11939,16714,23399,32758,45861,64205,89887,125841,176177,246647,345305,483426,676796,947514,1326519,1857126,2599976,3639966,5095952,7134332,9988064,13983289,19576604,27407245,38370143,53718200,75205480,105287672,147402740,206363836,288909370,404473118,566262365,792767311,1109874235,1553823929,2175353500,3045494900,4263692859,5969170002,8356838002,11699573202,16379402482,22931163474,32103628863,44945080408,62923112571,88092357599,123329300638,172661020893,241725429250,338415600950,473781841330,663294577862,928612409006,1300057372608,1820080321651,2548112450311,3567357430435,4994300402609,6992020563652,9788828789112,13704360304756,19186104426658,26860546197321,37604764676249,52646670546748,73705338765447,103187474271625,144462463980275,202247449572385,283146429401339,396405001161874,554967001626623,776953802277272,1087735323188180,1522829452463452,2131961233448832]

export const EGG_EXP = Array.from(Array(31), n => 2)

// returns the exp curve for a given stat
export const getExpCurve = (stat) => {
  switch (stat) {
    case STATS.EGG:
      return EGG_EXP
    default:
      return EXP_CURVE
  }
}
