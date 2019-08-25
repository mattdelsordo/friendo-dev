/**
 * Incubation stat extends egg state to draw the incubation lamp over it
 * TECHNICALLY this is an exercise but it shares more code with the egg class
 */

import AIncubate from '../../animation/incubate'
import { ACTIONS } from '../../constants'
import Exercise from './exercise'
import { ID as eggID } from '../idle/egg'

export const ID = ACTIONS.EGG

export default class Incubate extends Exercise {
  constructor(savedState) {
    super(savedState)
    this.id = ID

    this.returnTo = eggID
    this.anim = new AIncubate(savedState, () => [''])
  }
}
