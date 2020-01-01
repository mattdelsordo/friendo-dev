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
    this.phrases = this.phrases.concat(friendo.element.phrases.idle(friendo))
    // add stat-specific phrases
    Object.entries(STATS).forEach(([_, value]) => {
      this.phrases = this.phrases.concat(statPhrases[value](friendo.getStat(value)))
    })
    // add hunger phrases
    this.phrases = this.phrases.concat(hungerPhrases(friendo.getHungerStage()))
    // add sleep phrases
    this.phrases = this.phrases.concat(sleepyPhrases(friendo.getEnergyStage()))
  }
}
