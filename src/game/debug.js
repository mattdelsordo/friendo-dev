import $ from 'jquery'
import Tether from 'tether'

import { saveFriendo, loadFriendoJSON } from './game-util'
import { STATS, TOTAL_EVENT_CHANCE, FOODS } from '../friendo/constants'
import { setFoodPref } from './setup/ui-update'
import Friendo from '../friendo/friendo'
// import { toggleHookMarkers } from '../friendo/art/art-util'
import { FRAMERATE } from './game-config'

/**
 * Contains code to interface the user display with the friendo code.
 */

window.jQuery = $
window.Tether = Tether

require('bootstrap')

// bookmark stat list for reuse, might want to put this somewhere else but
const STAT_LIST = ['core', 'leg', 'arm', 'sight', 'hair', 'taste', 'dog', 'meme', 'egg']

// dont know what to do with this
// const hookMarkerListeners = (friendo) => {
//   // handle hook marker toggle
//   $('#hook-marker-toggle')
//     .change(toggleHookMarkers)
// }

/**
 * TEST-SLIDER LISTENERS
 * Each slider should update the indicator with its value,
 * update the corresponding stat in the game state,
 * and save the game on a change event (when user lifts mouse)
 */
const statSliderListeners = (friendo) => {
  STAT_LIST.forEach((stat) => {
    $(`#${stat}-range`).on({
      input() {
        // only update the stat in question on input
        $(`#${stat}-num`).html(this.value)
      },
      change() {
        // when user stops interacting, save and update all stats
        friendo.setStat(STATS[stat.toUpperCase()], this.value)
        saveFriendo(friendo)

        STAT_LIST.forEach((s) => {
          $(`#${s}-range`).val(friendo.getStat(STATS[s.toUpperCase()]))
          $(`#${s}-num`).html(friendo.getStat(STATS[s.toUpperCase()]))
        })
      },
    })
  })

  // update level on stat change
  $('#stat-sliders input').change(() => {
    $('#level-display').html(` ${friendo.level}`)
    /* eslint-disable-next-line no-restricted-globals */
    if (isNaN(friendo.level)) {
      $('#level-display').css('color', 'gold')
    } else {
      $('#level-display').css('color', 'black')
    }
  })
}

/**
 * Friendo and owner name input listeners
 */
const nameInputListeners = (friendo) => {
  ['name', 'parent'].forEach((s) => {
    $(`#${s}-input`)
      .focusout(function setFriendoName() {
        const content = this.value.trim()
        if (content && content !== friendo[s]) {
          friendo[s] = content
          saveFriendo(friendo)
        }
      })
      .on('keypress', function setFriendoNameE(e) {
        if (e.which === 13) {
          const content = this.value.trim()
          if (content && content !== friendo[s]) {
            friendo[s] = content
            saveFriendo(friendo)
          }
        }
      })
  })
}

/**
 * Element-picker
 */
const typeSelectorListeners = (friendo) => {
  $('#type-picker input[type=radio]')
    // Note: changing this to an arrow function leads to the 'this'
    // in it being undefined
    .change(function setElement() {
      friendo.setElement(this.value)
      $('#zodiac-display').css('border-color', friendo.element.strokeStyle)
      saveFriendo(friendo)
    })

  $(`#type-picker label[for*=${friendo.element.id}]`).addClass('active')
}

/**
 * Birthday and zodiac sign controllers
 */
const birthdayListeners = (friendo) => {
  $('#zodiac-display')
    .css('border-color', friendo.element.strokeStyle)
    .attr('src', `img/emoji/${friendo.zodiac.symbol}.png`)
    .popover({ content: '???', trigger: 'hover focus', offset: '0, 2' })

  $('#birthday-calendar')
    .change(function setBirthday() {
      // UI element counts days from 0?????? 1 must be added
      const date = new Date(this.value)
      date.setDate(date.getDate() + 1)
      friendo.setBirthday(date)
      saveFriendo(friendo)

      // separately set content so that the popover will be updated every time this function
      if (friendo.zodiac.sign !== 'Egg') {
        $('#zodiac-display')
          .attr('src', `img/emoji/${friendo.zodiac.symbol}.png`)
          .data('bs.popover').config.content = friendo.zodiac.toString()

        // determine if birthday and show it
        if (friendo.zodiac.isBirthday()) {
          $('#zodiac-display')
            .addClass('z-birthday')
        }
      }
    })

  // separately set content so that the popover will be updated every time this function
  if (friendo.zodiac.sign !== 'Egg') {
    $('#zodiac-display')
      .css('border-color', friendo.element.strokeStyle)
      .data('bs.popover').config.content = friendo.zodiac.toString()
    // determine if birthday and show it
    if (friendo.zodiac.isBirthday()) {
      $('#zodiac-display')
        .addClass('z-birthday')
    }
  }
}

