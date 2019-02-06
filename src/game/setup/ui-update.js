/**
 * Functions for updating the UI
 */

import $ from 'jquery'
import { save } from '../game-util'
import { MAX_EGG_LEVEL, STAT_MAX, STATS } from '../../friendo/constants'

export const setName = (name) => {
  $('#name-display').html(name)
}

export const setLevel = (level) => {
  $('#level-display').html(level.toString().padEnd(4))
}

export const setZodiac = (zodiac, color = 'black') => {
  $('#zodiac-display')
    .attr('src', `./img/emoji/${zodiac.symbol}.png`)
    .popover({ content: '???', trigger: 'hover' })

  // separately set content so that the popover will be updated every time this function
  if (zodiac.sign !== 'Egg') {
    $('#zodiac-display')
      .css('border-color', color)
      .data('bs.popover').config.content = `${zodiac.getAge()} old- born ${zodiac.birthday.toLocaleDateString()} (${zodiac.sign})`
    // determine if birthday and show it
    if (zodiac.isBirthday()) {
      $('#zodiac-display')
        .addClass('z-birthday')
    }
  }
}

// sets and triggers tutorial content
const showTutorial = () => {
  $('#egg-display')
    .popover({
      trigger: 'manual',
      content: 'Click on a stat to train your Friendo.',
      title: 'Click me!',
    })
    .click(() => {
      $('#egg-display').popover('hide')
    })

  $('#egg-display').popover('show')
}

/**
 * Updates a stat display bar
 * @param stat - id of the stat
 * @param exp - % exp to next level (0.0-0.1)
 * @param lvl - current stat level
 */
export const setStat = (stat, exp, lvl) => {
  const percent = Math.floor(exp * 100)
  // special case if stat is maxed out
  if ((stat === STATS.EGG && lvl === MAX_EGG_LEVEL) || lvl === STAT_MAX) {
    $(`#${stat}-prog`)
      .css('width', '100%')
      .removeClass('bg-info')
      .addClass('bg-success')
    $(`#${stat}-prog`).css('background-color', '#28a745 !important')
    $(`#${stat}-num`).html(lvl)
  } else if (($(`#${stat}-prog`).data('lastVal') || 0) > percent) {
    // if this value is LESS than the last value, do special animation
    // this is necessary to circumvent the stuff bootstrap has by default
    $(`#${stat}-prog`).css('width', '100%')
    setTimeout(() => {
      $(`#${stat}-num`)
        .html(lvl)
        .addClass('lvlup')
      $(`#${stat}-prog`)
        .css('visibility', 'hidden')

      setTimeout(() => {
        $(`#${stat}-prog`)
          .css('width', `${percent}%`)
        $(`#${stat}-num`).removeClass('lvlup')

        setTimeout(() => {
          $(`#${stat}-prog`)
            .css('visibility', 'visible')
        }, 600)
      }, 600)
    }, 700)
  } else {
    $(`#${stat}-prog`).css('width', `${percent}%`)
    $(`#${stat}-num`).html(lvl)
  }

  $(`#${stat}-prog`).data('lastVal', percent)
}
export const setAllStats = (friendo) => {
  Object.values(STATS).forEach((s) => {
    setStat(s, friendo.getExpPercent(s), friendo.getStat(s))
  })
}

/**
 * Updates energy bar
 * @param energy - % energy friendo has left
 */
export const setEnergy = (energy) => {
  $('#energybar').css('width', `${Math.floor(energy * 100)}%`)
}

// handle daily events for if someone plays continuously past midnight
const daily = (friendo) => {
  // get relative dates to calculate time until the next midnight
  const today = new Date()
  // number is the amount of MS in a day
  const tomorrow = new Date(today.getTime() + 86400000)
  tomorrow.setUTCMinutes(0)
  tomorrow.setUTCHours(0)
  tomorrow.setUTCSeconds(0)
  tomorrow.setUTCMilliseconds(0)
  setTimeout(() => {
    setZodiac(friendo.zodiac)

    daily(friendo)
  }, tomorrow.getTime() - today.getTime())
}

