import EmptyPhrasebook from './phrasebook'
import sleepPhrases from '../phrases/sleep'

export default class SleepPhrasebook extends EmptyPhrasebook {
  /**
   * Builds a list of phrases from which to pick
   */
  reloadPhrases() {
    this.phrases = sleepPhrases()
  }
}
