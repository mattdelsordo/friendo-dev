import loadState from './state/load-state'
import { ID as sleepID } from './state/fitness/sleep'
import {
  ACTIONS, EGG_COST, EXERCISE_COST,
  FEED_REP_LENGTH, FOOD_COST,
  MAX_EGG_LEVEL, PET_COST,
  PET_REP_LENGTH,
  REP_LENGTH, SLEEP_COST,
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
  [ACTIONS.MEME]: REP_LENGTH,
  [ACTIONS.EGG]: REP_LENGTH,
  [ACTIONS.SLEEP]: REP_LENGTH * 2,
  [ACTIONS.FEED]: FEED_REP_LENGTH, // specific to feeding
  [ACTIONS.PET]: PET_REP_LENGTH,
}

// returns energy cost of a given exercise
export const REP_COST = {
  [ACTIONS.CORE]: EXERCISE_COST,
  [ACTIONS.LEG]: EXERCISE_COST,
  [ACTIONS.ARM]: EXERCISE_COST,
  [ACTIONS.SIGHT]: EXERCISE_COST,
  [ACTIONS.HAIR]: EXERCISE_COST,
  [ACTIONS.TASTE]: EXERCISE_COST,
  [ACTIONS.DOG]: EXERCISE_COST,
  [ACTIONS.MEME]: EXERCISE_COST,
  [ACTIONS.EGG]: EGG_COST,
  [ACTIONS.SLEEP]: SLEEP_COST,
  [ACTIONS.FEED]: FOOD_COST,
  [ACTIONS.PET]: PET_COST,
}

// returns exp reward based on the given exercise
export const REP_REWARD = {
  [ACTIONS.CORE]: 1,
  [ACTIONS.LEG]: 1,
  [ACTIONS.ARM]: 1,
  [ACTIONS.SIGHT]: 1,
  [ACTIONS.HAIR]: 1,
  [ACTIONS.TASTE]: 1,
  [ACTIONS.DOG]: 1,
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
    const cost = REP_COST[action] * friendo.zodiac.getStatBonus(action)
    friendo.modifyFatigue(cost, action === ACTIONS.FEED)
    // add exp if applicable
    // have to parse out the action id to get the state id
    friendo.addExp(stat, REP_REWARD[action])
    // update reps in stat
    friendo.state.setReps(reps)

    everyRep(friendo)

    // check if energy has dipped below zero, if so, sleep
    if (friendo.getEnergyPercent() <= 0) {
      console.log('Next rep! (exhausted)')
      friendo.state = loadState(this, sleepID)
      return exercise(friendo, ACTIONS.SLEEP, -1, everyRep, end)
    }

    // if sleeping, check if energy >= max, if so, return to idle
    if (action === ACTIONS.SLEEP && friendo.getEnergyPercent() >= 1.0) {
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