// bulk-set all UI elements from friendo
export const initialize = (friendo) => {
  setName(friendo.name)
  setLevel(friendo.level)
  setZodiac(friendo.zodiac, friendo.element.strokeStyle)
  setAllStats(friendo)
  setEnergy(friendo.getEnergyLeft())

  // show stats based on level
  // CORE=0 means we're still in the tutorial
  if (friendo.getStat(STATS.CORE) === 0) {
    $('#stat-display').css('display', 'none')
    $('#energy-zone').css('visibility', 'hidden')
    $('#egg-display').css('display', 'block')
  }
  // unlockable stats
  if (friendo.getStat(STATS.LEG) > 0) {
    $(`#${STATS.LEG}-bar`).css('visibility', 'visible')
  }
  if (friendo.getStat(STATS.ARM) > 0) {
    $(`#${STATS.ARM}-bar`).css('visibility', 'visible')
  }
  if (friendo.getStat(STATS.SIGHT) > 0) {
    $(`#${STATS.SIGHT}-bar`).css('visibility', 'visible')
  }
  if (friendo.getStat(STATS.HAIR) > 0) {
    $(`#${STATS.HAIR}-bar`).css('visibility', 'visible')
  }
  if (friendo.getStat(STATS.TASTE) > 0) {
    $(`#${STATS.TASTE}-bar`).css('visibility', 'visible')
  }
  if (friendo.getStat(STATS.DOG) > 0) {
    $(`#${STATS.DOG}-bar`).css('visibility', 'visible')
  }

  // show tutorial if egg level is 0
  if (friendo.getStat(STATS.EGG) === 1) showTutorial()

  // start daily event timer
  daily(friendo)
}

// enable/disable all friendo interaction buttons to prevent the
// player from breaking the entire game state
export const enableButtons = () => {
  $('#pet-button').prop('disabled', '')
  $('#feed-button').prop('disabled', '')
  Object.values(STATS).forEach((s) => {
    $(`#start-${s}`).prop('disabled', '')
  })
}
export const disableButtons = () => {
  $('#pet-button').prop('disabled', 'disabled')
  $('#feed-button').prop('disabled', 'disabled')
  Object.values(STATS).forEach((s) => {
    $(`#start-${s}`).prop('disabled', 'disabled')
  })
}

// checks whether or not a new stat has been unlocked and
// updates the UI accordingly
const updateStatVisibility = (friendo) => {
  Object.values(STATS).forEach((s) => {
    if (friendo.getStat(s) >= 1) $(`#${s}-bar`).css('visibility', 'visible')
  })
}

const hideEggDisplay = (friendo) => {
  // show hidden content
  $('#egg-display').css('display', 'none')
  $('#stat-display').css('display', 'block')
  $('#energy-zone').css('visibility', 'visible')
  setAllStats(friendo)
}

// generalized action peforming routine for the buttons
export const performAction = (friendo, action, reps = 1) => {
  disableButtons()
  friendo.startExercise(
    action,
    reps,
    // function to call on every rep
    (f, updatebar = true) => {
      // save
      save(JSON.stringify(f))
      // update energy bar
      setEnergy(f.getEnergyLeft())
      // check to see if any stat can be made visible
      updateStatVisibility(f)

      // we need to be able to untoggle this to prevent breaking the
      // progress bar animation
      if (updatebar) {
        // update stat displays
        const stat = action.split('_')[1] || ''
        setStat(stat, f.getExpPercent(stat), f.getStat(stat))
      }

      // update level
      setLevel(friendo.level)
    },
    // function to call at end
    () => {
      enableButtons()

      // check whether incubation tutorial is over
      if (friendo.getStat(STATS.EGG) === MAX_EGG_LEVEL) {
        setZodiac(friendo.zodiac, friendo.element.strokeStyle)
        hideEggDisplay(friendo)
      }
    },
  )
}
