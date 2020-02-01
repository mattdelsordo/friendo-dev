import { EmptyPhrasebook } from './phrasebook'
import FEED_PHRASES from '../phrases/feed.json'

export class FeedPhrasebook extends EmptyPhrasebook {
  constructor() {
    super()
    this.basePhraseJson = FEED_PHRASES
  }
}
