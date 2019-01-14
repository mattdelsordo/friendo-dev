/**
 * This class is meant to be abstract, and should not be directly used
 * Defines shared behavior between fitness states
 */

import State from '../state'
import phrasebook from '../../phrases/fitness-phrases'
import { ID as idleID } from '../idle/idle'

export const ID = 'abstract_exercise'

export default class Exercise extends State {
  constructor(savedState) {
    super(savedState)
    this.phrasebook = phrasebook
    this.words = 'feel the burn'
    this.frame = 0
    this.id = ID
    this.returnTo = idleID
  }
}
