/**
 * Saves friendo stats to local storage
 */

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
