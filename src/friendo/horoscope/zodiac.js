/**
 * This class handles storing birthday information and tracks what
 * bonuses certain stats get based on horoscope
 */

import STATS from '../constants'

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

export class Aries extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Aries'
    this.symbol = '\u2648'
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
    this.symbol = '\u2649'
  }

  getStatBonus(stat) {
    if (stat === STATS.SLEEP) return 1.2
    return 1
  }
}

export class Gemini extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Gemini'
    this.symbol = '\u264A'
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
    this.symbol = '\u264B'
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
    this.symbol = '\u264C'
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
    this.symbol = '\u264D'
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
    this.symbol = '\u264E'
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
    this.symbol = '\u264F'
  }

  getStatBonus(stat) {
    if (stat === STATS.PET) return 1.2
    return 1
  }
}

export class Sagittarius extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Sagittarius'
    this.symbol = '\u2650'
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
    this.symbol = '\u2651'
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
    this.symbol = '\u2652'
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
    this.symbol = '\u2653'
  }

  getStatBonus(stat) {
    if (stat === STATS.FOOD) return 1.2
    return 1
  }
}
