import loadState from '../friendo/state/load-state'
import { save } from '../game/game-util'
import { setEnergy, setAllStats } from './ui-update'
import { ID as idleID } from '../friendo/state/idle'
import { ID as sleepID } from '../friendo/state/sleep'
import { ACTIONS } from '../friendo/constants'

// returns the time cost of a given single exercise (in ms)
export const REP_TIME = {
  [ACTIONS.CORE]: 12000,
  [ACTIONS.LEG]: 12000,
  [ACTIONS.ARM]: 12000,
  [ACTIONS.SIGHT]: 12000,
  [ACTIONS.HAIR]: 12000,
  [ACTIONS.TASTE]: 12000,
  [ACTIONS.DOG]: 12000,
  [ACTIONS.MEME]: 36000,
  [ACTIONS.EGG]: 12000,
  [ACTIONS.SLEEP]: 12000,
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
  [ACTIONS.EGG]: 0,
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
    // update energy bar
    setEnergy(friendo.getEnergyLeft())
    // update stat displays
    setAllStats(friendo._stats, friendo.exp)

    // save state of friendo
    save(JSON.stringify(friendo))

    // check if energy has dipped below zero, if so, sleep
    if (friendo.getEnergyLeft() <= 0) {
      friendo.state = loadState(this, sleepID)
      exercise(friendo, ACTIONS.SLEEP, callback, -1)
      return
    }

    // check if energy >= max, if so, return to idle (for sleep case)
    if (friendo.getEnergyLeft() >= 1.0) {
      // else, return to idle
      friendo.state = loadState(this, idleID)

      // callback if applicable, ex. to re-enable buttons
      if (callback) callback()
      return
    }

    // do next rep if there are any left
    if (reps !== 0) {
      exercise(friendo, action, callback, reps - 1)
      return
    } else {
      // else, return to idle
      friendo.state = loadState(this, idleID)

      // callback if applicable, ex. to re-enable buttons
      if (callback) callback()
      return
    }
  }, REP_TIME[action])
}
