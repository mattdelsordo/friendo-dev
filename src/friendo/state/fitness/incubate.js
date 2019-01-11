/**
 * Incubation stat extends egg state to draw the incubation lamp over it
 */

import Egg from '../egg'
import lamp from '../../../art/props/lamp'
import { STATS } from '../../constants'

export const ID = `state_${STATS.EGG}`

export default class Incubate extends Egg {
  constructor(savedState) {
    super(savedState)
    this.id = ID
    this.shaking = savedState.shaking
  }

  draw(g, x, y, friendo) {
    // draw egg and return tethers, etc.
    const s = super.draw(g, x, y, friendo)

    lamp(g, x, y)

    return s
  }
}
