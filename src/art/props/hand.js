/**
 * Draws a hand to pet a friendo with
 */

import { drawOutlinedRect } from '../art-util'
import drawPlate from './food'

const fingerHeight = 5
const handWidth = 30
const thumbWidth = handWidth * (2 / 3)

const HAND_COLOR = 'dimgray'

/**
 * Hand is drawn from the tip of the finger, for use in petting
 */
export const drawHandDown = (g, x, y) => {
  /* eslint-disable prefer-destructuring */
  const fillStyle = g.fillStyle
  const strokeStyle = g.strokeStyle
  g.strokeStyle = HAND_COLOR
  g.fillStyle = HAND_COLOR

  drawOutlinedRect(g, x, y - fingerHeight, handWidth, fingerHeight)
  drawOutlinedRect(g, x + (handWidth / 3), y - (fingerHeight / 3), thumbWidth, fingerHeight)

  g.fillStyle = fillStyle
  g.strokeStyle = strokeStyle
}

export const handWithFood = (g, x, y, drawFood) => {
  g.save()
  g.strokeStyle = HAND_COLOR
  g.fillStyle = HAND_COLOR

  drawOutlinedRect(g, x, y - fingerHeight, handWidth, fingerHeight)
  drawOutlinedRect(g, x, y - (fingerHeight * (5 / 3)), thumbWidth, fingerHeight)
  drawPlate(g, x + thumbWidth, y + 2, drawFood)

  g.restore()
}
