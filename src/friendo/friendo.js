/**
 * Friendo class
 * Stores friendo stats, renders friendo at some desired coordinates
 */

/* eslint-disable no-console */

import {
  LVL_CALC_WHITELIST,
  MAX_DOGS,
  STATS,
  STAT_STAGES,
  STATES,
} from './constants'
import {
  LEG_UNLOCK_LEVEL,
  ARM_UNLOCK_LEVEL,
  HAIR_UNLOCK_LEVEL,
  DOG_UNLOCK_LEVEL,
  LEVEL_MAX,
  MAX_EGG_LEVEL,
  STAT_MAX,
  getExpCurve,
  MEME_EXP_MODIFIER,
  calcBellyCap,
  calcMaxEnergy,
  DEFAULT_LEVEL,
  DEFAULT_FATIGUE,
  DEFAULT_MAX_ENERGY,
  DEFAULT_MAX_BELLY, DEFAULT_HUNGER, HUNGER_MODIFIERS, BASE_HUNGER_MODIFIER,
} from './balance'
import { Dog, calcDogX, calcDogY } from './art/props/dog'
import selectElement from './element/select-element'
import loadState from './state/load-state'
import getZodiac from './horoscope/get-zodiac'
import {
  DEFAULT_NAME,
  DEFAULT_OWNER,
  DEFAULT_STATS,
  DEFAULT_ELEMENT,
  DEFAULT_STATE,
  DEFAULT_STAT_STAGES,
  DEFAULT_EXP,
  DEFAULT_ZODIAC,
  DEFAULT_FOOD_PREF,
} from './default'

export default class Friendo {
  // constructor takes context on which to draw
  constructor(json) {
    // initialize friendo from save file
    const fromJSON = JSON.parse(json || '{}')
    this._stats = fromJSON.stats || Object.assign({}, DEFAULT_STATS)
    this.state = fromJSON.state ? loadState(fromJSON.state, fromJSON.state.id) : DEFAULT_STATE
    this.name = fromJSON.name || DEFAULT_NAME
    this.owner = fromJSON.owner || DEFAULT_OWNER
    this.element = fromJSON.element ? selectElement(fromJSON.element) : DEFAULT_ELEMENT
    this.zodiac = fromJSON.zodiac ? getZodiac(fromJSON.zodiac) : DEFAULT_ZODIAC
    this.fatigue = fromJSON.fatigue || DEFAULT_FATIGUE
    this.exp = fromJSON.exp || DEFAULT_EXP
    this.hunger = fromJSON.hunger || DEFAULT_HUNGER
    this.foodPref = fromJSON.foodPref || DEFAULT_FOOD_PREF

    // set default derived values
    this._statStage = Object.assign({}, DEFAULT_STAT_STAGES)
    this.level = DEFAULT_LEVEL
    this.maxEnergy = DEFAULT_MAX_ENERGY
    this.maxBelly = DEFAULT_MAX_BELLY

    // initialize stat stages, level, and anchors
    this.initializeStatStages()
    this.updateLevel()
    this.element.computeAnchors(this)

    // establish UI listener fields
    this.onHeartbeat = () => {}
    this.onHatch = () => {}
    this.onStateChange = () => {}
    this.onStatUnlocked = () => {}
    this.onFoodPrefChange = () => {}
  }

  // helper method to create a friendo based on character creation
  static newFriendo(name, owner, element) {
    return new Friendo(JSON.stringify({ name, owner, element }))
  }

  // converts ya boi to a JSON string
  toJSON() {
    return {
      name: this.name,
      owner: this.owner,
      element: this.element,
      stats: this._stats,
      state: this.state,
      zodiac: this.zodiac,
      fatigue: this.fatigue,
      hunger: this.hunger,
      exp: this.exp,
      savedAt: new Date(), // not sure if this is operation is too expensive
      foodPref: this.foodPref,
    }
  }


  /** Sets */

  // UI listener setters
  setOnHeartbeat(ohb) { this.onHeartbeat = ohb }
  setOnHatch(oh) { this.onHatch = oh }
  setOnStateChange(osc) { this.onStateChange = osc }
  setOnStatUnlocked(osu) { this.onStatUnlocked = osu }
  setOnFoodPrefChange(ofpc) { this.onFoodPrefChange = ofpc }

  setElement(element) {
    this.element = selectElement(element)
    this.element.computeAnchors(this)
    console.log(`Element set to ${this.element}`)
  }

