import { AwakePhrasebook } from './awake'
import IDLE_PHRASES from '../phrases/idle.json'

export class IdlePhrasebook extends AwakePhrasebook {
  constructor() {
    super()
    this.basePhraseJson = IDLE_PHRASES
  }
}
