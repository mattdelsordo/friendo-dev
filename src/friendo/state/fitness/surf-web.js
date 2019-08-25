import Exercise from './exercise'
import { ACTIONS } from '../../constants'
import ASurf from '../../animation/surf-web'

export const ID = ACTIONS.MEME

export default class SurfWeb extends Exercise {
  constructor(savedState) {
    super(savedState)
    this.id = ID

    this.anim = new ASurf(savedState, this.phrasebook)
  }
}
