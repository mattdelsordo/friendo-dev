import { DOG_SKIN, DOG_OUTLINE, TONGUE_FILL, TONGUE_LINE } from '../colors'
import { drawOval, drawPolygon, drawLine, drawOutlinedRect } from '../art-util'
import { drawHookMarker } from '../hook-marker'
import { LICK_CHANCE } from '../../friendo/constants'

/**
 * Paints a dog on the canvas
 */
const DOG_HEIGHT = 41
const DOG_WIDTH = 30

export class Dog {
  constructor() {
    this.tailAngle = -0.6
    this.justLicked = false
  }

  paintTail(g, x, y) {
    g.save()
    g.translate(x, y)
    g.rotate(this.tailAngle)
    g.fillRect(0, 0, 14, 4)
    g.restore()
  }

  newWagAngle() {
    this.tailAngle = (Math.random() * Math.PI) / -5
  }

  paint(g, x, y, licking) {
    this.newWagAngle()

    g.fillStyle = DOG_SKIN
    g.strokeStyle = DOG_OUTLINE
    drawOval(g, x - 12, y - 41, 24, 24, true) // head
    drawOval(g, x - 15, y - 31, 30, 30, true) // body
    this.paintTail(g, x + 8, y - 8, this.tailAngle) // tail
    drawOval(g, x - 13, y - 5, 10, 5, true) // left foot
    drawOval(g, x + 3, y - 5, 10, 5, true) // right foot

    // draw tongue if necessary
    if (licking && !this.justLicked && Math.random() < LICK_CHANCE) {
      this.justLicked = true
      g.save()
      g.fillStyle = TONGUE_FILL
      g.strokeStyle = TONGUE_LINE

      drawOutlinedRect(g, x - 1, y - 22, 3, 2)
      g.restore()
    } else {
      this.justLicked = false
    }

    g.fillStyle = DOG_OUTLINE
    // g.strokeStyle = DOG_OUTLINE;
    drawPolygon(g, [x - 2, x + 3, x], [y - 27, y - 27, y - 24], true) // nose
    drawLine(g, x, y - 24, x, y - 22) // vertical mouth part
    drawLine(g, x - 2, y - 22, x + 3, y - 22) // horizontal mouth part
    drawOval(g, x - 5, y - 35, 3, 3, true) // left eye
    drawOval(g, x + 2, y - 35, 3, 3, true) // right eye
    drawOval(g, x - 13, y - 35, 5, 12, true) // left ear
    drawOval(g, x + 9, y - 35, 5, 12, true) // right ear

    drawHookMarker(g, x, y)
  }
}

export const calcDogX = (min, max) =>
  Math.floor((Math.random() * (max - DOG_WIDTH)) + (DOG_WIDTH / 2)) + min

export const calcDogY = (min, max) =>
  Math.floor((Math.random() * ((max * (3 / 5)) - DOG_HEIGHT)) + DOG_HEIGHT + (max * (2 / 5))) + min
