/**
 * Draws a hand to pet a friendo with
 */

import { drawOutlinedRect } from '../art-util'

const fingerHeight = 5
const handWidth = 30
const thumbWidth = handWidth * (2 / 3)

export default (g, x, y) => {
  /* eslint-disable prefer-destructuring */
  const fillStyle = g.fillStyle
  const strokeStyle = g.strokeStyle
  g.strokeStyle = 'dimgray'
  g.fillStyle = 'dimgray'

  drawOutlinedRect(g, x, y - fingerHeight, handWidth, fingerHeight)
  drawOutlinedRect(g, x + (handWidth / 3), y - (fingerHeight / 3), thumbWidth, fingerHeight)

  g.fillStyle = fillStyle
  g.strokeStyle = strokeStyle
}
