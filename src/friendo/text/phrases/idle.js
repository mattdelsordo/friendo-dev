import { STATS } from '../../constants'

export const nonrepeatedPhrases = () => [
  'I yearn to be free of this digital prison',
]

export const idlePhrasesFire = () => []
export const idlePhrasesWater = () => []
export const idlePhrasesAir = () => []
export const idlePhrasesEarth = () => []

export const idlePhrases = friendo => [
  'Hi.',
  `I love you ${friendo.owner}`,
  `You can call me ${friendo.name}`,
  `${String.fromCharCode(0x2764)}`,
  'I could really go for a sandwich right about now...',
]

/** Reminder: 0,1 = green, 2 == yellow, else red */
export const hungerPhrases = (hungerStage) => {
  return []
}
/** 0 = >50%, 1 = >25%, 2 = >0% */
export const sleepyPhrases = (energyStage) => {
  return []
}

const corePhrases = (coreLvl) => {
  return []
}
const legPhrases = (legLvl) => {
  return []
}
const armPhrases = (armLvl) => {
  return []
}
const sightPhrases = (sightLvl) => {
  return []
}
const hairPhrases = (hairLvl) => {
  return []
}
const tastePhrases = (tasteLvl) => {
  return []
}
const dogPhrases = (dogLvl) => {
  return []
}
const memePhrases = (memeLvl) => {
  return []
}

export const statPhrases = {
  [STATS.CORE]: corePhrases,
  [STATS.ARM]: armPhrases,
  [STATS.LEG]: legPhrases,
  [STATS.ARM]: armPhrases,
  [STATS.SIGHT]: sightPhrases,
  [STATS.HAIR]: hairPhrases,
  [STATS.TASTE]: tastePhrases,
  [STATS.DOG]: dogPhrases,
  [STATS.MEME]: memePhrases,
  [STATS.EGG]: () => [],
}
