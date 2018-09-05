/**
 * Factory method to properly load a state from json
 */

import Idle, { ID as idleID } from './idle'
import Sleep, { ID as sleepID } from './sleep'
import Pet, { ID as petID } from './pet'
import Core, { ID as coreID } from './fitness/situp'
import Leg, { ID as legID } from './fitness/squat'
import Arm, { ID as armID } from './fitness/curl'

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
    case coreID:
      /* eslint-disable-next-line no-console */
      console.log('Loading core training state')
      return new Core(savedState)
    case legID:
      /* eslint-disable-next-line no-console */
      console.log('Loading leg training state')
      return new Leg(savedState)
    case armID:
      /* eslint-disable-next-line no-console */
      console.log('Loading arm training state')
      return new Arm(savedState)
    default:
      throw new Error(`Attempted to load invalid state '${id}'`)
  }
}
