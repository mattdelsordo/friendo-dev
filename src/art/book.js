/**
 * Draws a book for the friendo to hold during a
 */

import { drawOutlinedRect, drawLine } from './art-util'

export const BOOK_OUTLINE = 'saddlebrown'
export const BOOK_FILL = 'sienna'
export const PAGE_FILL = 'seashell'
export const TEXT_COLOR = 'dimgray'

const BOOK_WIDTH = 21
const BOOK_HEIGHT = 17
const PAGE_HEIGHT = 15
const PAGE_WIDTH = 17

const TEXT_LENGTH = 4

export const drawOpenBook = (g, x, y) => {
  const { fillStyle, strokeStyle } = g

  // set book colors
  g.fillStyle = BOOK_FILL
  g.strokeStyle = BOOK_OUTLINE
  drawOutlinedRect(g, x - (BOOK_WIDTH / 2), y, BOOK_WIDTH, BOOK_HEIGHT)

  // set page colors
  g.fillStyle = PAGE_FILL
  g.fillRect(x - (PAGE_WIDTH / 2), y + ((BOOK_HEIGHT - PAGE_HEIGHT) / 2), PAGE_WIDTH, PAGE_HEIGHT)

  // sort of page line??
  g.strokeStyle = BOOK_FILL
  drawLine(g, x, y, x, y + BOOK_HEIGHT)

  // draw "lines of text" in book
  g.strokeStyle = TEXT_COLOR
  const bookText = (_x, _y) => {
    for (let j = _y, count = 0; count < 4; count += 1, j += 3) {
      drawLine(g, _x, j, _x + TEXT_LENGTH, j)
    }
  }
  bookText(x + 2, y + 4)
  bookText(x - 6, y + 4)

  g.fillStyle = fillStyle
  g.strokeStyle = strokeStyle
}
