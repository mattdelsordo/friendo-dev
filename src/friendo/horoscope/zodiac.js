/**
 * This class handles storing birthday information and tracks what
 * bonuses certain stats get based on horoscope
 */

class Zodiac {
  constructor(birthtime) {
    this.birthday = birthtime // this should be a Date object
    this.sign = 'zodiac'
    this.symbol = '_'
    this.color = '#FFFFFF'
  }

  toJSON() {
    return this.birthday
  }

  // Returns the modifier by which to MULTIPLY the relevant stat increase
  getStatBonus() {
    return 1
  }

  getBirthday() {
    return this.birthday.toDateString()
  }
}

export class Aries extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Aries'
    this.symbol = '\u2648'
  }
}

export class Taurus extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Taurus'
    this.symbol = '\u2649'
  }
}

export class Gemini extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Gemini'
    this.symbol = '\u264A'
  }
}

export class Cancer extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Cancer'
    this.symbol = '\u264B'
  }
}

export class Leo extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Leo'
    this.symbol = '\u264C'
  }
}

export class Virgo extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Virgo'
    this.symbol = '\u264D'
  }
}

export class Libra extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Libra'
    this.symbol = '\u264E'
  }
}

export class Scorpio extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Scorpio'
    this.symbol = '\u264F'
  }
}

export class Sagittarius extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Sagittarius'
    this.symbol = '\u2650'
  }
}

export class Capricorn extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Capricorn'
    this.symbol = '\u2651'
  }
}

export class Aquarius extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Aquarius'
    this.symbol = '\u2652'
  }
}

export class Pisces extends Zodiac {
  constructor(birthtime) {
    super(birthtime)
    this.sign = 'Pisces'
    this.symbol = '\u2653'
  }
}
