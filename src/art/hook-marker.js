import { drawOval } from './art-util'

/**
 Hook markers mark where a drawn element has it's x/y tether
 for debugging
 */

// for debugging, mark all spots where elements are anchored
let showHooks = false
export const toggleHookMarkers = () => {
  showHooks = !showHooks
}
export const drawHookMarker = (g, x, y) => {
  if (showHooks) {
    const oldStrokeStyle = g.strokeStyle
    const oldFillStyle = g.fillStyle
    g.strokeStyle = 'green'
    g.fillStyle = 'yellow'
    drawOval(g, x - 1, y - 1, 3, 3)
    drawOval(g, x - 1, y - 1, 3, 3, true)
    g.strokeStyle = oldStrokeStyle
    g.fillStyle = oldFillStyle
  }
}
