import { AwakePhrasebook } from './awake'
import FITNESS_PHRASES from '../phrases/fitness.json'

export class FitnessPhrasebook extends AwakePhrasebook {
  constructor() {
    super()
    this.basePhraseJson = FITNESS_PHRASES
  }
}
