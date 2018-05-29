/**
 * Saves friendo stats to local storage
 */

export const STORAGE_TOKEN = 'friendo'
export const load = () => {
  const saveGame = localStorage.getItem(STORAGE_TOKEN)
  // console.log(`Loaded ${saveGame}`)
  return saveGame
}
export const save = (friendoJSON) => {
  console.log(`Saving ${friendoJSON}`)
  localStorage.setItem(STORAGE_TOKEN, friendoJSON)
}
