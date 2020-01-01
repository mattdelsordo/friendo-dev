import EmptyPhrasebook from './phrasebook'
import { feedPhrases } from '../phrases/feed'

export default class FeedPhrasebook extends EmptyPhrasebook {
  /**
   * Builds a list of phrases from which to pick
   */
  buildList(friendo) {
    this.phrases = feedPhrases()
    this.phrases = this.phrases.concat(friendo.element.phrases.feed(friendo))
  }
}
