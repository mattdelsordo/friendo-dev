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
import Hatch from './idle/hatch'
import { STATES } from '../constants'

export default (savedState, id, reps) => {
  switch (id) {
    case STATES.IDLE:
      return new Idle(savedState, reps)
    case STATES.SLEEP:
      return new Sleep(savedState, reps)
    case STATES.PET:
      return new Pet(savedState, reps)
    case STATES.FEED:
      return new Feed(savedState, reps)
    case STATES.CORE:
      return new Core(savedState, reps)
    case STATES.LEG:
      return new Leg(savedState, reps)
    case STATES.ARM:
      return new Arm(savedState, reps)
    case STATES.SIGHT:
      return new Sight(savedState, reps)
    case STATES.HAIR:
      return new Hair(savedState, reps)
    case STATES.TASTE:
      return new Taste(savedState, reps)
    case STATES.DOG:
      return new Dog(savedState, reps)
    case STATES.MEME:
      return new Meme(savedState, reps)
    case STATES.BABY:
      return new Egg(savedState, reps)
    case STATES.EGG:
      return new Incubate(savedState, reps)
    case STATES.HATCH:
      return new Hatch(savedState, reps)
    default:
      throw new Error(`Attempted to load invalid state '${id}'`)
  }
}
