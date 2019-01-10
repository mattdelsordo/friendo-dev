// maximum level in a given element
export const STAT_MAX = 100

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

// Only the first X stats are shown to the user, the rest are only used internally
export const EXPOSED_STATS = 8

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

// 'enum' of potential actions
export const ACTIONS = Object.freeze({
  CORE: 'core',
  LEG: 'leg',
  ARM: 'arm',
  SIGHT: 'sight',
  HAIR: 'hair',
  TASTE: 'taste',
  DOG: 'dog',
  MEME: 'meme',
  EGG: 'egg',
  SLEEP: 'sleep',
  PET: 'pet',
  FEED: 'feed',
})

// maximum total level
export const LEVEL_MAX = (EXPOSED_STATS * 99) + 1
