import { ACTIONS } from '../../constants'
import Exercise from './exercise'
import AGroom from '../../animation/groom'

export const ID = ACTIONS.HAIR

export default class Groom extends Exercise {
  constructor(savedState) {
    super(savedState)
    this.id = ID

    this.anim = new AGroom(savedState, this.phrasebook)
  }
}
