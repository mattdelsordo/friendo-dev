/**
 * This class is meant to be abstract, and should not be directly used
 * Defines shared behavior between fitness states
 */

import State from '../state'
import phrasebook from '../../phrases/fitness-phrases'

export const ID = 'abstract_exercise'

export default class Exercise extends State {
  constructor(savedState) {
    super(savedState)
    this.phrasebook = phrasebook
    this.words = 'feel the burn'
    this.frame = 0
    this.id = ID
  }
}
