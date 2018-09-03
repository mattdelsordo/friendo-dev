/**
 * Factory method to properly load a state from json
 */

import Idle, { ID as idleID } from './idle'
import Sleep, { ID as sleepID } from './sleep'

export default (savedState, id) => {
  switch (id) {
    case idleID:
      /* eslint-disable-next-line no-console */
      console.log('Loading idle state')
      return new Idle(savedState)
    case sleepID:
      /* eslint-disable-next-line no-console */
      console.log('Loading sleep state')
      return new Sleep(savedState)
    default:
      throw new Error('Attempted to load invalid state.')
  }
}
