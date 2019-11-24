import EmptyPhrasebook from './phrasebook'
import feedPhrases from '../phrases/feed'

export default class FeedPhrasebook extends EmptyPhrasebook {
  /**
   * Builds a list of phrases from which to pick
   */
  reloadPhrases() {
    this.phrases = feedPhrases()
  }
}
