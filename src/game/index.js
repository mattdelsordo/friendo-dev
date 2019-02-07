import $ from 'jquery'
import Tether from 'tether'
import { load, save } from './game-util'
import { TICKRATE } from './game-config'
import Friendo from '../friendo/friendo'

import header, { updateDelete } from './setup/header-listeners'
import creatorSetup, { showCreator, hideCreator } from './setup/char-creator-listeners'
import { initialize, performAction } from './setup/ui-update'
import mainSetup from './setup/main-listeners'

import { ID as idleID } from '../friendo/state/idle/idle'
import { ID as eggID } from '../friendo/state/idle/egg'

window.jQuery = $
window.Tether = Tether

require('bootstrap')

// initializes UI based on friendo and starts game processes
const start = (friendo) => {
  updateDelete(friendo)
  mainSetup(friendo)
  initialize(friendo)

  // connect friendo to canvas in order to draw it
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')
  setInterval(() => {
    context.save() // save and restore context to prevent colors from getting donged up
    context.clearRect(0, 0, canvas.width, canvas.height)
    friendo.draw(canvas, context)
    context.restore()
  }, TICKRATE)

  // resume an exercise if applicable
  if (!(friendo.state.id === idleID || friendo.state.id === eggID)) {
    performAction(friendo, friendo.state.id, friendo.state.getReps())
  }
}

$(document)
  .ready(() => {
    // define store of game state
    let friendo

    // set header listeners
    header()

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
      hideCreator()
    }
  })
