import EmptyPhrasebook from './phrasebook'
import { sleepPhrases } from '../phrases/sleep'

export default class SleepPhrasebook extends EmptyPhrasebook {
  /**
   * Builds a list of phrases from which to pick
   */
  buildList(friendo) {
    this.phrases = sleepPhrases()
    this.phrases = this.phrases.concat(friendo.element.phrases.sleep(friendo))
  }
}
