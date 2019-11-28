import EmptyPhrasebook from './phrasebook'
import { idlePhrases, statPhrases, hungerPhrases, sleepyPhrases } from '../phrases/idle'
import { STATS } from '../../constants'

export default class IdlePhrasebook extends EmptyPhrasebook {
  /**
   * Builds a list of phrases from which to pick
   */
  buildList(friendo) {
    // base phrases by default
    this.phrases = idlePhrases(friendo)
    // add phrases based on element
    this.phrases += friendo.element.phrases.idle(friendo)
    // add stat-specific phrases
    Object.entries(STATS).forEach((s) => {
      this.phrases += statPhrases[s](friendo.getStat(s))
    })
    // add hunger phrases
    this.phrases += hungerPhrases(friendo.getHungerStage())
    // add sleep phrases
    this.phrases += sleepyPhrases(friendo.getEnergyStage())
  }
}
