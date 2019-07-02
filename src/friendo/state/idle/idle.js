import State from '../state'
import phrasebook from '../../phrases/idle-phrases'
import AIdle from '../../animation/idle'

export const ID = 'state_idle'

export default class Idle extends State {
  constructor(savedState) {
    super(savedState)
    this.id = ID

    this.phrasebook = phrasebook

    this.anim = new AIdle(savedState.anim, phrasebook)

    this.returnTo = this.id
  }
}
