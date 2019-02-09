/**
 * Listeners for the main game screen
 */

import $ from 'jquery'
import { STATS } from '../../friendo/constants'
import { ID as petID } from '../../friendo/state/fitness/pet'
import { ID as feedID } from '../../friendo/state/fitness/feed'
import { performAction } from './ui-update'

export default (friendo) => {
  // pet button
  $('#pet-button').click(() => {
    performAction(friendo, petID)
  })

  // feed button
  $('#feed-button').click(() => {
    performAction(friendo, feedID)
  })

  // training buttons
  Object.values(STATS).forEach((v) => {
    $(`#start-${v}`).click(() => {
      const reps = $(`#${v}-trainamnt`).val()

      performAction(friendo, `state_${v}`, reps)

      // hide modal
      $(`#train-${v}`).modal('hide')
    })
  })
}
