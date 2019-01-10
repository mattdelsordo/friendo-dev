/**
 * Listeners for the main game screen
 */

import $ from 'jquery'
import { exercise, REP_TIME } from './actions'
import { ACTIONS, STATS } from '../friendo/constants'
import { ID as petID } from '../friendo/state/pet'
import { ID as feedID } from '../friendo/state/feed'

export default (friendo) => {
  // pet button
  $('#pet-button').click(() => {
    friendo.handleAction(petID, () => {
      exercise(friendo, ACTIONS.PET)
    })
  })

  // feed button
  $('#feed-button').click(() => {
    friendo.handleAction(feedID, () => {
      exercise(friendo, ACTIONS.FEED)
    })
  })

  // training buttons
  Object.values(STATS).forEach((v) => {
    $(`#start-${v}`).click(() => {
      const time = $(`#${v}-trainamnt`).val()
      const reps = time / (REP_TIME[v] / 60000)

      friendo.handleAction(`state_${v}`, () => {
        exercise(friendo, v, undefined, reps)
      })

      // hide modal
      $(`#train-${v}`).modal('hide')
    })
  })
}
