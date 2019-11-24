import EmptyPhrasebook from './phrasebook'
import { idlePhrases } from '../phrases/idle'

export default class IdlePhrasebook extends EmptyPhrasebook {
  /**
   * Builds a list of phrases from which to pick
   */
  reloadPhrases(friendo) {
    this.phrases = idlePhrases(friendo)
  }
}
