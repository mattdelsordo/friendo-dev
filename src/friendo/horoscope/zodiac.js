/**
 * This class handles storing birthday information and tracks what
 * bonuses certain stats get based on horoscope
 */

import { ACTIONS, STATS } from '../constants'

class Zodiac {
  constructor(birthtime) {
    this.birthday = birthtime // this should be a Date object
    this.sign = 'zodiac'
    this.symbol = '_'
    this.color = '#FFFFFF'
  }

  toJSON() {
    return this.birthday.toString()
  }

  // Returns the modifier by which to MULTIPLY the relevant stat increase
  getStatBonus() {
    return 1
  }

  getBirthday() {
    return this.birthday.toDateString()
  }

  // returns true if it is the friendo's birthday
  isBirthday() {
    const today = new Date()
    if (today.getMonth() === this.birthday.getMonth()
      && today.getDate() === this.birthday.getDate()
      && today.getFullYear() > this.birthday.getFullYear()) {
      return true
    }
    return false
  }

  // calculates the friendo's age
  getAge() {
    // convert difference in times to days
    const days = (new Date() - this.birthday) / 86400000
    if (days < 365) {
      return `${Math.floor(days)} days`
    }
    return `${Math.floor(days / 365)} yrs.`
  }
}

// default zodiac sign - a birthdayless egg
export class Egg extends Zodiac {
  constructor() {
    super(0)
    this.sign = 'Egg'
    this.symbol = '1f95a'
  }

  isBirthday() { return false }

  getAge() { return 0 }

  getBirthday() { return '???' }
}

export class Aries extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Aries'
    this.symbol = '2648'
  }

  getStatBonus(stat) {
    if (stat === STATS.SIGHT) return 1.1
    return 1
  }
}

export class Taurus extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Taurus'
    this.symbol = '2649'
  }

  getStatBonus(stat) {
    if (stat === ACTIONS.SLEEP) return 1.2
    return 1
  }
}

export class Gemini extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Gemini'
    this.symbol = '264A'
  }

  getStatBonus(stat) {
    if (stat === STATS.ARM) return 1.1
    return 1
  }
}

export class Cancer extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Cancer'
    this.symbol = '264B'
  }

  getStatBonus(stat) {
    if (stat === STATS.MEME) return 1.1
    return 1
  }
}

export class Leo extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Leo'
    this.symbol = '264C'
  }

  getStatBonus(stat) {
    if (stat === STATS.CORE) return 1.1
    return 1
  }
}

export class Virgo extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Virgo'
    this.symbol = '264D'
  }

  getStatBonus(stat) {
    if (stat === STATS.TASTE) return 1.1
    return 1
  }
}

export class Libra extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Libra'
    this.symbol = '264E'
  }

  getStatBonus(stat) {
    if (stat === STATS.SIGHT
      || stat === STATS.ARM
      || stat === STATS.LEG
      || stat === STATS.CORE
      || stat === STATS.HAIR
      || stat === STATS.TASTE
      || stat === STATS.DOG
      || stat === STATS.MEME
    ) return 1.05
    return 1
  }
}

export class Scorpio extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Scorpio'
    this.symbol = '264F'
  }

  getStatBonus(stat) {
    if (stat === ACTIONS.PET) return 1.2
    return 1
  }
}

export class Sagittarius extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Sagittarius'
    this.symbol = '2650'
  }

  getStatBonus(stat) {
    if (stat === STATS.LEG) return 1.1
    return 1
  }
}

export class Capricorn extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Capricorn'
    this.symbol = '2651'
  }

  getStatBonus(stat) {
    if (stat === STATS.HAIR) return 1.1
    return 1
  }
}

export class Aquarius extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Aquarius'
    this.symbol = '2652'
  }

  getStatBonus(stat) {
    if (stat === STATS.DOG) return 1.1
    return 1
  }
}

export class Pisces extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Pisces'
    this.symbol = '2653'
  }

  getStatBonus(stat) {
    if (stat === ACTIONS.FEED) return 1.2
    return 1
  }
}
