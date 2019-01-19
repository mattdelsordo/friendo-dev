/**
 * Listeners for footer
 */

import $ from 'jquery'

export default () => {
  $('#game-info-icon').mouseenter(() => {
    $('#game-info').css('visibility', 'visible')
  })

  $('#footer').mouseleave(() => {
    $('#game-info').css('visibility', 'hidden')
  })
}