  // sets the value of a stat
  setStat(stat, value) {
    this._stats[stat] = value
    // recompute stage of stat
    this.setStatStage(stat)
    // recompute level
    this.updateLevel()
    // remember to recompute anchors for drawing
    this.element.computeAnchors(this)
  }

  // stat stage is used to draw the friendo
  setStatStage(stat) {
    const stages = STAT_STAGES[stat]

    // case where stat is scalar
    if (stages.length === 1) this._statStage[stat] = this.getStat(stat)
    else {
      // stage = index of largest threshold less than or equal to the stat level
      let stage = 0

      for (let i = 0; i < stages.length; i += 1) {
        if (this.getStat(stat) >= stages[i]) {
          stage = i + 1 // the stat stages are 1-indexed so you gotta correct
        }
      }

      this._statStage[stat] = stage
    }
  }

  // set new birthday
  setBirthday(date) {
    if (date) {
      this.zodiac = getZodiac(date)
    } else {
      this.zodiac = getZodiac()
    }
  }

  setState(id, reps) {
    // actually swtich the state
    this.state = loadState(this.state, id, reps)

    this.onStateChange(this)
  }

  // default food to use in feeding
  setFoodPref(pref) {
    if (pref <= this.getStatStage(STATS.TASTE)) {
      this.foodPref = pref
      this.onFoodPrefChange(pref)
    }
  }

  /** Gets */

  // stat combination by which maximum belly capacity scales
  getBellyFactor() {
    // combination of physical body stats
    return ((2 * this.getStat(STATS.CORE)) + this.getStat(STATS.ARM) + this.getStat(STATS.LEG)) / 4
  }

  getStat(stat) {
    if (stat in this._stats) return this._stats[stat]
    return 0
  }

  // For calculating rank-ups, since they happen in 10 stat intervals
  getStatStage(stat) {
    if (stat in this._statStage) return this._statStage[stat]
    return 0
  }

  // raw number of energy the friendo has remaining
  getNetEnergy() {
    return this.maxEnergy - this.fatigue
  }

  // returns percentage of energy the friendo currently has
  // !! as a decimal value !!
  getEnergyPercent() {
    return this.getNetEnergy() / this.maxEnergy
  }

  getNetBelly() {
    return this.maxBelly - this.hunger
  }

  getBellyPercent() {
    return this.getNetBelly() / this.maxBelly
  }

  // additive multiplier to energy recovery rate, based on hunger
  getHungerModifier() {
    for (let i = 0; i < HUNGER_MODIFIERS.length; i += 1) {
      if (this.getBellyPercent() >= HUNGER_MODIFIERS[i].threshold) {
        return HUNGER_MODIFIERS[i].value
      }
    }

    return BASE_HUNGER_MODIFIER
  }

  // exp multiplier based off meme tolerance
  getExpMultiplier() {
    return 1 + (this.getStat(STATS.MEME) * MEME_EXP_MODIFIER)
  }

  getExp(stat) {
    if (stat in this.exp) return this.exp[stat]
    return 0
  }

  // returns exp as a percentage of the exp needed for the level
  getExpPercent(stat) {
    if (stat in this.exp) {
      return this.exp[stat] / getExpCurve(stat)[this._stats[stat]]
    }
    return 0
  }

  // returns the amount of exp left till the next levelup for a stat
  getExpLeft(stat) {
    return getExpCurve(stat)[this._stats[stat]] - this.exp[stat]
  }

  // compute cumulative sum but skip the first level of each stat
  // only sum up stats that are exposed to the user, e.g. not egg, energy, etc.
  // used to calculate level
  getStatSum() {
    return LVL_CALC_WHITELIST.reduce((l, r) =>
      Number(l) + (this._stats[r] < 2 ? 0 : this._stats[r] - 1), 1)
  }


  /** Modifys */

  // adds energy to friendo's reserve
  modifyFatigue(amnt) {
    if (Number.isNaN(amnt)) {
      console.error(`Tried to modify fatigue by ${amnt}`)
      return
    }

    if (this.fatigue - amnt >= this.maxEnergy) this.fatigue = this.maxEnergy
    else if (this.fatigue - amnt <= 0) this.fatigue = 0
    else this.fatigue = this.fatigue - amnt
  }

  // adds belly to belly
  // feed = whether to factor in feeding multiplier
  modifyHunger(amnt) {
    if (Number.isNaN(amnt)) {
      console.error(`Tried to modify hunger by ${amnt}`)
      return
    }

    if (this.hunger - amnt >= this.maxBelly) this.hunger = this.maxBelly
    else if (this.hunger - amnt <= 0) this.hunger = 0
    else this.hunger = this.hunger - amnt
  }

