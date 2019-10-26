/**
 * Saves friendo stats to local storage
 */

/* eslint-disable no-restricted-globals */

import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

export const STORAGE_TOKEN = 'friendo-dna'

const compress = friendoString => compressToEncodedURIComponent(friendoString)
const decompress = encodedString => decompressFromEncodedURIComponent(encodedString)

// convert friendo to json, compress it, store it in localstorage
const friendoToCompressedJSON = friendo => compress(JSON.stringify(friendo))

export const saveFriendo = (friendo) => {
  const compressed = friendoToCompressedJSON(friendo)
  localStorage.setItem(STORAGE_TOKEN, compressed)
  return compressed
}

// get friendo json from localstorage and decompress it
export const loadFriendoJSON = () => decompress(localStorage.getItem(STORAGE_TOKEN))

// hard-reloads the webpage to clear the cache
export const reload = () => location.reload(true)

// deletes the friendo saved in local storage
export const erase = () => localStorage.removeItem(STORAGE_TOKEN)
