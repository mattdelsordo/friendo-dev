import loadState from './state/load-state'
import { ID as sleepID } from './state/fitness/sleep'
import {
  ACTIONS,
  FEED_REP_LENGTH,
  MAX_EGG_LEVEL,
  PET_REP_LENGTH,
  REP_LENGTH,
  STAT_MAX,
} from './constants'

// returns the time cost of a given single exercise (in ms)
export const REP_TIME = {
  [ACTIONS.CORE]: REP_LENGTH,
  [ACTIONS.LEG]: REP_LENGTH,
  [ACTIONS.ARM]: REP_LENGTH,
  [ACTIONS.SIGHT]: REP_LENGTH,
  [ACTIONS.HAIR]: REP_LENGTH,
  [ACTIONS.TASTE]: REP_LENGTH,
  [ACTIONS.DOG]: REP_LENGTH,
  [ACTIONS.MEME]: REP_LENGTH * 2,
  [ACTIONS.EGG]: REP_LENGTH / 3,
  [ACTIONS.SLEEP]: REP_LENGTH,
  [ACTIONS.FEED]: FEED_REP_LENGTH, // specific to feeding
  [ACTIONS.PET]: PET_REP_LENGTH,
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
  [ACTIONS.MEME]: -10,
  [ACTIONS.EGG]: 0,
  [ACTIONS.SLEEP]: 4,
  [ACTIONS.FEED]: 4,
  [ACTIONS.PET]: 2,
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
    const stat = action.split('_')[1]
    console.log(`Rep: ${reps}`)
    // add or subtract energy
    friendo.modifyEnergy(REP_COST[action], action === ACTIONS.FEED)
    // add exp if applicable
    // have to parse out the action id to get the state id
    friendo.addExp(stat, REP_REWARD[action])
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

    // if stat is maxed, end immediately
    if ((action === ACTIONS.EGG && friendo.getStat(stat) === MAX_EGG_LEVEL)
      || friendo.getStat(stat) === STAT_MAX) {
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
