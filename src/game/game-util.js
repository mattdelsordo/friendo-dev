/**
 * Saves friendo stats to local storage
 */

/* eslint-disable no-restricted-globals */

import { compressToUTF16, decompressFromUTF16 } from 'lz-string'
import { SAVE_INTERVAL } from './game-config'

export const STORAGE_TOKEN = 'friendo'

const compress = friendoString => compressToUTF16(friendoString)
const decompress = encodedString => decompressFromUTF16(encodedString)

export const loadFriendoJSON = () => decompress(localStorage.getItem(STORAGE_TOKEN))

export const saveFriendo = (friendo) => {
  localStorage.setItem(STORAGE_TOKEN, compress(JSON.stringify(friendo)))
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
