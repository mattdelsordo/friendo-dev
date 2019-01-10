/**
 * Listeners for the main game screen
 */

import $ from 'jquery'
import { exercise } from './actions'
import { ACTIONS } from '../friendo/constants'
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
}
