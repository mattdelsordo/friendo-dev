/**
 * Functions for updating the UI
 */

import $ from 'jquery'
import { saveFriendo } from '../game-util'
import {
  EMPTY_STAR,
  FULL_STAR,
  STAT_STAGES,
  STATS,
  FOODS,
  FLAG_NEW_FOOD_ALERT,
} from '../../friendo/constants'
import {
  MAX_EGG_LEVEL,
  STAT_MAX,
} from '../../friendo/balance'
import Exert from '../../friendo/state/exert/exert'
import { HEARTRATE } from '../game-config'
import {
  ENERGY_TUT_CONTENT,
  ENERGY_TUT_TITLE,
  HUNGER_TUT_TITLE,
  HUNGER_TUT_CONTENT,
  ENERGY_EXPLAIN_CONTENT,
  ENERGY_EXPLAIN_TITLE,
  HUNGER_EXPLAIN_CONTENT,
  HUNGER_EXPLAIN_TITLE, STAT_EXPLAIN,
} from '../../friendo/phrases/game-text'

export const setName = (name) => {
  $('#name-display').html(name)
}

export const setLevel = (level) => {
  $('#level-display').html(level.toString().padEnd(4))
}

export const setZodiac = (zodiac, color = 'black') => {
  $('#zodiac-display')
    .attr('src', `./img/emoji/${zodiac.symbol}.png`)
    .popover({ content: '???', trigger: 'hover focus', offset: '0, 2' })

  // separately set content so that the popover will be updated every time this function
  if (zodiac.sign !== 'Egg') {
    $('#zodiac-display')
      .css('border-color', color)
      .data('bs.popover').config.content = zodiac.toString()
    // determine if birthday and show it
    if (zodiac.isBirthday()) {
      $('#zodiac-display')
        .addClass('z-birthday')
    }
  }
}

// set string to status
const updateStatus = (status) => {
  $('#status-display').html(status)
}

// set remaining time based on reps
const updateTimer = (reps) => {
  if (reps < 0) reps = 0

  const hours = Math.floor(reps / 3600)
  const mins = Math.floor((reps - (hours * 3600)) / 60)
  const secs = reps - (hours * 3600) - (mins * 60)

  let string = `${secs}`.padStart(2, '0')
  string = `${mins}:${string}`.padStart(5, '0')
  if (hours > 0) {
    string = `${hours}:${string}`
  }

  $('#exercise-timer').html(string)
}

export const hideTimer = () => {
  $('#exercise-timer').css('visibility', 'hidden')
  $('#cancel-exercise').css('visibility', 'hidden')
}

export const showTimer = () => {
  $('#exercise-timer').css('visibility', 'visible')
  $('#cancel-exercise').css('visibility', 'visible')
}

// sets and triggers tutorial content
const showTrainingTutorial = () => {
  $('#egg-display')
    .popover({
      trigger: 'manual',
      content: 'Click on a stat to train your Friendo.',
      title: 'Click me!',
      offset: '0, 2',
    })
    .click(() => {
      $('#egg-display').popover('hide')
    })

  $('#egg-display').popover('show')
}

// handles popups that teach the user about energy and hunger
const showEnergyTutorial = () => {
  $('#max-energy-emoji').data('bs.popover').config.content = ENERGY_TUT_CONTENT
  $('#max-energy-emoji').data('bs.popover').config.title = ENERGY_TUT_TITLE
  $('#empty-belly-emoji').data('bs.popover').config.content = HUNGER_TUT_CONTENT
  $('#empty-belly-emoji').data('bs.popover').config.title = HUNGER_TUT_TITLE

  $('#max-energy-emoji').popover('show')
  $('#empty-belly-emoji').popover('show')

  // hide popovers when hovered over
  $('.popover').hover(() => {}, function hidePopovers() {
    $(this).popover('hide')
  })

  setTimeout(() => {
    $('#max-energy-emoji').popover('hide')
    $('#empty-belly-emoji').popover('hide')

    $('#max-energy-emoji').data('bs.popover').config.content = ENERGY_EXPLAIN_CONTENT
    $('#max-energy-emoji').data('bs.popover').config.title = ENERGY_EXPLAIN_TITLE
    $('#empty-belly-emoji').data('bs.popover').config.content = HUNGER_EXPLAIN_CONTENT
    $('#empty-belly-emoji').data('bs.popover').config.title = HUNGER_EXPLAIN_TITLE
  }, 20000)
}