  // adds exp for a given stat
  addExp(stat, amnt) {
    if (stat in this.exp) {
      // do nothing if stat is maxed out
      if (stat === STATS.EGG && this.getStat(STATS.EGG) === MAX_EGG_LEVEL) return
      else if (this.getStat(STATS.EGG) === STAT_MAX) return

      // increment exp amount, multiplied by a factor based on meme-tolerance
      this.exp[stat] += amnt * this.getExpMultiplier() * this.zodiac.getStatBonus(stat)

      // check to see if a levelup is possible
      const threshold = getExpCurve(stat)[this._stats[stat]]
      if (this.exp[stat] >= threshold) {
        this.exp[stat] -= threshold
        this.setStat(stat, this._stats[stat] + 1)
      }
    }
  }


  /** Internal utilities */

  // calls setStatStage on every stat
  // should only be called by the constructor
  initializeStatStages() {
    Object.keys(this._stats).forEach((key) => {
      this.setStatStage(key)
    })
  }

  computeLevel() {
    // if core == 0, we're still an egg
    if (this.getStat(STATS.CORE) === 0) return 0

    // if the sum of all stats is less than one, skip rest of calcs
    const statSum = this.getStatSum()
    if (statSum < 1) return 0

    const level = Math.floor((statSum / LEVEL_MAX) * 100) + 1

    // if level is greater than 100, just print a star
    if (level > 100) return String.fromCharCode(0x2605)
    return level
  }

  // compute level and set it in the friendo
  // also compute energy
  updateLevel() {
    this.level = this.computeLevel()
    this.maxEnergy = calcMaxEnergy(this.level)
    this.maxBelly = calcBellyCap(this.getBellyFactor())

    // check to see if any stats are unlocked
    if (this.getStat(STATS.LEG) < 1 && this.level >= LEG_UNLOCK_LEVEL) {
      this.setStat(STATS.LEG, 1)
      this.onStatUnlocked(this, STATS.LEG)
    }
    if (this.getStat(STATS.ARM) < 1 && this.level >= ARM_UNLOCK_LEVEL) {
      this.setStat(STATS.ARM, 1)
      this.onStatUnlocked(this, STATS.ARM)
    }
    if (this.getStat(STATS.HAIR) < 1 && this.level >= HAIR_UNLOCK_LEVEL) {
      this.setStat(STATS.HAIR, 1)
      this.onStatUnlocked(this, STATS.HAIR)
    }
    if (this.getStat(STATS.DOG) < 1 && this.level >= DOG_UNLOCK_LEVEL) {
      this.setStat(STATS.DOG, 1)
      this.onStatUnlocked(this, STATS.DOG)
    }
  }

  // Initialize pet dogs for the eventuality of them existing
  initializeDogs(canvasW, canvasH) {
    this.petDogs = {
      dog: [],
      location: [],
    }

    for (let i = 0; i < MAX_DOGS; i += 1) {
      this.petDogs.dog.push(new Dog())
      this.petDogs.location.push({ x: calcDogX(0, canvasW), y: calcDogY(0, canvasH) })
    }
  }


  /** Externally called methods  */

  // performs behaviors associated with hatching the egg and
  // ending the tutorial
  hatch() {
    this.setStat(STATS.CORE, 1)
    this.setStat(STATS.SIGHT, 1)
    this.setStat(STATS.TASTE, 1)
    this.setStat(STATS.MEME, 1)
    this.setState(STATES.IDLE)
    this.setBirthday() // get new birthday

    this.onHatch(this)
  }

  // draws the friendo to the context specified by g at specified coordinate
  draw(canvas, context, x = canvas.width / 2, y = canvas.height * (7 / 8)) {
    // draw dog(s)
    if (!this.petDogs) this.initializeDogs(canvas.width, canvas.height)
    else {
      const { dog, location } = this.petDogs
      for (let i = 0; i < this.getStatStage(STATS.DOG) && i < dog.length; i += 1) {
        dog[i].paint(context, location[i].x, location[i].y)
      }
    }

    // draw the friendo
    this.state.draw(context, x, y, this)
  }

  // perform one rep
  heartbeat() {
    // store stat, because if doRep causes a transition to a state without a stat
    // then the subsequent onHeartbeat call wont properly update the UI
    const s = this.state.stat
    this.state.doRep(this)
    this.onHeartbeat(this, (this.state.stat || s))
  }

  // handle messages directed at the friendo
  handleAction(action, reps) {
    return this.state.handleAction(this, action, reps)
  }
}
