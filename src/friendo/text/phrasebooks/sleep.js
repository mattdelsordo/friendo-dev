import { EmptyPhrasebook } from './phrasebook'
import SLEEP_PHRASES from '../phrases/sleep.json'

export class SleepPhrasebook extends EmptyPhrasebook {
  constructor() {
    super()
    this.basePhraseJson = SLEEP_PHRASES
  }
}
