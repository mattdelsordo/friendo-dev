/**
 * Listeners for the main game screen
 */

import $ from 'jquery'
import { STATS, STATES } from '../../friendo/constants'
import { performAction } from './ui-update'

export default (friendo) => {
  // pet button
  $('#pet-button').click(() => {
    performAction(friendo, STATES.PET)
  })

  // feed button
  $('#feed-button').click(() => {
    performAction(friendo, STATES.FEED)
  })

  $('#cancel-exercise').click(() => {
    performAction(friendo, STATES.CANCEL)
  })

  // training buttons
  /* eslint-disable-next-line compat/compat */
  Object.values(STATS).forEach((v) => {
    $(`#start-${v}`).click(() => {
      const reps = $(`#${v}-trainamnt`).val()

      performAction(friendo, `state_${v}`, reps)

      // hide modal
      $(`#train-${v}`).modal('hide')
    })
  })
}
