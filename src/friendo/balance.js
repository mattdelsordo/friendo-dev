// utilities used to balance the game

import { HATCH_DUR, LVL_CALC_WHITELIST, STATS } from './constants'

// energy costs
export const EXERCISE_COST = -60
export const ENERGY_COST_PET = EXERCISE_COST / -10
export const ENERGY_COST_SLEEP = EXERCISE_COST / -4 // should be positive
export const ENERGY_COST_INCUBATE = 0
export const ENERGY_COST_FOOD = 0

// belly costs
export const HUNGER_MULTIPLIER_IDLE = -1 / 18000
export const HUNGER_MULTIPLIER_SLEEP = 0.02
export const HUNGER_MULTIPLIER_EXERT = HUNGER_MULTIPLIER_IDLE * 4
export const SLEEP_BELLY_THRESHOLD = 0.4

// default base values
export const DEFAULT_LEVEL = 0
export const DEFAULT_MAX_ENERGY = EXERCISE_COST * -10.5
export const DEFAULT_FATIGUE = 0
export const DEFAULT_MAX_BELLY = 10
export const DEFAULT_HUNGER = 0

// exp reward
export const BASE_EXP_REWARD = 1

// amount of energy a friendo gains per level
export const ENERGY_PER_LEVEL = EXERCISE_COST * -2

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
    threshold: 0.8,
    value: EXERCISE_COST / -2, // should be additive
  },
  {
    threshold: 0.5,
    value: EXERCISE_COST / -4, // should be additive
  },
  {
    threshold: 0.2,
    value: 0,
  },
  {
    threshold: 0.01,
    value: EXERCISE_COST / 2,
  },
]
// hunger modifier for if no threshold is greater than the value
export const BASE_HUNGER_MODIFIER = EXERCISE_COST

/**
 * Defines the amount of exp needed to level up a given stat
 * This probably needs fiddled with
 */
// maximum total level
export const LEVEL_MAX = (LVL_CALC_WHITELIST.length * 99) + 1

const EXP_CURVE = Array.from(Array(101), (_, i) => Math.ceil((i ** 1.8) + 8))
const STEEP_EXP_CURVE = Array.from(Array(101), (_, i) => Math.ceil((i ** 1.9) + 6))
const EGG_EXP = [0, 240, 180, 180, HATCH_DUR]

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
 * Calculated these values in a google doc somewhere, the idea is that each 10 levels of Taste
 * should allow you to restore 40% of the belly given by the corresponding value for "belly factor",
 * which is calculated off 2*core+arm+leg
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
