import Exercise from './exercise'
import { ACTIONS } from '../../constants'
import ARead from '../../animation/read'

export const ID = ACTIONS.SIGHT

export default class ReadBook extends Exercise {
  constructor(savedState) {
    super(savedState)
    this.id = ID

    this.anim = new ARead(savedState, this.phrasebook)
  }
}
