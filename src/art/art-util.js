

import { drawHookMarker } from './hook-marker'
import { SPEECH_STYLE, SPEECH_SIZE } from './art-config'

// draws a rectangle with an outline on top of it
export const drawOutlinedRect = (g, x, y, w, h) => {
  g.fillRect(x, y, w, h)
  g.strokeRect(x, y, w, h)
}

// draws an arbitrary polygon based on a set of x and y coordinates
export const drawPolygon = (g, xs, ys, fill) => {
  g.beginPath()
  g.moveTo(xs[0], ys[0])
  for (let i = 1; i < xs.length && i < ys.length; i += 1) {
    g.lineTo(xs[i], ys[i])
  }
  g.closePath()
  if (fill) g.fill()
  else g.stroke()
}
export const drawOutlinedPolygon = (g, xs, ys) => {
  drawPolygon(g, xs, ys, true)
  drawPolygon(g, xs, ys)
}

// draws an oval based on the upper left corner of the enclosing rectangle
export const drawOval = (g, x, y, width, height, fill) => {
  if (width < 0 || height < 0) {
    // catch error from trying to draw too small of an ellipse
    return
  }
  g.beginPath()
  g.ellipse(x + (width / 2), y + (height / 2), width / 2, height / 2, 0, 0, Math.PI * 2)
  g.closePath()
  if (fill) g.fill()
  else g.stroke()
}
export const drawOutlinedOval = (g, x, y, w, h) => {
  drawOval(g, x, y, w, h, true)
  drawOval(g, x, y, w, h)
}

// draws an arbitrary line
export const drawLine = (g, x1, y1, x2, y2) => {
  g.beginPath()
  g.moveTo(x1, y1)
  g.lineTo(x2, y2)
  g.stroke()
}

// draws a shape with rounded sides and straight top and bottom
export const drawTube = (g, x, y, w, h) => {
  const radius = w * 0.3
  g.beginPath()
  g.moveTo(x + radius, y)
  g.lineTo((x + w) - radius, y)
  g.quadraticCurveTo(x + w, y + (h / 2), (x + w) - radius, y + h)
  g.lineTo(x + radius, y + h)
  g.quadraticCurveTo(x, y + (h / 2), x + radius, y)
  g.closePath()
  g.fill()
  g.stroke()
}

// draws text for a friendo's message
export const drawSpeech = (g, x, y, text) => {
  g.font = SPEECH_STYLE

  // multi line support
  const lineLength = 22
  const words = text.split(' ')
  // build each line
  for (let i = 0, wordCount = 0; i < text.length; i += 1) {
    let line = ''
    while (words[wordCount]
    && line.length + words[wordCount].length < lineLength) {
      // console.log(`Word: ${words[wordCount]}`)
      line += `${words[wordCount]} `
      wordCount += 1
    }
    // console.log(`Built line "${line}"`)
    g.fillText(
      line,
      x,
      y + (SPEECH_SIZE * i),
    )
  }

  // g.strokeText(text, x, y)
}

// positions appendages and whatnot
// angle in rads/pi
export const left = (g, x, y, brush, angle = 0) => {
  g.save()
  g.translate(x, y)
  g.rotate(Math.PI * angle)
  brush(g)
  g.restore()
  drawHookMarker(g, x, y)
}
export const right = (g, x, y, brush, angle = 0) => {
  g.save()
  g.translate(x, y)
  g.rotate(Math.PI * (2 - angle))
  g.scale(-1, 1)
  brush(g)
  g.restore()
  drawHookMarker(g, x, y)
}

export const down = (g, brush, x, y) => {
  g.save()
  g.translate(x, y)
  g.rotate(Math.PI / 2)
  g.translate(-x, -y)

  brush(g, x, y)

  g.restore()
  drawHookMarker(g, x, y)
}
