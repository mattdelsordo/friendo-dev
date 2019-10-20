/**
 * Listeners for the main game screen
 */

import $ from 'jquery'
import { STATS, STATES } from '../../friendo/constants'
import { performAction } from './ui-update'
import {
  setEnterButton,
  setNumberInput,
  unsetEnterButton,
  unsetNumberInput,
} from './key-listeners'

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

  // enter button management for stat training
  /* eslint-disable-next-line compat/compat */
  Object.values(STATS).forEach((v) => {
    $(`#train-${v}`)
      .on('shown.bs.modal', () => {
        // mount enter button
        if ($(`#start-${v}`).prop('disabled')) {
          setEnterButton(`#cancel-${v}`)
        } else {
          setEnterButton(`#start-${v}`)
        }

        // mount up and down keys to number input
        setNumberInput(`#${v}-trainamnt`)
      })
      .on('hidden.bs.modal', () => {
        unsetEnterButton()
        unsetNumberInput()
      })
  })
}
