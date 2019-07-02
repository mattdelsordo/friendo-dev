import State from '../state'
import { ACTIONS } from '../../constants'
import phrasebook from '../../phrases/idle-phrases'
import APet from '../../animation/pet'

export const ID = ACTIONS.PET

export default class Petting extends State {
  constructor(savedState) {
    super(savedState)
    this.id = ID

    this.anim = new APet(savedState.old, phrasebook)
  }
}
