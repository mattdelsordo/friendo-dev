import { STATS } from '../constants'

/** State verbs */
export const DEFAULT_VERB = 'Existing'
export const IDLE_VERB = 'Just chillin\''
export const EAT_VERB = 'Eating'
export const SLEEP_VERB = 'Asleep'
export const EGG_VERB = 'Egg'
export const HATCH_VERB = 'It\'s about to hatch!'
export const ARM_VERB = 'Doing curls'
export const DOG_VERB = 'Playing with dogs'
export const HAIR_VERB = 'Getting hair brushed'
export const INCUBATE_VERB = 'Incubating'
export const TASTE_VERB = 'Scarfing down hot dogs'
export const SIGHT_VERB = 'Reading a book'
export const CORE_VERB = 'Doing situps'
export const LEG_VERB = 'Doing squats'
export const MEME_VERB = 'Surfing the web'
export const EXERT_VERB = 'Getting swole'

/** Text Emojis */
export const BABY_EMOJI = '\u{1F476}'
export const IDLE_EMOJI = '\u{1F642}'
export const EXERT_EMOJI = '\u{1F605}'
export const ASLEEP_EMOJI = '\u{1F634}'

/** Tutorial Content */
export const ENERGY_TUT_TITLE = 'Exercising takes energy!'
export const ENERGY_TUT_CONTENT = 'They\'ll fall asleep if they get too tired.'
export const HUNGER_TUT_TITLE = 'Keep your Friendo well-fed!'
export const HUNGER_TUT_CONTENT = 'Eating healthy is the key to post-workout recovery.'

export const ENERGY_EXPLAIN_TITLE = 'Energy'
export const ENERGY_EXPLAIN_CONTENT = 'Energy is a measure of a Friendo\'s capacity to work out. If a Friendo runs out of energy, they will fall asleep until their energy returns to full.'
export const HUNGER_EXPLAIN_TITLE = 'Hunger'
export const HUNGER_EXPLAIN_CONTENT = 'The fuller your Friendo\'s belly, the faster it will regain energy. If they get too hungry, they\'ll actually begin to lose energy. Keep your Friendo well-fed by clicking the FEED button.'

export const lockedStatTitle = name => `${name} has not unlocked this stat yet.`
export const LOCKED_STAT_CONTENT = 'Who knows what potential they could have buried deep inside?'

// explanations and titles for stats
const expstring = (friendo, stat) => `\tExp to next level: ${Math.floor(friendo.getExpLeft(stat))}`
export const STAT_EXPLAIN = {
  [STATS.CORE]: friendo => `How big your Friendo's torso is.${expstring(friendo, STATS.CORE)}`,
  [STATS.LEG]: friendo => `How thicc your Friendo's legs are.${expstring(friendo, STATS.LEG)}`,
  [STATS.ARM]: friendo => `How thick your Friendo's arms are.${expstring(friendo, STATS.ARM)}`,
  [STATS.SIGHT]: friendo => `How well your Friendo can see.${expstring(friendo, STATS.SIGHT)}`,
  [STATS.HAIR]: friendo => `How thick your Friendo's hair is.${expstring(friendo, STATS.HAIR)}`,
  [STATS.TASTE]: friendo => `How picky of an eater your Friendo is. Fancier food restores more energy.${expstring(friendo, STATS.TASTE)}`,
  [STATS.DOG]: friendo => `How much your Friendo enjoys dogs.${expstring(friendo, STATS.DOG)}`,
  [STATS.MEME]: friendo => `How receptive your Friendo is to new ideas. Helps your Friendo learn and grow more quickly.${expstring(friendo, STATS.MEME)}`,
  [STATS.EGG]: () => 'It\'s an egg. I wonder what will hatch from it?',
}
export const STAT_TITLES = {
  [STATS.CORE]: 'Core',
  [STATS.LEG]: 'Legs',
  [STATS.ARM]: 'Arms',
  [STATS.SIGHT]: 'Sight',
  [STATS.HAIR]: 'Hair',
  [STATS.TASTE]: 'Taste',
  [STATS.DOG]: 'Dog Affinity',
  [STATS.MEME]: 'Meme Tolerance',
  [STATS.EGG]: 'Egg',
}

// for the character creator
const ERROR_NAMES = [
  'Big Error Bill',
  'Errorly',
  'Errortholemew',
  'Errornius',
  'Errorl',
  'Erroar',
  'Errormantha',
]
export const getErrorName = () => ERROR_NAMES[Math.floor(Math.random() * ERROR_NAMES.length)]