/**
 * Listeners that affect blink and speech rate
 */
const rateListeners = (friendo) => {
  $('#blink-rate')
    .on({
      input() {
        $('#blink-rate-indicator').html(`${this.value}/${TOTAL_EVENT_CHANCE}`)
      },
      change() {
        $('#blink-rate-indicator').html(`${this.value}/${TOTAL_EVENT_CHANCE}`)
        friendo.state.blinkRate = this.value
        saveFriendo(friendo)
      },
    })


  $('#speak-rate')
    .on({
      input() {
        $('#speak-rate-indicator').html(`${this.value}/${TOTAL_EVENT_CHANCE}`)
      },
      change() {
        $('#speak-rate-indicator').html(`${this.value}/${TOTAL_EVENT_CHANCE}`)
        friendo.state.speakRate = this.value
        saveFriendo(friendo)
      },
    })
}

/**
 * Listeners for the state toggler
 * Note: changing this to an arrow function leads to the 'this' in it being undefined
 */
const stateListeners = (friendo) => {
  $('#state-picker input[type=radio]')
    .change(function setState() {
      if (this.value === 'state_feed') {
        friendo.setState(this.value, friendo.foodPref)
      } else {
        friendo.setState(this.value, -1)
      }
      saveFriendo(friendo)
    })

  friendo.setOnFoodPrefChange((pref) => {
    setFoodPref(pref)
    saveFriendo(friendo)
  })

  FOODS.forEach((s, i) => {
    $(`#food-${i}`).click(() => {
      friendo.setFoodPref(i)
    })
  })
}

/**
 * Initializes all UI elements
 */
const initialize = (friendo) => {
  // level and stat displays
  $('#level-display').html(` ${friendo.level}`)
  STAT_LIST.forEach((s) => {
    $(`#${s}-range`).val(friendo.getStat(STATS[s.toUpperCase()]))
    $(`#${s}-num`).html(friendo.getStat(STATS[s.toUpperCase()]))
  })

  $('#parent-input').val(friendo.owner)
  $('#name-input').val(friendo.name)

  $(`#type-picker input[type=radio][value='${friendo.element.toString()}']`)
    .prop('checked', true)

  $('#blink-rate').val(friendo.state.blinkRate)
  $('#speak-rate').val(friendo.state.speakRate)
  $('#blink-rate-indicator').html(`${friendo.state.blinkRate}/${TOTAL_EVENT_CHANCE}`)
  $('#speak-rate-indicator').html(`${friendo.state.speakRate}/${TOTAL_EVENT_CHANCE}`)

  $(`#state-picker label[for*=${friendo.state.id}]`).addClass('active')
  setFoodPref(friendo.foodPref)
}

$(document)
  .ready(() => {
    // load last state of debug page
    let friendo

    // load the game
    const savegame = loadFriendoJSON()
    if (!savegame) friendo = new Friendo()
    else friendo = new Friendo(savegame)

    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')
    setInterval(() => {
      context.save() // save and restore context to prevent colors from getting donged up
      context.clearRect(0, 0, canvas.width, canvas.height)
      friendo.draw(canvas, context)
      context.restore()
    }, FRAMERATE)

    // set up correct listeners
    statSliderListeners(friendo)
    nameInputListeners(friendo)
    typeSelectorListeners(friendo)
    birthdayListeners(friendo)
    rateListeners(friendo)
    stateListeners(friendo)

    // initialize the UI
    initialize(friendo)
  })
