const EMPTY_BOOK = ['']

/**
 * Class that defines how generating/selecting speech options behaves
 */
export default class EmptyPhrasebook {
  constructor() {
    this.phrases = EMPTY_BOOK
  }

  /**
   * Builds a list of phrases from which to pick
   * This must be called after a new state is created and subsequently
   * when new phrases could potentially be unlocked
   */
  buildList() {
    // default phrasebook acts as an empty list
    this.phrases = EMPTY_BOOK
  }

  // returns a phrase at random from the list
  pick() {
    return this.phrases[Math.floor(Math.random() * this.phrases.length)]
  }
}
