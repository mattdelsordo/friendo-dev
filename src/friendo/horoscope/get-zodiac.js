/**
 * Takes in an optional date, returns the zodiac sign for the date
 */

import {
  Egg,
  Capricorn,
  Aquarius,
  Pisces,
  Aries,
  Taurus,
  Gemini,
  Cancer,
  Leo,
  Virgo,
  Libra,
  Scorpio,
  Sagittarius,
} from './zodiac'

export default (birth) => {
  // check if egg
  if (birth === '0') return new Egg()

  // Perform check for pre-existing date
  let date
  if (!birth) date = new Date()
  else date = new Date(birth)

  switch (date.getMonth()) {
    // Jan
    case 0:
      if (date.getDate() < 20) return new Capricorn(date)
      return new Aquarius(date)
    // Feb
    case 1:
      if (date.getDate() < 19) return new Aquarius(date)
      return new Pisces(date)
    // Mar
    case 2:
      if (date.getDate() < 21) return new Pisces(date)
      return new Aries(date)
    // Apr
    case 3:
      if (date.getDate() < 20) return new Aries(date)
      return new Taurus(date)
    // May
    case 4:
      if (date.getDate() < 21) return new Taurus(date)
      return new Gemini(date)
    // Jun
    case 5:
      if (date.getDate() < 21) return new Gemini(date)
      return new Cancer(date)
    // Jul
    case 6:
      if (date.getDate() < 23) return new Cancer(date)
      return new Leo(date)
    // Aug
    case 7:
      if (date.getDate() < 23) return new Leo(date)
      return new Virgo(date)
    // Sep
    case 8:
      if (date.getDate() < 23) return new Virgo(date)
      return new Libra(date)
    // Oct
    case 9:
      if (date.getDate() < 23) return new Libra(date)
      return new Scorpio(date)
    // Nov
    case 10:
      if (date.getDate() < 22) return new Scorpio(date)
      return new Sagittarius(date)
    // Dec
    case 11:
      if (date.getDate < 22) return new Sagittarius(date)
      return new Capricorn(date)
    default:
      throw new Error(`Didn't recognize month ${date.getMonth()}`)
  }
}
