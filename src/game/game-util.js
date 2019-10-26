/**
 * Saves friendo stats to local storage
 */

/* eslint-disable no-restricted-globals */

import { compressToUTF16, decompressFromUTF16 } from 'lz-string'

export const STORAGE_TOKEN = 'friendo-dna'

const compress = friendoString => compressToUTF16(friendoString)
const decompress = encodedString => decompressFromUTF16(encodedString)

// convert friendo to json, compress it, store it in localstorage
export const saveFriendo = friendo => localStorage.setItem(STORAGE_TOKEN, compress(JSON.stringify(friendo)))

// get friendo json from localstorage and decompress it
export const loadFriendoJSON = () => decompress(localStorage.getItem(STORAGE_TOKEN))

// hard-reloads the webpage to clear the cache
export const reload = () => location.reload(true)

// deletes the friendo saved in local storage
export const erase = () => localStorage.removeItem(STORAGE_TOKEN)
