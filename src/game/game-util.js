/**
 * Saves friendo stats to local storage
 */

/* eslint-disable no-restricted-globals */

import { SAVE_INTERVAL } from './game-config'

export const STORAGE_TOKEN = 'friendo'

export const loadFriendoJSON = () => {
  const saveGame = localStorage.getItem(STORAGE_TOKEN)
  return saveGame
}

export const saveFriendo = (friendo) => {
  const json = JSON.stringify(friendo)
  /* eslint-disable-next-line no-console */
  console.log(`Saving ${json}`)
  localStorage.setItem(STORAGE_TOKEN, json)
  // not sure how to avoid this use-before-define
  /* eslint-disable-next-line no-use-before-define */
  setNewSaveTimer(friendo)
}

let saveTimeout
export const setNewSaveTimer = (friendo) => {
  // clear last timeout, set new timeout
  // do another save after the interval
  clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    saveFriendo(friendo)
  }, SAVE_INTERVAL)
}

// hard-reloads the webpage to clear the cache
export const reload = () => location.reload(true)

// deletes the friendo saved in local storage
export const erase = () => localStorage.removeItem(STORAGE_TOKEN)
