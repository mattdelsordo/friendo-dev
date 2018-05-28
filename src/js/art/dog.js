import { DOG_SKIN, DOG_OUTLINE } from './colors'
import { drawOval, drawPolygon, drawLine } from './art-util'
import { MAX_DOGS } from '../friendo/constants'

/**
 * Paints a dog on the canvas
 */
const DOG_HEIGHT = 41
const DOG_WIDTH = 30
let dogPoints

// draws a dog's tail, where x and y are the bsae of the tail
const dogTail = function (g, x, y, angle) {
  g.save()
  g.translate(x, y)
  g.rotate(angle)
  g.fillRect(0, 0, 14, 4)
  g.restore()
}
// paints a single dog
const paintDog = function (g, x, y, tail = -0.6) {
  g.fillStyle = DOG_SKIN
  g.strokeStyle = DOG_OUTLINE
  drawOval(g, x - 12, y - 41, 24, 24, true) // head
  drawOval(g, x - 15, y - 31, 30, 30, true) // body
  dogTail(g, x + 8, y - 8, tail) // tail
  drawOval(g, x - 13, y - 5, 10, 5, true) // left foot
  drawOval(g, x + 3, y - 5, 10, 5, true) // right foot

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
// adjusts the angle of a dog's tail based on the last draw
const newWagAngle = function () {
  return Math.random() * Math.PI / -5
}
const wag = function () {
  for (let i = 0; i < MAX_DOGS; i += 1) dogPoints[i].angle = newWagAngle()
}
// paints a variable amount of dogs on the screen, based on
export const paintDogs = function (g, dogLevel, canvasW, canvasH) {
  // identify where the dogs aught to be drawn
  if (!dogPoints) {
    dogPoints = []
    for (let i = 0; i < MAX_DOGS; i += 1) {
      dogPoints.push({
        x: Math.floor((Math.random() * (canvasW - DOG_WIDTH)) + DOG_WIDTH / 2),
        y: Math.floor((Math.random() * (canvasH * (3 / 5) - DOG_HEIGHT)) + DOG_HEIGHT + canvasH * (2 / 5)),
        angle: newWagAngle(),
      })
    }
  } else {
    wag()
  }

  // draw dogs based on dog level
  if (dogLevel > 1) paintDog(g, dogPoints[0].x, dogPoints[0].y, dogPoints[0].angle)
  if (dogLevel > 3) paintDog(g, dogPoints[1].x, dogPoints[1].y, dogPoints[0].angle)
  if (dogLevel > 5) paintDog(g, dogPoints[2].x, dogPoints[2].y, dogPoints[0].angle)
  if (dogLevel > 7) paintDog(g, dogPoints[3].x, dogPoints[3].y, dogPoints[0].angle)
  if (dogLevel > 9) paintDog(g, dogPoints[4].x, dogPoints[4].y, dogPoints[0].angle)
}
