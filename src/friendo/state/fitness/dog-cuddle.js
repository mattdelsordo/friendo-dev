import Exercise from './exercise'
import { ACTIONS } from '../../constants'
import ACuddle from '../../animation/dog-cuddle'

export const ID = ACTIONS.DOG

export default class DogCuddle extends Exercise {
  constructor(savedState) {
    super(savedState)
    this.id = ID

    this.anim = new ACuddle(savedState, this.phrasebook)
  }
}
