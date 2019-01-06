/**
 * Birthday hat that should be displayed on the Friendo's birthday!
 */

import { drawOutlinedOval, drawOutlinedPolygon } from '../art-util'

const hatLine = 'purple'
const fillColor1 = 'red'
const fillColor2 = 'gold'

const hatHeight = 40
const hatWidth = 28

export default (g, x, y) => {
  g.save()

  // create hat gradient
  const gradient = g.createLinearGradient(x - (hatWidth / 2), y - hatHeight, x + (hatWidth / 2), y)
  const numStripes = 13
  for (let i = 0; i < numStripes; i += 2) {
    gradient.addColorStop(i / numStripes, fillColor1)
    gradient.addColorStop((i + 1) / numStripes, fillColor2)
  }

  g.fillStyle = gradient
  g.strokeStyle = hatLine

  // draw hat
  drawOutlinedPolygon(
    g,
    [x - (hatWidth / 2), x + (hatWidth / 2), x],
    [y, y, y - hatHeight],
    true,
  )

  // draw top pom
  drawOutlinedOval(g, x - 5, y - (hatHeight + 4), 10, 10)


  g.restore()
}
