/**
 * Draws a hairbrush with which to brush a friendo's hair
 */

import { drawOutlinedRect, drawOutlinedOval } from '../art-util'

export const BRUSH_COLOR = 'midnightblue'
export const BRISTLE_COLOR = 'dimgrey'

const BRUSH_HEIGHT = 18
const BRUSH_WIDTH = 12
const HANDLE_HEIGHT = 10
const HANDLE_WIDTH = 4
const BRISTLE_WIDTH = BRUSH_WIDTH - 2
const BRISTLE_HEIGHT = BRUSH_HEIGHT - 4

export default (g, x, y) => {
  g.save()
  g.fillStyle = BRUSH_COLOR
  g.strokeStyle = BRUSH_COLOR

  drawOutlinedRect(
    g,
    x - (HANDLE_WIDTH / 2),
    y - HANDLE_HEIGHT,
    HANDLE_WIDTH,
    HANDLE_HEIGHT,
  )
  drawOutlinedOval(
    g,
    x - (BRUSH_WIDTH / 2),
    y - BRUSH_HEIGHT - HANDLE_HEIGHT,
    BRUSH_WIDTH,
    BRUSH_HEIGHT,
  )

  g.fillStyle = BRISTLE_COLOR
  g.strokeStyle = BRISTLE_COLOR
  drawOutlinedOval(
    g,
    x - (BRISTLE_WIDTH / 2) - 2,
    y - ((BRUSH_HEIGHT + HANDLE_HEIGHT) - 2),
    BRISTLE_WIDTH,
    BRISTLE_HEIGHT,
  )

  g.restore()
}
