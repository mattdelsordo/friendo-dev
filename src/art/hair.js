import { drawOval, drawLine } from './art-util'

/**
 Defines hair drawing routines
 */

// handles bang swoop thing
export const drawLusciousHairFront = (g, x, y) => {
  // set hair color to friendo outline color
  const oldFill = g.fillStyle
  g.fillStyle = g.strokeStyle

  // g.fillStyle = 'violet';
  g.beginPath()
  g.moveTo(x + 8, y - 4)
  g.quadraticCurveTo(x + 4, y + 22, x - 30, y + 30)
  g.lineTo(x - 26, y - 1)
  g.closePath()
  g.fill()

  // revert colors
  g.fillStyle = oldFill
}
// back of the hair
export const drawLusciousHairBack = (g, x, y, level) => {
  // set hair color to friendo outline color
  const oldFill = g.fillStyle
  g.fillStyle = g.strokeStyle

  const hairFactor = Math.ceil(level * 8.5)
  const halfHairFactor = (hairFactor / 2)
  drawOval(g, x - halfHairFactor, y - halfHairFactor, hairFactor, hairFactor, true)
  // g.fillStyle = 'violet';
  g.beginPath()
  g.moveTo(x - halfHairFactor, y)
  g.quadraticCurveTo(x - 30, y + 50, x - halfHairFactor - 10, y + 40)
  g.quadraticCurveTo(x - 20, y + 70, x, y + 30)
  g.quadraticCurveTo(x + 20, y + 70, x + halfHairFactor + 10, y + 40)
  g.quadraticCurveTo(x + 30, y + 50, x + halfHairFactor, y)
  g.closePath()
  g.fill()

  // revert colors
  g.fillStyle = oldFill
}
export const drawStevenHair = (g, x, y, level) => {
  // set hair color to friendo outline color
  const oldFill = g.fillStyle
  g.fillStyle = g.strokeStyle

  // calculate oval size
  const curlSize = level * 4
  const curls = [
    [x - ((curlSize / 2) - 8), y - (curlSize + 4)],
    [x - ((curlSize / 2) + 12), y - (curlSize + 14)],
    [x - ((curlSize / 2) + 8), y - (curlSize + 2)],
    [x - ((curlSize / 2) - 10), y - (curlSize + 17)],
    [x - ((curlSize / 2) + 9), y - (curlSize + 18)],
    [x - ((curlSize / 2) - 2), y - curlSize],
  ]
  drawOval(g, curls[0][0], curls[0][1], curlSize, curlSize, true)
  drawOval(g, curls[1][0], curls[1][1], curlSize, curlSize, true)
  drawOval(g, curls[2][0], curls[2][1], curlSize, curlSize, true)
  drawOval(g, curls[3][0], curls[3][1], curlSize, curlSize, true)
  drawOval(g, curls[4][0], curls[4][1], curlSize, curlSize, true)
  // this one just fills gaps in the middle of the design
  // g.fillStyle = 'violet';
  drawOval(g, curls[5][0], curls[5][1], curlSize + 5, curlSize + 5, true)

  // revert colors
  g.fillStyle = oldFill
}
export const drawDiglettHair = (g, x, y, level) => {
  const xOffset = 4 + (level * 1.5)
  const yOffset = 5 + (level * 2)
  drawLine(g, x, y, x, y - yOffset)
  drawLine(g, x, y, x - xOffset, y - yOffset)
  drawLine(g, x, y, x + xOffset, y - yOffset)
}
