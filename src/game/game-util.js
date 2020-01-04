/**
 * Saves friendo stats to local storage
 */

/* eslint-disable no-restricted-globals */

import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

// global constants injected into the bundle at compile time by webpack
// redefined here so they aren't just floating in the ether
// and so eslint doesn't yell every time they're used
/* eslint-disable no-undef */
export const BUILD_DATE = new Date(BUNDLE_BUILD_DATE)
export const VERSION = BUNDLE_VERSION
/* eslint-enable no-undef */

export const STORAGE_TOKEN = 'friendo-dna'
export const VERSION_TOKEN = 'last-version'

const compress = friendoString => compressToEncodedURIComponent(friendoString)
const decompress = encodedString => decompressFromEncodedURIComponent(encodedString)

// convert friendo to json, compress it, store it in localstorage
const friendoToCompressedJSON = friendo => compress(JSON.stringify(friendo))

// sets save file to a string
export const storeSavefile = save => localStorage.setItem(STORAGE_TOKEN, save)

export const saveFriendo = (friendo) => {
  const compressed = friendoToCompressedJSON(friendo)
  storeSavefile(compressed)
  return compressed
}

// get friendo json from localstorage and decompress it
export const loadFriendoJSON = () => JSON.parse(decompress(localStorage.getItem(STORAGE_TOKEN)))

// hard-reloads the webpage to clear the cache
export const reload = () => location.reload(true)

// deletes the friendo saved in local storage
export const erase = () => localStorage.removeItem(STORAGE_TOKEN)

export const cachedVersionMismatch = () => {
  // get cached version
  const cached = localStorage.getItem(VERSION_TOKEN)
  // replace it with the current version
  localStorage.setItem(VERSION_TOKEN, VERSION)

  return (cached && cached !== VERSION)
}

// calculate the length of time in days since the last release
export const daysSinceLastRelease = () => (new Date() - BUILD_DATE) / 86400000
