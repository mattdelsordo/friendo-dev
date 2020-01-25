import { SpeechOptions } from '../speech-options'
import NULL_PHRASES from '../phrases/null.json'

/* These functions get unreadable if I listen to the linter */
/* eslint-disable arrow-body-style */
const phraseElementMatches = (phraseObj, friendo) => {
  return !phraseObj.element || phraseObj.element === friendo.element.id
}

const phraseStatsMatch = (phraseObj, friendo) => {
  return Object.entries(friendo._stats).reduce((acc, [stat, value]) => {
    return acc && (!phraseObj[stat] || value >= phraseObj[stat])
  }, true)
}
/* eslint-enable arrow-body-style */

/**
 * Class that defines how generating/selecting speech options behaves
 */
export class EmptyPhrasebook {
  constructor() {
    // initialize in case pick() gets called before buildList
    this.basePhraseJson = NULL_PHRASES
    this.basePhrases = new SpeechOptions()
  }

  /** Getter a setter to mock instance variables in ES6 */
  get basePhraseJson() {
    return this._basePhraseJson
  }
  set basePhraseJson(value) {
    this._basePhraseJson = value
  }

  // returns a function that dictates how to filter the JSON list
  phraseFilter(friendo) {
    // true if phrase element === friendo element
    // and all stats above threshold (if extant)
    return phraseObj => (
      phraseElementMatches(phraseObj, friendo) && phraseStatsMatch(phraseObj, friendo)
    )
  }

  /**
   * Builds a list of phrases from which to pick
   * This must be called after a new state is created and subsequently
   * when new phrases could potentially be unlocked
   */
  populateBasePhrases(friendo) {
    this.basePhrases = new SpeechOptions(this.basePhraseJson, this.phraseFilter(friendo))
  }
  populate(friendo) {
    this.populateBasePhrases(friendo)
  }

  // returns a phrase at random from the list
  pick(friendo) {
    return this.basePhrases.pick(friendo)
  }
}
