/**
 * Factory method to properly load a state from json
 */

import Idle, { ID as idleID } from './idle'
import Sleep, { ID as sleepID } from './sleep'
import Pet, { ID as petID } from './pet'

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
    case petID:
      /* eslint-disable-next-line no-console */
      console.log('Loading pet state')
      return new Pet(savedState)
    default:
      throw new Error('Attempted to load invalid state.')
  }
}
