import $ from 'jquery'
import Tether from 'tether'
import { load, save } from '../game/game-util'
import { TICKRATE } from '../game/game-config'
import Friendo from '../friendo/friendo'

import creatorSetup, { showCreator } from './char-creator-listeners'
import { initialize } from './ui-update'
import mainSetup from './main-listeners'

window.jQuery = $
window.Tether = Tether

require('bootstrap')

// initializes UI based on friendo and starts game processes
const start = (friendo) => {
  mainSetup(friendo)
  initialize(friendo)

  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')
  setInterval(() => {
    context.save() // save and restore context to prevent colors from getting donged up
    context.clearRect(0, 0, canvas.width, canvas.height)
    friendo.draw(canvas, context)
    context.restore()
  }, TICKRATE)
}

$(document)
  .ready(() => {
    // define store of game state
    let friendo

    // set up UI listeners
    creatorSetup((newFriendo) => {
      friendo = newFriendo
      save(JSON.stringify(friendo))
      start(friendo)
    })

    // initialize friendo
    const savegame = load()
    // show creator if no savegame
    if (!savegame) showCreator()
    else {
      // else, initialize game
      friendo = new Friendo(savegame)
      start(friendo)
    }
  })
