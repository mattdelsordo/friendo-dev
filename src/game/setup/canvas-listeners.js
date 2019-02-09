/**
 * Listeners for the Friendo canvas
 */

import $ from 'jquery'

/**
 * Resize canvas to match viewport size
 * Canvases have to have a predetermined integer value for height and width
 * so you can't declare them in CSS
 */
const resizeCanvas = () => {
  $('#canvas')
    .width(Math.min(400, Math.floor($(window).width() * 0.95)))
    .height($('#canvas').width())
}

export default () => {
  resizeCanvas()

  $(window).resize(() => resizeCanvas())
}
