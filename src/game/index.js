import $ from 'jquery'
import Tether from 'tether'

import { save, load } from './game-util'
import { STATS, TOTAL_EVENT_CHANCE } from '../friendo/constants'
import Friendo from '../friendo/friendo'
import { toggleHookMarkers } from '../art/art-util'
import { TICKRATE } from './game-config'

/**
 * Contains code to interface the user display with the friendo code.
 */

window.jQuery = $
window.Tether = Tether

require('bootstrap')

$(document)
  .ready(() => {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')

    // attempt to load friendo
    const savegame = load()
    const friendo = new Friendo(savegame)

    /**
     * TEST-SLIDER LISTENERS
     * Each slider should update the indicator with its value,
     * update the corresponding stat in the game state,
     * and save the game on a change event (when user lifts mouse)
     */
    $('#core-range')
      .on({
        input() {
          $('#core-num')
            .html(this.value)
        },
        change() {
          $('#core-num')
            .html(this.value)
          friendo.setStat(STATS.CORE, this.value)
          save(JSON.stringify(friendo))
        },
      })
    $('#arm-range')
      .on({
        input() {
          $('#arm-num')
            .html(this.value)
        },
        change() {
          $('#arm-num')
            .html(this.value)
          friendo.setStat(STATS.ARM, this.value)
          save(JSON.stringify(friendo))
        },
      })
    $('#leg-range')
      .on({
        input() {
          $('#leg-num')
            .html(this.value)
        },
        change() {
          $('#leg-num')
            .html(this.value)
          friendo.setStat(STATS.LEG, this.value)
          save(JSON.stringify(friendo))
        },
      })
    $('#sight-range')
      .on({
        input() {
          $('#sight-num')
            .html(this.value)
        },
        change() {
          $('#sight-num')
            .html(this.value)
          friendo.setStat(STATS.SIGHT, this.value)
          save(JSON.stringify(friendo))
        },
      })
    $('#hair-range')
      .on({
        input() {
          $('#hair-num')
            .html(this.value)
        },
        change() {
          $('#hair-num')
            .html(this.value)
          friendo.setStat(STATS.HAIR, this.value)
          save(JSON.stringify(friendo))
        },
      })
    $('#taste-range')
      .on({
        input() {
          $('#taste-num')
            .html(this.value)
        },
        change() {
          $('#taste-num')
            .html(this.value)
          friendo.setStat(STATS.TASTE, this.value)
          save(JSON.stringify(friendo))
        },
      })
    $('#dog-range')
      .on({
        input() {
          $('#dog-num')
            .html(this.value)
        },
        change() {
          $('#dog-num')
            .html(this.value)
          friendo.setStat(STATS.DOG, this.value)
          save(JSON.stringify(friendo))
        },
      })
    $('#meme-range')
      .on({
        input() {
          $('#meme-num')
            .html(this.value)
        },
        change() {
          $('#meme-num')
            .html(this.value)
          friendo.setStat(STATS.MEME, this.value)
          save(JSON.stringify(friendo))
        },
      })

    // handle hook marker toggle
    $('#hook-marker-toggle')
      .change(toggleHookMarkers)

    // name inputs
    $('#friendo-name')
      .focusout(function setFriendoName() {
        const content = this.value.trim()
        if (content && content !== friendo.name) {
          friendo.name = content
          save(JSON.stringify(friendo))
        }
      })
      .on('keypress', function setFriendoNameE(e) {
        if (e.which === 13) {
          const content = this.value.trim()
          if (content && content !== friendo.name) {
            friendo.name = content
            save(JSON.stringify(friendo))
          }
        }
      })
    $('#owner-name')
      .focusout(function setOwnerName() {
        const content = this.value.trim()
        if (content && content !== friendo.owner) {
          friendo.owner = content
          save(JSON.stringify(friendo))
        }
      })
      .on('keypress', function setOwnerNameE(e) {
        if (e.which === 13) {
          const content = this.value.trim()
          if (content && content !== friendo.owner) {
            friendo.owner = content
            save(JSON.stringify(friendo))
          }
        }
      })

    // handle element togglers
    $('#type-picker input[type=radio]')
      // Note: changing this to an arrow function leads to the 'this'
      // in it being undefined
      .change(function setElement() {
        friendo.setElement(this.value)
        save(JSON.stringify(friendo))
      })
    $(`#type-picker label[for*=${friendo.element.id}]`).addClass('active')

    // display current stat values
    $('#core-range')
      .val(friendo.getStat(STATS.CORE))
    $('#core-num')
      .html(friendo.getStat(STATS.CORE))

    $('#leg-range')
      .val(friendo.getStat(STATS.LEG))
    $('#leg-num')
      .html(friendo.getStat(STATS.LEG))

    $('#arm-range')
      .val(friendo.getStat(STATS.ARM))
    $('#arm-num')
      .html(friendo.getStat(STATS.ARM))

    $('#sight-range')
      .val(friendo.getStat(STATS.SIGHT))
    $('#sight-num')
      .html(friendo.getStat(STATS.SIGHT))

    $('#hair-range')
      .val(friendo.getStat(STATS.HAIR))
    $('#hair-num')
      .html(friendo.getStat(STATS.HAIR))

    $('#taste-range')
      .val(friendo.getStat(STATS.TASTE))
    $('#taste-num')
      .html(friendo.getStat(STATS.TASTE))

    $('#dog-range')
      .val(friendo.getStat(STATS.DOG))
    $('#dog-num')
      .html(friendo.getStat(STATS.DOG))

    $('#meme-range')
      .val(friendo.getStat(STATS.MEME))
    $('#meme-num')
      .html(friendo.getStat(STATS.MEME))

    // set names and element to defaults regardless of saved data
    $('#owner-name')
      .val(friendo.owner)
    $('#friendo-name')
      .val(friendo.name)
    $(`#type-picker input[type=radio][value='${friendo.element.toString()}']`)
      .prop('checked', true)

    // configure speaking and blinking rates
    $('#blink-rate')
      .val(friendo.state.blinkRate)
      .on({
        input() {
          $('#blink-rate-indicator').html(`${this.value}/${TOTAL_EVENT_CHANCE}`)
        },
        change() {
          $('#blink-rate-indicator').html(`${this.value}/${TOTAL_EVENT_CHANCE}`)
          friendo.state.blinkRate = this.value
          save(JSON.stringify(friendo))
        },
      })
    $('#blink-rate-indicator').html(`${friendo.state.blinkRate}/${TOTAL_EVENT_CHANCE}`)

    $('#speak-rate')
      .val(friendo.state.speakRate)
      .on({
        input() {
          $('#speak-rate-indicator').html(`${this.value}/${TOTAL_EVENT_CHANCE}`)
        },
        change() {
          $('#speak-rate-indicator').html(`${this.value}/${TOTAL_EVENT_CHANCE}`)
          friendo.state.speakRate = this.value
          save(JSON.stringify(friendo))
        },
      })
    $('#speak-rate-indicator').html(`${friendo.state.speakRate}/${TOTAL_EVENT_CHANCE}`)


    /**
     * State toggler listeners
     */
    $('#state-picker input[type=radio]')
    // Note: changing this to an arrow function leads to the 'this'
    // in it being undefined
      .change(function setState() {
        friendo.handleAction(this.value)
        save(JSON.stringify(friendo))
      })
    // load state
    $(`#state-picker label[for*=${friendo.state.id}]`).addClass('active')

    // draw game to the screen at some interval
    setInterval(() => {
      context.save() // save and restore context to prevent colors from getting donged up
      context.clearRect(0, 0, canvas.width, canvas.height)
      friendo.draw(canvas, context)
      context.restore()
    }, TICKRATE)
  })
