/**
 * Draws a computer to facilitate the meme training state
 */

import { drawOutlinedPolygon, drawOutlinedRect } from '../art-util'

export const COMPUTER_FILL = 'lightgrey'
export const COMPUTER_LINE = 'dimgrey'
export const SCREEN_FILL = 'teal'

const TABLE_HEIGHT = 50
const TABLE_WIDTH = 50
const TABLE_DEPTH = 24
const LEG_WIDTH = 5
const LEG_DEPTH = 8

/**
 * Draws a computer starting from the bottom left
 */
export const drawComputer = (g, x, y) => {
  g.save()

  g.fillStyle = COMPUTER_FILL
  g.strokeStyle = COMPUTER_LINE

  /* Draw table for computer */
  // legs
  drawOutlinedRect(g, x - TABLE_DEPTH, y - TABLE_HEIGHT - LEG_DEPTH, LEG_WIDTH, TABLE_HEIGHT) // back left
  drawOutlinedRect(g, x - TABLE_DEPTH + TABLE_WIDTH, y - TABLE_HEIGHT - (LEG_DEPTH * 2), LEG_WIDTH, TABLE_HEIGHT) // back right
  drawOutlinedRect(g, x, y - TABLE_HEIGHT, LEG_WIDTH, TABLE_HEIGHT) // front left
  drawOutlinedRect(g, x + TABLE_WIDTH, y - TABLE_HEIGHT - LEG_DEPTH, LEG_WIDTH, TABLE_HEIGHT) // front right
  // tabletop
  drawOutlinedPolygon(
    g,
    [x, x + TABLE_WIDTH + LEG_WIDTH, x + TABLE_WIDTH - TABLE_DEPTH + LEG_WIDTH, x - TABLE_DEPTH],
    [y - TABLE_HEIGHT, y - TABLE_HEIGHT - LEG_DEPTH, y - TABLE_HEIGHT - (LEG_DEPTH * 2), y - TABLE_HEIGHT - LEG_DEPTH],
  )

  // drawOutlinedPolygon(
  //   g,
  //   [x, x, x + 40, x + 40],
  //   [y, y - 30, y - 34, y - 4],
  // )

  g.restore()
}
