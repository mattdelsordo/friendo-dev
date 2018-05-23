// maximum level in a given element
export const STAT_MAX = 10;

// how much energy petting restores
export const PET_INCREMENT = 4;

// maximum amount of dogs on the screen
export const MAX_DOGS = 5;

// 'enum' of stat indices
export const STATS = Object.freeze({
  CORE: 'core',
  LEG: 'legs',
  ARM: 'arm',
  SIGHT: 'sight',
  HAIR: 'hair',
  TASTE: 'taste',
  DOG: 'dog',
  MEME: 'meme',
})

// energy cost per exercise
export const EXP_COST = Object.freeze({
    [STATS.CORE]: 1,
    [STATS.LEG]: 1,
    [STATS.ARM]: 1,
    [STATS.SIGHT]: 1,
    [STATS.HAIR]: 2,
    [STATS.TASTE]: 2,
    [STATS.DOG]: 3,
    [STATS.MEME]: 4
});

// time required for one excersize of a particular stat
export const WORKOUT_LENGTH = Object.freeze({
    [STATS.CORE]: 5,
    [STATS.LEG]: 5,
    [STATS.ARM]: 5,
    [STATS.SIGHT]: 5,
    [STATS.HAIR]: 5,
    [STATS.TASTE]: 5,
    [STATS.DOG]: 5,
    [STATS.MEME]: 5
});
