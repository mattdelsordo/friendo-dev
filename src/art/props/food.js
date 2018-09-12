
import { drawOutlinedOval, drawOutlinedRect } from '../art-util'

const PLATE_WIDTH = 30
const PLATE_HEIGHT = PLATE_WIDTH / 3
const FOOD_SIZE = PLATE_WIDTH * (2 / 3)

const PLATE_FILL = 'linen'
const PLATE_OUTLINE = 'gainsboro'
const FOOD_FILL = 'salmon'
const FOOD_OUTLINE = 'tomato'

export default (g, x, y, drawFood) => {
  g.save()
  g.fillStyle = PLATE_FILL
  g.strokeStyle = PLATE_OUTLINE

  drawOutlinedOval(g, x, y - (PLATE_WIDTH / 2), PLATE_WIDTH, PLATE_HEIGHT)

  if (drawFood) {
    g.strokeStyle = FOOD_OUTLINE
    g.fillStyle = FOOD_FILL
    drawOutlinedRect(
      g,
      x + ((PLATE_WIDTH - FOOD_SIZE) / 2),
      y - (PLATE_WIDTH / 2),
      FOOD_SIZE, FOOD_SIZE / 4,
    )
  }

  g.restore()
}
