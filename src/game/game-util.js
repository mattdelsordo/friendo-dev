/**
 * Saves friendo stats to local storage
 */

/* eslint-disable no-restricted-globals */

export const STORAGE_TOKEN = 'friendo'

export const load = () => {
  const saveGame = localStorage.getItem(STORAGE_TOKEN)
  return saveGame
}

export const save = (friendoJSON) => {
  /* eslint-disable-next-line no-console */
  console.log(`Saving ${friendoJSON}`)
  localStorage.setItem(STORAGE_TOKEN, friendoJSON)
}

// hard-reloads the webpage to clear the cache
export const reload = () => location.reload(true)

// deletes the friendo saved in local storage
export const erase = () => localStorage.removeItem(STORAGE_TOKEN)
