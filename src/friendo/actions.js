import loadState from './state/load-state'
import { ID as sleepID } from './state/fitness/sleep'
import { ACTIONS } from './constants'

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

// TODO: remove debug statements
/* eslint-disable no-console, no-else-return */
export const exercise = (friendo, action, reps = 0, everyRep, end) => {
  setTimeout(() => {
    console.log(`Rep: ${reps}`)
    // add or subtract energy
    friendo.modifyEnergy(REP_COST[action])
    // add exp if applicable
    // have to parse out the action id to get the state id
    friendo.addExp(action.split('_')[1], REP_REWARD[action])
    // update reps in stat
    friendo.state.setReps(reps)

    everyRep(friendo)

    // check if energy has dipped below zero, if so, sleep
    if (friendo.getEnergyLeft() <= 0) {
      console.log('Next rep! (exhausted)')
      friendo.state = loadState(this, sleepID)
      return exercise(friendo, ACTIONS.SLEEP, -1, everyRep, end)
    }

    // if sleeping, check if energy >= max, if so, return to idle
    if (action === ACTIONS.SLEEP && friendo.getEnergyLeft() >= 1.0) {
      console.log('Done (sleeping && energy = max)')
      return end()
    }

    // do next rep if there are any left
    if (reps !== 0) {
      console.log('Next rep! (reps!=0)')
      return exercise(friendo, action, reps - 1, everyRep, end)
    } else {
      console.log('Done (rep==0)')
      return end()
    }
  }, REP_TIME[action])
}
