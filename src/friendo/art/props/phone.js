
import { drawRoundedRect } from '../art-util'

const PHONE_WIDTH = 24
const PHONE_HEIGHT = 45
const SCREEN_HEIGHT = 35
const TETHER_OFFSET = (PHONE_HEIGHT / 2)
const SCREEN_OFFSET = (PHONE_HEIGHT - SCREEN_HEIGHT) / 2

const PHONE_OUTLINE = 'silver'
const PHONE_FILL = 'black'

export const PHONE_SCREEN_OFF = 'dimgrey'
export const PHONE_SCREEN_ON = 'grey'

/**
 * Draws phone, anchored at the friendo's hand which is why
 * the dimensions are inverted like they are
 */
export const drawPhone = (g, x, y, phoneScreen = PHONE_SCREEN_ON) => {
  g.save()
  g.strokeStyle = PHONE_OUTLINE
  g.fillStyle = PHONE_FILL

  drawRoundedRect(g, x - TETHER_OFFSET, y, PHONE_HEIGHT, PHONE_WIDTH, 3)

  g.fillStyle = phoneScreen
  g.fillRect((x - TETHER_OFFSET) + SCREEN_OFFSET, y, SCREEN_HEIGHT, PHONE_WIDTH)

  g.restore()
}
