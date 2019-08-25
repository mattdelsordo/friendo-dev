/**
 * Define behavior for a sleeping friendo
 */

import phrasebook from '../../phrases/sleep-phrases'
import { ACTIONS } from '../../constants'
import Exercise from './exercise'
import ASleep from '../../animation/sleep'

export const ID = ACTIONS.SLEEP

export default class Sleep extends Exercise {
  constructor(savedState) {
    super(savedState)
    this.id = ID

    this.anim = new ASleep(savedState.anim, phrasebook)
  }
}
