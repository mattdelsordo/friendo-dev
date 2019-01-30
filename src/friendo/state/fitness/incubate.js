/**
 * Incubation stat extends egg state to draw the incubation lamp over it
 * TECHNICALLY this is an exercise but it shares more code with the egg class
 */

import Egg from '../idle/egg'
import lamp from '../../art/props/lamp'
import { ACTIONS } from '../../constants'

export const ID = ACTIONS.EGG

export default class Incubate extends Egg {
  constructor(savedState) {
    super(savedState)
    this.id = ID
  }

  draw(g, x, y, friendo) {
    // draw egg and return tethers, etc.
    const s = super.draw(g, x, y, friendo)

    lamp(g, x, y)

    return s
  }
}
