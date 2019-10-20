import $ from 'jquery'
import Tether from 'tether'
import { loadFriendoJSON, saveFriendo, setNewSaveTimer } from './game-util'
import { FRAMERATE, HEARTRATE } from './game-config'
import Friendo from '../friendo/friendo'

import canvasListeners from './setup/canvas-listeners'
import header, { updateDelete } from './setup/header-listeners'
import creatorSetup, { showCreator, hideCreator } from './setup/char-creator-listeners'
import {
  disableButtons,
  initialize,
  onHatch,
  onHeartbeat,
  onStateChange, onStatUnlocked,
} from './setup/ui-update'
import mainSetup from './setup/main-listeners'

window.jQuery = $
window.Tether = Tether

require('bootstrap')

// initializes UI based on friendo and starts game processes
const start = (friendo) => {
  updateDelete(friendo)
  mainSetup(friendo)
  initialize(friendo)
  canvasListeners()

  // connect friendo to canvas in order to draw it
  const canvas = document.getElementById('canvas')
  const context = canvas.getContext('2d')
  setInterval(() => {
    context.save() // save and restore context to prevent colors from getting donged up
    context.clearRect(0, 0, canvas.width, canvas.height)
    friendo.draw(canvas, context)
    context.restore()
  }, FRAMERATE)

  // set friendo listeners
  friendo.setOnHeartbeat(onHeartbeat)
  friendo.setOnHatch(onHatch)
  friendo.setOnStateChange(onStateChange)
  friendo.setOnStatUnlocked(onStatUnlocked)

  // start friendo's heart
  friendo.heartbeat()
  setInterval(() => {
    friendo.heartbeat()
  }, HEARTRATE)

  // if already in a non-idle state, disable buttons as we would if
  // triggering a new task
  if (!friendo.state.isIdle) {
    disableButtons()
  }

  // set timer for next save if none happens in the interim
  setNewSaveTimer(friendo)
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
      saveFriendo(friendo)
      start(friendo)
    })

    // initialize friendo
    const savegame = loadFriendoJSON()
    // show creator if no savegame
    if (!savegame) showCreator()
    else {
      // else, initialize game
      friendo = new Friendo(savegame)
      start(friendo)
      hideCreator()
    }
  })