const showNewFoodAvailable = () => {
  $('#food-selector').popover('show')
}

const setPageTitle = (name, emoji) => {
  $(document).prop('title', `Friendo \u{00b7} ${name} ${emoji}`)
}

/**
 * Updates the lvl and stat stars fields
 * @param stat - stat bar to update
 * @param lvl - lvl to set to
 * @param stage - number of stages completed
 */
const setLevelAndStars = (stat, lvl, stage) => {
  // check whether stat actually exists (sleep etc. edge case)
  if (!(stat in STAT_STAGES)) return

  // total amount of stars == the number of stages
  const totalStars = STAT_STAGES[stat].length

  // fill string with stars if the stat has more than one stage
  let starString = ''
  const empty = totalStars - stage
  if (totalStars > 1) {
    starString = FULL_STAR.repeat(stage) + EMPTY_STAR.repeat(empty)
  }

  $(`#${stat}-num`).html(lvl)
  $(`#${stat}-stars`).html(starString)
  // turn stars gold if theyre maxed out
  if (empty === 0) $(`#${stat}-stars`).css('color', 'gold')
}

/**
 * Updates a stat display bar
 * @param stat - id of the stat
 * @param exp - % exp to next level (0.0-0.1)
 * @param lvl - current stat level
 */
export const setStat = (stat, exp, lvl, stage) => {
  const percent = Math.floor(exp * 100)
  // special case if stat is maxed out
  if ((stat === STATS.EGG && lvl === MAX_EGG_LEVEL) || lvl === STAT_MAX) {
    $(`#${stat}-prog`)
      .css('width', '100%')
      .removeClass('bg-info')
      .addClass('bg-success')
    $(`#${stat}-prog`).css('background-color', '#28a745 !important')
    setLevelAndStars(stat, lvl, stage)
  } else if (($(`#${stat}-prog`).data('lastVal') || 0) > percent) {
    // if this value is LESS than the last value, do special animation
    // this is necessary to circumvent the stuff bootstrap has by default
    $(`#${stat}-prog`).css('width', '100%')
    setTimeout(() => {
      setLevelAndStars(stat, lvl, stage)
      $(`#${stat}-num`).addClass('lvlup')
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
    setLevelAndStars(stat, lvl, stage)
  }

  $(`#${stat}-prog`).data('lastVal', percent)
}
export const setAllStats = (friendo) => {
  /* eslint-disable-next-line compat/compat */
  Object.values(STATS).forEach((s) => {
    setStat(s, friendo.getExpPercent(s), friendo.getStat(s), friendo.getStatStage(s))
  })
}

/**
 * Updates energy bar
 * @param energy - % energy friendo has left
 */
export const setEnergy = (energy) => {
  $('#energybar').css('width', `${Math.floor(energy * 100)}%`)
}

export const setBelly = (belly) => {
  if (belly >= 0.5) {
    $('#hungerbar').css('background-color', 'var(--success)')
  } else if (belly >= 0.2) {
    $('#hungerbar').css('background-color', 'var(--warning)')
  } else {
    $('#hungerbar').css('background-color', 'var(--danger)')
  }
  $('#hungerbar').css('width', `${Math.floor(belly * 100)}%`)
}

export const setFoodPref = (pref) => {
  $('#food-pref').attr('src', `./img/emoji/${FOODS[pref].emoji}.png`)
}

// enables all food options of lower value than the stage
const setAvailableFood = (stage) => {
  for (let i = 0; i < stage; i += 1) {
    $(`#food-${i}`).css('display', 'block')
  }
}

// enable/disable all friendo interaction buttons to prevent the
// player from breaking the entire game state
export const enableButtons = () => {
  $('#pet-button').prop('disabled', '')
  $('#feed-button').prop('disabled', '')
  $('#food-selector').prop('disabled', '')
  /* eslint-disable-next-line compat/compat */
  Object.values(STATS).forEach((s) => {
    $(`#start-${s}`).prop('disabled', '')
  })
}
export const disableButtons = () => {
  $('#pet-button').prop('disabled', 'disabled')
  $('#feed-button').prop('disabled', 'disabled')
  $('#food-selector').prop('disabled', 'disabled')
  /* eslint-disable-next-line compat/compat */
  Object.values(STATS).forEach((s) => {
    $(`#start-${s}`).prop('disabled', 'disabled')
  })
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
  setPageTitle(friendo.name, friendo.state.emoji)
  setName(friendo.name)
  setLevel(friendo.level)
  setZodiac(friendo.zodiac, friendo.element.strokeStyle)
  setAllStats(friendo)
  setEnergy(friendo.getEnergyPercent())
  setBelly(friendo.getBellyPercent())
  updateStatus(friendo.state.verb)
  updateTimer(friendo.state.reps)
  setAvailableFood(friendo.getStatStage(STATS.TASTE))
  setFoodPref(friendo.foodPref)

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

  // show tutorial if egg level is less than 3
  if (friendo.getStat(STATS.CORE) === 0 && friendo.getStat(STATS.EGG) < 3) showTrainingTutorial()
  // show energy tutorial if no stat has levelled up
  if (friendo.getStat(STATS.CORE) > 0 && friendo.getStatSum() === 1) showEnergyTutorial()

  // if new meal alert flag is set then show the new meal alert
  if (friendo.getGameFlag(FLAG_NEW_FOOD_ALERT)) showNewFoodAvailable()

  // start daily event timer
  daily(friendo)

  // update state-specific stuff
  if (!friendo.state.isIdle) {
    disableButtons()
  }
  if (friendo.state instanceof Exert) {
    showTimer()
  } else {
    hideTimer()
  }
}

// checks whether or not a new stat has been unlocked and
// updates the UI accordingly
const updateStatVisibility = (friendo, stat) => {
  if (friendo.getStat(stat) >= 1) $(`#${stat}-bar`).css('visibility', 'visible')
}
// // not useful now, may be useful later
// const updateAllStatVisibility = (friendo) => {
//   Object.values(STATS).forEach((s) => {
//     updateStatVisibility(friendo, s)
//   })
// }

const hideEggDisplay = (friendo) => {
  // show hidden content
  $('#egg-display').css('display', 'none')
  $('#stat-display').css('display', 'block')
  $('#energy-zone').css('visibility', 'visible')
  setAllStats(friendo)
}

// update these elements every lifetime tick
export const onHeartbeat = (friendo, stat, updatebar = true) => {
  // update energy bar
  setEnergy(friendo.getEnergyPercent())
  setBelly(friendo.getBellyPercent())
  updateTimer(friendo.state.reps)

  // we need to be able to untoggle this to prevent breaking the
  // progress bar animation
  if (stat && updatebar) {
    // update stat displays
    setStat(stat, friendo.getExpPercent(stat), friendo.getStat(stat), friendo.getStatStage(stat))
    $(`#${stat}-icon`).data('bs.popover').config.content = STAT_EXPLAIN[stat](friendo)
  }

  // update level
  setLevel(friendo.level)
}

// stuff to update when the friendo hatches!
export const onHatch = (friendo) => {
  setZodiac(friendo.zodiac, friendo.element.strokeStyle)
  hideEggDisplay(friendo)
}

// stuff to do when friendo changes state
export const onStateChange = (friendo) => {
  updateStatus(friendo.state.verb)
  setPageTitle(friendo.name, friendo.state.emoji)

  // handle enabling/disabling buttons based on the state
  if (friendo.state.isIdle) {
    enableButtons()
  } else {
    disableButtons()
  }

  // if exercising, show timer
  if (friendo.state instanceof Exert) {
    updateTimer(friendo.state.reps)
    showTimer()
  } else {
    // wait a second to hide timer
    setTimeout(hideTimer, HEARTRATE / 2)
  }
  saveFriendo(friendo)
}

// makes a previously invisible stat field visible
export const onStatUnlocked = (friendo, stat) => {
  setStat(stat, friendo.getExpPercent(stat), friendo.getStat(stat), friendo.getStatStage(stat))
  updateStatVisibility(friendo, stat)
}

export const onStatStageIncrease = (friendo, stat) => {
  if (stat === STATS.TASTE) {
    // when taste increases, update available foods and add a tooltip
    setAvailableFood(friendo.getStatStage[STATS.TASTE])
    showNewFoodAvailable()
    friendo.setGameFlag(FLAG_NEW_FOOD_ALERT, true)
  }
}

// send message to friendo to change state
// if the friendo can transition (returns true),
// disable buttons (friendo will already have changed state)
export const performAction = (friendo, action, reps = 1) => {
  // this function used to do more shit
  friendo.handleAction(action, reps)
}
