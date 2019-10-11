/**
 * Factory method to properly load a state from json
 */

import Idle from './idle/idle'
import Sleep from './relax/sleep'
import Pet from './relax/pet'
import Core from './exert/situp'
import Leg from './exert/squat'
import Arm from './exert/curl'
import Sight from './exert/read'
import Hair from './exert/groom'
import Feed from './relax/feed'
import Taste from './exert/munch'
import Dog from './exert/dog-cuddle'
import Meme from './exert/surf-web'
import Egg from './idle/egg'
import Incubate from './exert/incubate'
import { STATES } from '../constants'

export default (savedState, id, reps) => {
  switch (id) {
    case STATES.IDLE:
      /* eslint-disable-next-line no-console */
      console.log('Loading idle state')
      return new Idle(savedState, reps)
    case STATES.SLEEP:
      /* eslint-disable-next-line no-console */
      console.log('Loading sleep state')
      return new Sleep(savedState, reps)
    case STATES.PET:
      /* eslint-disable-next-line no-console */
      console.log('Loading pet state')
      return new Pet(savedState, reps)
    case STATES.FEED:
      /* eslint-disable-next-line no-console */
      console.log('Loading feeding state')
      return new Feed(savedState, reps)

    case STATES.CORE:
      /* eslint-disable-next-line no-console */
      console.log('Loading core training state')
      return new Core(savedState, reps)
    case STATES.LEG:
      /* eslint-disable-next-line no-console */
      console.log('Loading leg training state')
      return new Leg(savedState, reps)
    case STATES.ARM:
      /* eslint-disable-next-line no-console */
      console.log('Loading arm training state')
      return new Arm(savedState, reps)
    case STATES.SIGHT:
      /* eslint-disable-next-line no-console */
      console.log('Loading sight training state')
      return new Sight(savedState, reps)
    case STATES.HAIR:
      /* eslint-disable-next-line no-console */
      console.log('Loading hair training state')
      return new Hair(savedState, reps)
    case STATES.TASTE:
      /* eslint-disable-next-line no-console */
      console.log('Loading taste training state')
      return new Taste(savedState, reps)
    case STATES.DOG:
      /* eslint-disable-next-line no-console */
      console.log('Loading dog training state')
      return new Dog(savedState, reps)
    case STATES.MEME:
      /* eslint-disable-next-line no-console */
      console.log('Loading meme training state')
      return new Meme(savedState, reps)
    case STATES.BABY:
      /* eslint-disable-next-line no-console */
      console.log('Loading egg state')
      return new Egg(savedState, reps)
    case STATES.EGG:
      /* eslint-disable-next-line no-console */
      console.log('Loading incubation state')
      return new Incubate(savedState, reps)
    default:
      throw new Error(`Attempted to load invalid state '${id}'`)
  }
}
