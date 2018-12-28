/**
 * Crack-drawing routines for egg hatching procedure
 */

import { drawLine } from '../art-util'

// top
export const crack1 = (g, x, y) => {
  drawLine(g, x, y, x + 5, y + 8)
  drawLine(g, x + 5, y + 7, x + 1, y + 11)
  drawLine(g, x + 1, y + 11, x + 7, y + 15)
}

// right
export const crack2 = (g, x, y) => {
  drawLine(g, x, y, x - 4, y + 4)
  drawLine(g, x - 4, y + 4, x - 8, y - 2)
  drawLine(g, x - 8, y - 2, x - 12, y + 6)
  drawLine(g, x - 12, y + 6, x - 15, y + 2)
}

// bottom-left
export const crack3 = (g, x, y) => {
  drawLine(g, x, y, x + 3, y - 7)
  drawLine(g, x + 3, y - 7, x + 10, y - 4)
}
