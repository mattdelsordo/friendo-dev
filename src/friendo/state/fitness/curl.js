
import Exercise from './exercise'
import { ACTIONS } from '../../constants'
import ACurl from '../../animation/curl'

export const ID = ACTIONS.ARM

export default class Curls extends Exercise {
  constructor(savedState) {
    super(savedState)
    this.id = ID

    this.anim = new ACurl(savedState, this.phrasebook)
  }
}
