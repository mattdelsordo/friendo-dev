/**
 * Factory method to properly load a state from json
 */

import State, { ID as defaultID } from './state'
import Idle, { ID as idleID } from './idle'

export default savedState => {
  switch (savedState.id) {
    case idleID:
      console.log(`Loading idle state`)
      return new Idle(savedState)
    default:
      throw 'Attempted to load invalid state.'
  }
}
