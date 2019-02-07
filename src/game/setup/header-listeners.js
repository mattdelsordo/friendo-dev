/**
 * Listeners for header
 */

import $ from 'jquery'
import { version } from '../../../package.json'

const deleteFriendo = (friendo) => {
  console.log('called')
  if (!friendo) {
    alert('No Friendo DNA found!')
  } else if ($('#delete-check1').prop('checked') && $('#delete-check2').prop('checked')) {
    // handle deletion flavor text
    if (friendo.level >= 1) {
      alert(`"... ${friendo.owner}... goodbye..."`)
    } else {
      alert('You hear a cracking noise as the egg fades into nothingness.')
    }
  }
}

export default () => {
  $('#vernum').html(`[ v${version} ]`).attr('href', `https://github.com/mattdelsordo/friendo/releases/tag/v${version}`)

  $('#game-info-icon').mouseenter(() => {
    $('#game-info').css('visibility', 'visible')
  })

  $('#header').mouseleave(() => {
    $('#game-info').css('visibility', 'hidden')
  })

  $('#delete-btn').click(() => {
    deleteFriendo()
  })
}

export const updateDelete = (friendo) => {
  $('#delete-btn').off('click').click(() => {
    deleteFriendo(friendo)
  })
}
