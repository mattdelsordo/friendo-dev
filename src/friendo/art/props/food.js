
import { drawOutlinedOval, drawTube } from '../art-util'
import { LEFT2RIGHT, TOP2BOT } from '../../constants'

export const PLATE_WIDTH = 30
export const PLATE_HEIGHT = PLATE_WIDTH / 3
const FOOD_WIDTH = PLATE_WIDTH
const FOOD_HEIGHT = FOOD_WIDTH / 5
const RESIZE_FACTOR = 0.33

const PLATE_FILL = '#EAEAE7'
const PLATE_OUTLINE = '#DCD3BA'
const FOOD_FILL = '#F9906F'
const FOOD_OUTLINE = 'darksalmon'
const BREAD_FILL = '#F6E7D2'
const BREAD_OUTLINE = '#B78B43'

/**
 * Assume tether point of plate is at its base
 */
export const drawGenericFood = (g, x, y, foodPercentage) => {
  g.save()
  g.fillStyle = PLATE_FILL
  g.strokeStyle = PLATE_OUTLINE

  const translatedX = x - (PLATE_WIDTH / 2)
  const translatedY = y - PLATE_HEIGHT
  drawOutlinedOval(g, translatedX, translatedY, PLATE_WIDTH, PLATE_HEIGHT)

  if (foodPercentage > 0) {
    const bunWidth = FOOD_WIDTH * foodPercentage

    // draw sausage
    g.strokeStyle = FOOD_OUTLINE
    g.fillStyle = FOOD_FILL
    drawTube(
      g,
      (x - (FOOD_WIDTH / 2)) + 1,
      y - FOOD_HEIGHT - 4,
      bunWidth - 2, FOOD_HEIGHT,
    )

    // draw bun
    g.strokeStyle = BREAD_OUTLINE
    g.fillStyle = BREAD_FILL
    drawTube(
      g,
      x - (FOOD_WIDTH / 2),
      y - FOOD_HEIGHT - 2,
      bunWidth, FOOD_HEIGHT,
    )
  }

  g.restore()
}

const drawPlate = (g, x, y) => {
  g.save()
  g.fillStyle = PLATE_FILL
  g.strokeStyle = PLATE_OUTLINE

  // draw plate
  const translatedX = x - (PLATE_WIDTH / 2)
  const translatedY = y
  drawOutlinedOval(g, translatedX, translatedY, PLATE_WIDTH, PLATE_HEIGHT)

  g.restore()
}

const drawFoodL2R = (g, x, y, foodImg, foodPercentage) => {
  const resizeW = foodImg.width * RESIZE_FACTOR
  const resizeH = foodImg.height * RESIZE_FACTOR
  const erasedW = foodImg.width - (foodImg.width * foodPercentage)
  g.drawImage(
    foodImg,
    erasedW,
    0,
    foodImg.width,
    foodImg.height,
    x + (erasedW / 3) + (resizeW / -2),
    y - 20,
    resizeW,
    resizeH,
  )
}

const drawFoodT2B = (g, x, y, foodImg, foodPercentage) => {
  const resizeW = foodImg.width * RESIZE_FACTOR
  const resizeH = foodImg.height * RESIZE_FACTOR
  const erasedH = foodImg.height - (foodImg.height * foodPercentage)
  g.drawImage(
    foodImg,
    0,
    erasedH,
    foodImg.width,
    foodImg.height,
    x - (resizeH / 2),
    y - 20 - (erasedH / -3),
    resizeW,
    resizeH,
  )
}

export const drawFood = (g, x, y, foodImg, foodPercentage, dir = LEFT2RIGHT) => {
  g.save()

  drawPlate(g, x, y)

  // draw part of food emoji based on foodPercentage
  if (foodPercentage > 0) {
    if (dir === LEFT2RIGHT) {
      drawFoodL2R(g, x, y, foodImg, foodPercentage)
    } else if (dir === TOP2BOT) {
      drawFoodT2B(g, x, y, foodImg, foodPercentage)
    }
  }

  g.restore()
}
