/**
 * Defines friendo behavior when performing leg exercises
 */

import Exercise from './exercise'
import ASquat from '../../animation/squat'
import { ACTIONS } from '../../constants'

export const ID = ACTIONS.LEG

export default class Squat extends Exercise {
  constructor(savedState) {
    super(savedState)
    this.id = ID

    this.anim = new ASquat(savedState, this.phrasebook)
  }
}
