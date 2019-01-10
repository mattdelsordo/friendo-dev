/**
 * Functions for updating the UI
 */

import $ from 'jquery'

export const setName = (name) => {
  $('#name-display').html(name)
}

export const setLevel = (level) => {
  $('#level-display').html(level.toString().padEnd(4))
}

export const setZodiac = (zodiac, color = 'black') => {
  $('#zodiac-display')
    .html(zodiac.symbol)
    .css('color', color)
    .popover({ content: '?', trigger: 'hover' })
  // separately set content so that the popover will be updated every time this function
  $('#zodiac-display')
    .data('bs.popover').config.content = `${zodiac.getAge()} old- born ${zodiac.birthday.toLocaleDateString()} (${zodiac.sign})`
}

/**
 * Updates a stat display bar
 * @param stat - id of the stat
 * @param exp - % exp to next level (0.0-0.1)
 * @param lvl - current stat level
 */
export const setStat = (stat, exp, lvl) => {
  $(`#${stat}-prog`).css('width', `${Math.floor(exp * 100)}%`)
  $(`#${stat}-num`).html(lvl.toString().padStart(4))
}
const setAllStats = (stats) => {
  Object.keys(stats).forEach((s) => {
    // TODO: Pass in current exp when that is implemented
    setStat(s, 0.1, stats[s])
  })
}

/**
 * Updates energy bar
 * @param energy - % energy friendo has left
 */
export const setEnergy = (energy) => {
  $('#energybar').css('width', `${Math.floor(energy * 100)}%`)
}

// bulk-set all UI elements from friendo
export const initialize = (friendo) => {
  console.log('Initializing game state...')
  setName(friendo.name)
  setLevel(friendo.level)
  setZodiac(friendo.zodiac)
  setAllStats(friendo._stats)
  setAllStats(friendo._h_stats)
  setEnergy(friendo.getEnergyLeft())
}
