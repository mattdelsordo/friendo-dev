/**
* Phrasebook that is extended by idle and fitness phrasebooks
* allows for saying of hungry/sleepy/rare phrases if check passes
*/

import { EmptyPhrasebook } from './phrasebook'
import { SpeechOptions } from '../speech-options'
import RARESPEAK_CHANCE from '../../constants'
import RARE_PHRASES from '../phrases/rare.json'
import HUNGRY_PHRASES from '../phrases/hungry.json'
import SLEEPY_PHRASES from '../phrases/sleepy.json'
import { HUNGER_MODIFIERS } from '../../balance'

export class AwakePhrasebook extends EmptyPhrasebook {
  constructor() {
    super()
    this.hungryPhraseJson = HUNGRY_PHRASES
    this.sleepyPhraseJson = SLEEPY_PHRASES
    this.rarePhraseJson = RARE_PHRASES
    this.sleepyPhrases = new SpeechOptions()
    this.hungryPhrases = new SpeechOptions()
    this.rarePhrases = new SpeechOptions()
  }

  get hungryPhraseJson() {
    return this._hungryPhraseJson
  }
  set hungryPhraseJson(value) {
    this._hungryPhraseJson = value
  }

  get sleepyPhraseJson() {
    return this._sleepyPhraseJson
  }
  set sleepyPhraseJson(value) {
    this._sleepyPhraseJson = value
  }

  get rarePhraseJson() {
    return this._rarePhraseJson
  }
  set rarePhraseJson(value) {
    this._rarePhraseJson = value
  }

  populate(friendo) {
    this.basePhrases = new SpeechOptions(this.basePhraseJson, this.phraseFilter(friendo))
    this.sleepyPhrases = new SpeechOptions(this.sleepyPhraseJson, this.phraseFilter(friendo))
    this.hungryPhrases = new SpeechOptions(this.hungryPhraseJson, this.phraseFilter(friendo))
    this.rarePhrases = new SpeechOptions(this.rarePhraseJson, this.phraseFilter(friendo))
  }

  sayRarePhrase() {
    return RARESPEAK_CHANCE > Math.random()
  }

  // start mentioning energy below 40%, then increase with sleepiness
  saySleepPhrase(energy) {
    if (energy > 0.4) {
      return false
    }

    return Math.random() > energy
  }

  /**
  * Reminder: 0,1 = green, 2 == yellow, else red
  * >75% (0) => 0%, 75-50 (1) => 10%, 50-20 (2) => 50%, 20-0.01 (3) => 80%
  * */
  sayHungryPhrase(hungriness) {
    return HUNGER_MODIFIERS[hungriness].speakChance > Math.random()
  }

  pick(friendo) {
    // if tired and energy is decreasing, pick from sleepy phrases
    if (friendo.getHungerModifier() <= 0 && this.saySleepPhrase(friendo.getEnergyPercent())) {
      return this.sleepyPhrases.pick(friendo)
    }

    // if hungry, pick from hunger phrases
    if (this.sayHungryPhrase(friendo.getHungerStage())) {
      return this.hungryPhrases.pick(friendo)
    }

    // decide on rare phrases separately
    if (this.sayRarePhrase()) {
      return this.rarePhrases.pick(friendo)
    }

    return super.pick(friendo)
  }
}
