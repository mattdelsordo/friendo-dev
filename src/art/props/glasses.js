/**
 * Draws glasses for the friendo to wear
 */

import { drawOutlinedOval, drawLine } from '../art-util'

export const WIRE_COLOR = 'maroon'
export const LENS_COLOR = '#f8f8f850'

const RIM_SIZE = 14

const drawLens = (g, x, y) => {
  drawOutlinedOval(g, x - (RIM_SIZE / 2), y - (RIM_SIZE), RIM_SIZE, RIM_SIZE)
}

export const oneLens = (g, x, y) => {
  const { fillStyle, strokeStyle, lineWidth } = g
  g.strokeStyle = WIRE_COLOR
  g.fillStyle = LENS_COLOR
  g.lineWidth = 2

  drawLens(g, x, y + 2)
  drawLine(g, x - (RIM_SIZE / 2), y - (RIM_SIZE / 2), x - 27, y - ((RIM_SIZE / 2) + 2))
  drawLine(g, x + (RIM_SIZE / 2), y - (RIM_SIZE / 2), x + 27, y - ((RIM_SIZE / 2) + 2))

  g.fillStyle = fillStyle
  g.strokeStyle = strokeStyle
  g.lineWidth = lineWidth
}

export const twoLens = (g, x, y) => {
  const { fillStyle, strokeStyle, lineWidth } = g
  g.strokeStyle = WIRE_COLOR
  g.fillStyle = LENS_COLOR
  g.lineWidth = 2

  drawLens(g, x + 8, y + 2)
  drawLens(g, x - 8, y + 2)
  drawLine(g, x - (RIM_SIZE / 2) - 8, y - (RIM_SIZE / 2), x - 27, y - ((RIM_SIZE / 2) + 2))
  drawLine(g, x + (RIM_SIZE / 2) + 8, y - (RIM_SIZE / 2), x + 27, y - ((RIM_SIZE / 2) + 2))

  g.fillStyle = fillStyle
  g.strokeStyle = strokeStyle
  g.lineWidth = lineWidth
}

export const threeLens = (g, x, y) => {
  const { fillStyle, strokeStyle, lineWidth } = g
  g.strokeStyle = WIRE_COLOR
  g.fillStyle = LENS_COLOR
  g.lineWidth = 2

  drawLens(g, x, y - 6)
  drawLens(g, x + 8, y + 2)
  drawLens(g, x - 8, y + 2)
  drawLine(g, x - (RIM_SIZE / 2) - 8, y - (RIM_SIZE / 2), x - 27, y - ((RIM_SIZE / 2) + 2))
  drawLine(g, x + (RIM_SIZE / 2) + 8, y - (RIM_SIZE / 2), x + 27, y - ((RIM_SIZE / 2) + 2))

  g.fillStyle = fillStyle
  g.strokeStyle = strokeStyle
  g.lineWidth = lineWidth
}
