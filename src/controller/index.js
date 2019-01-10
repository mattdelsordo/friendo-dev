import $ from 'jquery'
import Tether from 'tether'
import { load, save } from '../game/game-util'
import getZodiac from '../friendo/horoscope/get-zodiac'
import { TOTAL_EVENT_CHANCE } from '../friendo/constants'
import { TICKRATE } from '../game/game-config'
import Friendo from '../friendo/friendo'

import { creatorSetup, showCreator } from './char-creator'

window.jQuery = $
window.Tether = Tether

require('bootstrap')

$(document)
  .ready(() => {
    const canvas = document.getElementById('canvas')
    const context = canvas.getContext('2d')

    // define store of game state
    let friendo

    // set up UI listeners
    creatorSetup((newFriendo) => {
      friendo = newFriendo
    })

    const savegame = load()
    // show creator if no savegame
    if (!savegame) showCreator()
    else {
      // else, initialize game
      friendo = new Friendo(savegame)
    }
  })
