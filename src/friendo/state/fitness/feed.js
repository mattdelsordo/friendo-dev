import Exercise from './exercise'
import phrasebook from '../../phrases/feed-phrases'
import { ACTIONS } from '../../constants'
import AFeed from '../../animation/feed'

export const ID = ACTIONS.FEED

export default class Feed extends Exercise {
  constructor(savedState) {
    super(savedState)
    this.id = ID

    this.anim = new AFeed(savedState.anim, phrasebook)
  }
}
