// framerate of the game
// TODO: should this use requestanimationframe?
const TICKRATE = 250;

// maximum level in a given type
const STAT_MAX = 10;

// how much energy petting restores
const PET_INCREMENT = 4;

// maximum amount of dogs on the screen
const MAX_DOGS = 5;

// "enum" of stat indices
const STATS = Object.freeze({
    CORE:   "core",
    LEG:    "legs",
    ARM:    "arm",
    SIGHT:  "sight",
    HAIR:   "hair",
    TASTE:  "taste",
    DOG:    "dog",
    MEME:   "meme"
});

// "enum" of type indices
const ELEMENTS = Object.freeze({
    EARTH:  "earth",
    WATER:  "water",
    AIR:    "air",
    FIRE:   "fire",
});

// energy cost per exercise
const EXP_COST = Object.freeze({
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
const WORKOUT_LENGTH = Object.freeze({
    [STATS.CORE]: 5,
    [STATS.LEG]: 5,
    [STATS.ARM]: 5,
    [STATS.SIGHT]: 5,
    [STATS.HAIR]: 5,
    [STATS.TASTE]: 5,
    [STATS.DOG]: 5,
    [STATS.MEME]: 5
});

//element colors
const EARTH_OUTLINE = 'rgb(79, 57, 36)';
const EARTH_SKIN = 'rgb(166, 145, 123)';
const WATER_OUTLINE = 'rgb(24, 73, 129)';
const WATER_SKIN = 'rgb(137, 181, 231)';
const AIR_OUTLINE = 'rgb(86, 190, 186)';
const AIR_SKIN = 'rgb(225, 242, 249)';
const FIRE_OUTLINE = 'rgb(255, 0, 0)';
const FIRE_SKIN = 'rgb(255, 206, 0)';
const DOG_SKIN = 'rgb(229, 205, 108)';
const DOG_OUTLINE = 'rgb(140, 98, 57)';