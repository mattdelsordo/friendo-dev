/**
 * Controller for character creation display
 * Handles showing/hiding screen, verifying input, etc.
 */

import $ from 'jquery'
import Friendo from '../../friendo/friendo'
import { setEnterButton } from './key-listeners'
import { getErrorName } from '../../friendo/text/game-text'

// verifies input fields and returns a friendo if they're valid
const createFriendo = () => {
  const type = $('.elementRadio:checked').val()
  let name = $('#name-input').val().trim()
  // capitalize name
  name = name.charAt(0).toUpperCase() + name.slice(1)
  const player = $('#player-input').val().trim()

  if (!type || !name || !player) return undefined
  return Friendo.newFriendo(name, player, type)
}

export const showCreator = () => {
  $('#loading, .loader').css('display', 'none')
  $('#char-creator').css('display', 'block')
  $('#main-display').css('display', 'none')
}

export const hideCreator = () => {
  $('#loading, .loader').css('display', 'none')
  $('#char-creator').css('display', 'none')
  $('#main-display').css('display', 'block')
}

export default (setFriendo) => {
  // radio buttons select a friendo type
  $('.elementRadio')
    .change(() => {
      $('#name-input').prop('disabled', '')
      $('#btn-rand-name').prop('disabled', '')
    })

  // name field enables owner name field
  $('#name-input').on('input', () => {
    $('#player-input').prop('disabled', '')
  }).on('blur', function disableInName() {
    // disable fields if no input
    if (this.value.trim().length < 1) {
      $('#player-input').prop('disabled', 'disabled')
      $('#btnCreate').prop('disabled', 'disabled')
    }
  })

  // randomizes name
  $('#btn-rand-name').on('click', () => {
    // use randomuser.me api
    $.get('https://randomuser.me/api/?inc=name')
      .done((data) => {
        // 90% chance of first name, otherwise last
        const name = (Math.random() < 0.9 ? data.results[0].name.first : data.results[0].name.last)
        $('#name-input').val(name)
        // remember to un-disable the player name field
        $('#player-input').prop('disabled', '')
      })
      .fail(() => {
        $('#name-input').val(getErrorName())
        $('#player-input').prop('disabled', '')
      })
  })

  // player field enables button
  $('#player-input').on('input', () => {
    $('#btnCreate').prop('disabled', '')
  }).on('blur', function disableInPlayer() {
    // disable fields if no input
    if (this.value.trim().length < 1) {
      $('#btnCreate').prop('disabled', 'disabled')
    }
  })

  // button creates a friendo
  $('#btnCreate').click(() => {
    // try to make a new friendo, set it if it worked
    const f = createFriendo()
    if (f) {
      setFriendo(f)
      hideCreator()
    }
  })

  // not sure if this is the best place for this listener long-term
  setEnterButton('#btnCreate')
}
