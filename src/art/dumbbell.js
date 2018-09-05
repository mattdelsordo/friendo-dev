/**
 * Draws a dumbbell for the friendo to lift
 * Looks like: 0=0
 * Anchor in middle of dumbbell
 */

import { drawOutlinedRect, drawOutlinedOval } from './art-util'

export const DUMBBELL_OUTLINE = 'purple'
export const DUMBBELL_FILL = 'orchid'

export default (g, x, y, sizeFactor) => {
  const { fillStyle, strokeStyle } = g
  g.strokeStyle = DUMBBELL_OUTLINE
  g.fillStyle = DUMBBELL_FILL

  // length of dumbbell bar should be ~~ friendo.element.armGirth

  const barLength = sizeFactor + 8
  const barGirth = barLength / 5
  const weightHeight = barGirth * 4
  const weightGirth = barGirth
  drawOutlinedRect(g, x - (barLength / 2), y - (barGirth / 2), barLength, barGirth)
  drawOutlinedOval(
    g,
    x - (barLength / 2) - weightGirth, // must factor in the size of the weight itself
    y - (weightHeight / 2),
    weightGirth,
    weightHeight,
  ) // top weight
  drawOutlinedOval(
    g,
    x + (barLength / 2),
    y - (weightHeight / 2),
    weightGirth,
    weightHeight,
  ) // bottom weight


  g.fillStyle = fillStyle
  g.strokeStyle = strokeStyle
}
