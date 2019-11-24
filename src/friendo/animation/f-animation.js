import {
  BLINK_CHANCE,
  BLINK_TIME,
  SPEAK_CHANCE,
  SPEAK_TIME,
  TOTAL_EVENT_CHANCE,
} from '../constants'
import { left, right } from '../art/art-util'

/**
 * Class to handle default Friendo-Animation behavior
 * Do not use as an animation itself
 * "FAnimation" because "Animation" is a pre-existing class
 */

const FRAME_DELAY = 2

export default class FAnimation {
  constructor(old, phrasebook) {
    // carry over components of previous animation for continuity
    if (!old) old = {}
    this.blinkRate = old.blinkRate || BLINK_CHANCE
    this.speakRate = old.speakRate || SPEAK_CHANCE
    this.blink = old.blink || 0
    this.speak = old.speak || 0
    this.frame = 0
    this.tickCounter = old.frame || 0
    this.words = old.words || ''

    // define animation-specific parameters
    this.phrasebook = phrasebook
    this.frameDelay = FRAME_DELAY

    this.frames = [this.frame1]
  }

  toJSON() {
    return {
      blinkRate: this.blinkRate,
      speakRate: this.speakRate,
      words: this.words,
    }
  }

  frame1(g, x, y, friendo, blink, words) {
    // pre-compute constants for drawing for ease of readability
    const { thighGap, bodyOffset } = friendo.element
    const legBrush = friendo.element.legBrush(friendo)
    const armBrush = friendo.element.armBrush(friendo)
    const armOffset = {
      x: friendo.element.armOffset.xOffset,
      y: friendo.element.legHeight - friendo.element.armOffset.yOffset,
    }
    const armAngle = 0.25 // pi radians

    left(g, x - thighGap, y, legBrush) // left leg
    right(g, x + thighGap, y, legBrush) // right leg
    left(g, x - armOffset.x, y - armOffset.y, armBrush, armAngle)// left arm
    right(g, x + armOffset.x, y - armOffset.y, armBrush, armAngle)// right arm
    const computedTethers = friendo.element.drawCore(g, x, y - bodyOffset, friendo, blink)
    if (words) {
      friendo.element.speak(g, x + computedTethers.speech.x, computedTethers.speech.y, words)
    }
  }

  // prerequisite setup for the draw method
  predraw(g, x, y, friendo) {
    /**
     *  I know this is terrible practice but sorry yes my draw method has side effects
     */
    // handle blink
    if (this.blink > 0) {
      this.blink -= 1
    } else if (Math.random() * TOTAL_EVENT_CHANCE < this.blinkRate) {
      // not blinking, chance to blink
      this.blink = BLINK_TIME
    }

    // handle speech
    if (this.speak > 0) {
      // decrement speech timer if greater than 0
      this.speak -= 1
    } else if (Math.random() * TOTAL_EVENT_CHANCE < this.speakRate) {
      // chance to reset speech timer and pick a new phrase
      this.speak = SPEAK_TIME
      this.words = this.phrasebook.pick()
    } else {
      // if speak <= 0, don't speak
      this.words = ''
    }

    friendo.element.setColors(g)
  }

  draw(g, x, y, friendo) {
    this.predraw(g, x, y, friendo)

    // only update the frame if the delay has elapsed
    this.tickCounter = (this.tickCounter + 1) % this.frameDelay
    if (this.tickCounter === 0) this.frame = (this.frame + 1) % this.frames.length
    return this.frames[this.frame](g, x, y, friendo, this.blink, this.words)
  }
}
