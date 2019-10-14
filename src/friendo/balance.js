// utilities used to balance the game

import { LVL_CALC_WHITELIST, STATS } from './constants'

export const DEFAULT_LEVEL = 0
export const DEFAULT_MAX_ENERGY = 100
export const DEFAULT_FATIGUE = 0
export const DEFAULT_MAX_BELLY = 10
export const DEFAULT_HUNGER = 0

// energy costs
export const ENERGY_COST_EXERT = -10
export const ENERGY_COST_FOOD = 0
export const ENERGY_COST_PET = 0.5
export const ENERGY_COST_SLEEP = 20
export const ENERGY_COST_EGG = 0
export const ENERGY_COST_IDLE = 0

// belly costs
export const BELLY_COST_EXERT = -1
export const BELLY_COST_SLEEP = 1
export const BELLY_COST_EGG = 0
export const BELLY_COST_IDLE = -0.25

// exp reward
export const BASE_EXP_REWARD = 1

// amount of energy a friendo gains per level
export const ENERGY_PER_LEVEL = 10

// bonuses associated with meme/taste level
export const MEME_EXP_MODIFIER = 0.03
export const TASTE_ENERGY_MODIFIER = 0.24

// maximum level in a given element
export const STAT_MAX = 100
// egg stat has different max
export const MAX_EGG_LEVEL = 4

// cumulative levels at which you unlock certain stats
export const LEG_UNLOCK_LEVEL = 2
export const ARM_UNLOCK_LEVEL = 3
export const HAIR_UNLOCK_LEVEL = 5
export const DOG_UNLOCK_LEVEL = 10

// for hunger% >= the threshold, modify hunger by the value
export const HUNGER_MODIFIERS = [
  {
    threshold: 0.5,
    value: -2,
  },
  {
    threshold: 0.2,
    value: 0,
  },
  {
    threshold: 0.01,
    value: 2,
  },
]
// hunger modifier for if no threshold is greater than the value
export const BASE_HUNGER_MODIFIER = 5

/**
 * Defines the amount of exp needed to level up a given stat
 * This probably needs fiddled with
 */
// maximum total level
export const LEVEL_MAX = (LVL_CALC_WHITELIST.length * 99) + 1

const EXP_CURVE = Array.from(Array(101), (_, i) => Math.ceil((i ** 1.1) + 3))
const STEEP_EXP_CURVE = Array.from(Array(101), (_, i) => Math.ceil((i ** 1.2) + 3))
const EGG_EXP = Array.from(Array(5), (_, i) => i + 4)

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

/**
 * Utilities managing energy balance
 */
// effectively give +1 potential exercise per level
export const calcMaxEnergy = level =>
  (DEFAULT_MAX_ENERGY + (level > 1 ? ((level * ENERGY_PER_LEVEL) - ENERGY_PER_LEVEL) : 0))

/**
 * Utilities managing hunger balance
 */
export const FOOD_VALUES = [0, 4, 7, 12, 23, 46, 107, 283, 838, 2749, 9897, 39588]
const BELLY_CAP_TARGETS = [10, 16, 28, 48, 92, 184, 428, 1132, 3352, 10996, 39588]
export const calcBellyCap = (bellyFactor) => {
  const factorIndex = Math.floor(bellyFactor / 10)
  const offFromIndex = bellyFactor % 10
  const lowerBound = BELLY_CAP_TARGETS[factorIndex]
  const upperBound = BELLY_CAP_TARGETS[factorIndex + 1]

  // cut out the middleman if input is multiple of 10
  if (offFromIndex === 0) return lowerBound

  // otherwise, compute a value between the two surrounding targets
  const increment = Math.floor((upperBound - lowerBound) / 10)
  return lowerBound + (increment * offFromIndex)
}
