import EmptyPhrasebook from './phrasebook'
import { fitnessPhrases } from '../phrases/fitness'

export default class FitnessPhrasebook extends EmptyPhrasebook {
  /**
   * Builds a list of phrases from which to pick
   */
  buildList(friendo) {
    this.phrases = fitnessPhrases()
    this.phrases = this.phrases.concat(friendo.element.phrases.fitness(friendo))
  }
}
