import $ from 'jquery'
import Tether from 'tether'
import { loadFriendoJSON, saveFriendo } from './game-util'
import { FRAMERATE, HEARTRATE, SAVE_INTERVAL } from './game-config'
import Friendo from '../friendo/friendo'

import canvasListeners from './setup/canvas-listeners'
import header, { updateDelete, updateDownload } from './setup/header-listeners'
import creatorSetup, { showCreator, hideCreator } from './setup/char-creator-listeners'
import {
  disableButtons,
  initialize,
  onHatch,
  onHeartbeat,
  onStateChange,
  onStatUnlocked,
  setFoodPref,
  onStatStageUp,
  setBgPref,
} from './setup/ui-update'
import mainSetup from './setup/main-listeners'
import { initializeKeyListeners, unsetEnterButton } from './setup/key-listeners'

window.jQuery = $
window.Tether = Tether

require('bootstrap')

// initializes UI based on friendo and starts game processes
const start = (friendo) => {
  unsetEnterButton() // call this to remove the listener from the character creation page
  updateDelete(friendo)
  updateDownload(friendo)
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
  friendo.setOnFoodPrefChange(setFoodPref)
  friendo.setOnStatStageUp(onStatStageUp)
  friendo.setOnBgChange(setBgPref)

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

  // save every 5(?) minutes
  setInterval(() => {
    saveFriendo(JSON.stringify(friendo))
  }, SAVE_INTERVAL)
}

// Register the service worker that gets compiled to /sw.js
// disable select eslint rules because we want logging and
// already did the compatibility check
/* eslint-disable compat/compat, no-console */
const registerServiceWorker = () => {
    // register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((reg) => {
        console.log('[ServiceWorker] Registration successful in ', reg.scope)
      }, (err) => {
        console.log('[ServiceWorker] Failed to register: ', err)
      })
    }
}
/* eslint-enable compat/compat, no-console */

$(document)
  .ready(() => {
    registerServiceWorker()

    // define store of game state
    let friendo

    // set header listeners
    header()

    // set up enter-button
    initializeKeyListeners()

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

      // advance friendo into the future based on how much time has passed
      const heartbeatsSinceLastSave = (new Date() - new Date(savegame.savedAt)) / HEARTRATE
      friendo.fastForward(heartbeatsSinceLastSave)

      start(friendo)
      hideCreator()
    }
  })
