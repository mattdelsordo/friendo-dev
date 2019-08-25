/**
 * Defines friendo behavior when performing core exercises
 */

import Exercise from './exercise'
import { ACTIONS } from '../../constants'
import ASitup from '../../animation/situp'

export const ID = ACTIONS.CORE

export default class Situp extends Exercise {
  constructor(savedState) {
    super(savedState)
    this.id = ID
    this.anim = new ASitup(savedState, this.phrasebook)
  }
}
