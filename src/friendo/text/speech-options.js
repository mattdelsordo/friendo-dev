/**
* Classes to handle storing/loading templatable speech option strings
*/

import NULL_PHRASES from './phrases/null.json'

class SpeechOption {
  constructor(content) {
    this.content = content
  }

  format(friendo) {
    return this.content.replace(/\${friendo\.(.+?)}/g, (_, match1) => friendo[match1])
  }
}

export class SpeechOptions {
  constructor(jsonList = NULL_PHRASES, filter = () => true) {
    this.list = jsonList.filter(filter).map(phraseObj => new SpeechOption(phraseObj.phrase))
  }

  // pick an element from the list at random
  pick(friendo) {
    return this.list[Math.floor(Math.random() * this.list.length)].format(friendo)
  }
}
