/**
 * Listeners for header
 */

import $ from 'jquery'
import { version } from '../../../package.json'
import { reload, erase } from '../game-util'

/* eslint-disable no-alert */
const deleteFriendo = (friendo) => {
  if (!friendo) {
    alert('No Friendo DNA found!')
  } else if ($('#delete-check1').prop('checked') && $('#delete-check2').prop('checked')) {
    // handle deletion flavor text
    if (friendo.level >= 1) {
      alert(`"... ${friendo.owner}... goodbye..."`)
    } else {
      alert('You hear a cracking noise as the egg fades into nothingness.')
    }

    // delete friendo and refresh
    erase()
    reload()
  }
}
/* eslint-enable no-alert */

export default () => {
  $('#vernum').html(`[ v${version} ]`).attr('href', `https://github.com/mattdelsordo/friendo/releases/tag/v${version}`)

  $('#game-info-icon').mouseenter(() => {
    // make links visible, change icon to open book
    $('#game-info').css('visibility', 'visible')
    $('#game-info-icon').attr('src', './img/emoji/1f4d6.png')
  })

  $('#header').mouseleave(() => {
    // hide links, close book
    $('#game-info').css('visibility', 'hidden')
    $('#game-info-icon').attr('src', './img/emoji/1f516.png')
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
