import $ from 'jquery'
import Tether from 'tether'

import { save, load } from '../util'
import { STATS } from '../friendo/constants'
import Friendo from '../friendo/friendo'
import { toggleHookMarkers } from '../art-util'
import { TICKRATE } from './config'

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
    const friendo = new Friendo(context, savegame)

    /**
     * TEST-SLIDER LISTENERS
     * Each slider should update the indicator with its value,
     * update the corresponding stat in the game state,
     * and save the game on a change event (when user lifts mouse)
     */
    $('#core-range')
      .on({
        input: () => {
          $('#core-num')
            .html(this.value)
        },
        change: () => {
          $('#core-num')
            .html(this.value)
          friendo.setStat(STATS.CORE, this.value)
          save(JSON.stringify(friendo))
        },
      })
    $('#arms-range')
      .on({
        input: () => {
          $('#arms-num')
            .html(this.value)
        },
        change: () => {
          $('#arms-num')
            .html(this.value)
          friendo.setStat(STATS.ARM, this.value)
          save(JSON.stringify(friendo))
        },
      })
    $('#legs-range')
      .on({
        input: () => {
          $('#legs-num')
            .html(this.value)
        },
        change: () => {
          $('#legs-num')
            .html(this.value)
          friendo.setStat(STATS.LEG, this.value)
          save(JSON.stringify(friendo))
        },
      })
    $('#sight-range')
      .on({
        input: () => {
          $('#sight-num')
            .html(this.value)
        },
        change: () => {
          $('#sight-num')
            .html(this.value)
          friendo.setStat(STATS.SIGHT, this.value)
          save(JSON.stringify(friendo))
        },
      })
    $('#hair-range')
      .on({
        input: () => {
          $('#hair-num')
            .html(this.value)
        },
        change: () => {
          $('#hair-num')
            .html(this.value)
          friendo.setStat(STATS.HAIR, this.value)
          save(JSON.stringify(friendo))
        },
      })
    $('#taste-range')
      .on({
        input: () => {
          $('#taste-num')
            .html(this.value)
        },
        change: () => {
          $('#taste-num')
            .html(this.value)
          friendo.setStat(STATS.TASTE, this.value)
          save(JSON.stringify(friendo))
        },
      })
    $('#dog-range')
      .on({
        input: () => {
          $('#dog-num')
            .html(this.value)
        },
        change: () => {
          $('#dog-num')
            .html(this.value)
          friendo.setStat(STATS.DOG, this.value)
          save(JSON.stringify(friendo))
        },
      })
    $('#meme-range')
      .on({
        input: () => {
          $('#meme-num')
            .html(this.value)
        },
        change: () => {
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
      .focusout(function () {
        const content = this.value.trim()
        if (content) {
          friendo.name = content
          save(JSON.stringify(friendo))
        }
      })
    $('#owner-name')
      .focusout(function () {
        const content = this.value.trim()
        if (content) {
          friendo.owner = content
          save(JSON.stringify(friendo))
        }
      })

    // handle element togglers
    $('#element-picker input[element=radio]')
      .change(function () {
        friendo.setElement(this.value)
        save(JSON.stringify(friendo))
      })

    // display current stat values
    $('#core-range')
      .val(friendo.stats[STATS.CORE])
    $('#core-num')
      .html(friendo.stats[STATS.CORE])

    $('#legs-range')
      .val(friendo.stats[STATS.LEG])
    $('#legs-num')
      .html(friendo.stats[STATS.LEG])

    $('#arms-range')
      .val(friendo.stats[STATS.ARM])
    $('#arms-num')
      .html(friendo.stats[STATS.ARM])

    $('#sight-range')
      .val(friendo.stats[STATS.SIGHT])
    $('#sight-num')
      .html(friendo.stats[STATS.SIGHT])

    $('#hair-range')
      .val(friendo.stats[STATS.HAIR])
    $('#hair-num')
      .html(friendo.stats[STATS.HAIR])

    $('#taste-range')
      .val(friendo.stats[STATS.TASTE])
    $('#taste-num')
      .html(friendo.stats[STATS.TASTE])

    $('#dog-range')
      .val(friendo.stats[STATS.DOG])
    $('#dog-num')
      .html(friendo.stats[STATS.DOG])

    $('#meme-range')
      .val(friendo.stats[STATS.MEME])
    $('#meme-num')
      .html(friendo.stats[STATS.MEME])

    // set names and element to defaults regardless of saved data
    $('#owner-name')
      .val(friendo.owner)
    $('#friendo-name')
      .val(friendo.name)
    $(`#type-picker input[type=radio][value='${friendo.element}']`)
      .prop('checked', true)

    // draw game to the screen at some interval
    setInterval(() => {
      context.save() // save and restore context to prevent colors from getting donged up
      context.clearRect(0, 0, canvas.width, canvas.height)
      friendo.draw()
      context.restore()
    }, TICKRATE)
  })
