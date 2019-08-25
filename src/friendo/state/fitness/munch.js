import Exercise from './exercise'
import { ACTIONS } from '../../constants'
import AMunch from '../../animation/munch'

export const ID = ACTIONS.TASTE

export default class Munch extends Exercise {
  constructor(savedState) {
    super(savedState)
    this.id = ID

    this.anim = new AMunch(savedState, this.phrasebook)
  }
}
