/**
 * Draws a lamp rooted at the light beam
 */

import { drawPolygon, drawOval } from '../art-util'

const BEAM_COLOR = '#ffcc6170'
const LAMP_COLOR = '#494c53'

const head = (g, x, y) => {
  g.save()
  g.translate(x, y)
  g.rotate(Math.PI * 0.20)
  g.translate(-x, -y)

  g.fillStyle = BEAM_COLOR
  drawPolygon(
    g,
    [x - 33, x + 33, x],
    [y, y, y - 150],
    true,
  )

  g.fillStyle = LAMP_COLOR
  g.fillRect(x - 15, y - 160, 30, 70)

  g.restore()
}

export default (g, x, y) => {
  g.save()

  // draw head at a translated position
  head(g, x - 8, y - 15)

  g.fillStyle = LAMP_COLOR
  g.fillRect(x + 80, y - 125, 10, 130)
  drawOval(g, x + 58, y, 56, 6, true)

  g.restore()
}
