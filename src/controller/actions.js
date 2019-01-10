import loadState from '../friendo/state/load-state'
import { save } from '../game/game-util'
import { setEnergy } from './ui-update'
import { ID as idleID } from '../friendo/state/idle'
import { ID as sleepID } from '../friendo/state/sleep'
import { ACTIONS } from '../friendo/constants'

// returns the time cost of a given single exercise (in ms)
export const REP_TIME = {
  [ACTIONS.CORE]: 2000,
  [ACTIONS.LEG]: 2000,
  [ACTIONS.ARM]: 2000,
  [ACTIONS.SIGHT]: 2000,
  [ACTIONS.HAIR]: 2000,
  [ACTIONS.TASTE]: 2000,
  [ACTIONS.DOG]: 2000,
  [ACTIONS.MEME]: 3000,
  [ACTIONS.EGG]: 1000,
  [ACTIONS.SLEEP]: 10000,
  [ACTIONS.FEED]: 2750,
  [ACTIONS.PET]: 2000,
}

// returns energy cost of a given exercise
export const REP_COST = {
  [ACTIONS.CORE]: -10,
  [ACTIONS.LEG]: -10,
  [ACTIONS.ARM]: -10,
  [ACTIONS.SIGHT]: -10,
  [ACTIONS.HAIR]: -10,
  [ACTIONS.TASTE]: -10,
  [ACTIONS.DOG]: -10,
  [ACTIONS.MEME]: -7,
  [ACTIONS.EGG]: -10,
  [ACTIONS.SLEEP]: 1,
  [ACTIONS.FEED]: 1,
  [ACTIONS.PET]: 1,
}

// returns exp reward based on the given exercise
export const REP_REWARD = {
  [ACTIONS.CORE]: 2,
  [ACTIONS.LEG]: 2,
  [ACTIONS.ARM]: 2,
  [ACTIONS.SIGHT]: 2,
  [ACTIONS.HAIR]: 2,
  [ACTIONS.TASTE]: 2,
  [ACTIONS.DOG]: 2,
  [ACTIONS.MEME]: 1,
  [ACTIONS.EGG]: 1,
  [ACTIONS.SLEEP]: 0,
  [ACTIONS.FEED]: 0,
  [ACTIONS.PET]: 0,
}

export const exercise = (friendo, action, callback, reps = 0) => {
  setTimeout(() => {
    // add or subtract energy
    friendo.modifyEnergy(REP_COST[action])
    // add exp if applicable
    friendo.addExp(action, REP_REWARD[action])

    // check if energy has dipped below zero, if so, sleep
    if (friendo.getEnergyLeft() <= 0) {
      friendo.state = loadState(this, sleepID)
      exercise(friendo, ACTIONS.SLEEP, callback, -1)
    }

    // check if energy >= max, if so, return to idle (for sleep case)
    if (friendo.getEnergyLeft() >= 1.0) {
      // else, return to idle
      friendo.state = loadState(this, idleID)

      // callback if applicable, ex. to re-enable buttons
      if (callback) callback()
    }

    // do next rep if there are any left
    if (reps !== 0) {
      exercise(friendo, action, callback, reps - 1)
    } else {
      // else, return to idle
      friendo.state = loadState(this, idleID)

      // callback if applicable, ex. to re-enable buttons
      if (callback) callback()
    }

    // save state of friendo
    save(JSON.stringify(friendo))

    // update energy bar
    setEnergy(friendo.getEnergyLeft())
  }, REP_TIME[action])
}
