/**
 * Listeners for the main game screen
 */

import $ from 'jquery'
import { setEnergy } from './ui-update'
import { PET_ENERGY, FEED_ENERGY } from '../friendo/constants'

export const mainSetup = (friendo) => {
  // pet button
  $('#pet-button').click(() => {
    friendo.addEnergy(PET_ENERGY)
    setEnergy(friendo.getEnergyLeft())
  })

  // feed button
  $('#feed-button').click(() => {
    friendo.addEnergy(FEED_ENERGY)
    setEnergy(friendo.getEnergyLeft())
  })
}
