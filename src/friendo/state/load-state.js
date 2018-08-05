/**
 * Factory method to properly load a state from json
 */

import Idle, { ID as idleID } from './idle'

export default (savedState) => {
  switch (savedState.id) {
    case idleID:
      /* eslint-disable-next-line no-console */
      console.log('Loading idle state')
      return new Idle(savedState)
    default:
      throw new Error('Attempted to load invalid state.')
  }
}
