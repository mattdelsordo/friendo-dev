
import { drawOutlinedOval, drawOutlinedRect } from '../art-util'

export const PLATE_WIDTH = 30
export const PLATE_HEIGHT = PLATE_WIDTH / 3
const FOOD_WIDTH = PLATE_WIDTH * (2 / 3)
const FOOD_HEIGHT = FOOD_WIDTH / 3

const PLATE_FILL = 'linen'
const PLATE_OUTLINE = 'gainsboro'
const FOOD_FILL = 'salmon'
const FOOD_OUTLINE = 'tomato'

export const drawGenericFood = (g, x, y, foodPercentage) => {
  g.save()
  g.fillStyle = PLATE_FILL
  g.strokeStyle = PLATE_OUTLINE

  drawOutlinedOval(g, x, y - (PLATE_WIDTH / 2), PLATE_WIDTH, PLATE_HEIGHT)

  if (foodPercentage > 0) {
    g.strokeStyle = FOOD_OUTLINE
    g.fillStyle = FOOD_FILL

    const actualFoodHeight = FOOD_HEIGHT * foodPercentage
    drawOutlinedRect(
      g,
      x + ((PLATE_WIDTH - FOOD_WIDTH) / 2),
      y - (PLATE_WIDTH / 2) + (FOOD_HEIGHT - actualFoodHeight),
      FOOD_WIDTH, actualFoodHeight,
    )
  }

  g.restore()
}
