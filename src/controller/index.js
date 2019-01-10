import $ from 'jquery'
import Tether from 'tether'
import { load, save } from '../game/game-util'
import getZodiac from '../friendo/horoscope/get-zodiac'
import { TOTAL_EVENT_CHANCE } from '../friendo/constants'
import { TICKRATE } from '../game/game-config'
import Friendo from '../friendo/friendo'
import { toggleHookMarkers } from '../art/art-util'

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
  })
