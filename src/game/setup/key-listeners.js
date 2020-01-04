// when the user hits enter, it should trigger the most-visible button

import $ from 'jquery'

let enterButton = null
export const setEnterButton = (b) => { enterButton = b }
export const unsetEnterButton = () => { enterButton = null }

let focusedNumberInput = null
export const setNumberInput = (u) => { focusedNumberInput = u }
export const unsetNumberInput = () => { focusedNumberInput = null }

export const initializeKeyListeners = () => {
  $(document).keypress((e) => {
    if (enterButton && e.which === 13) {
      $(enterButton).click()
    }
  }).keydown((e) => {
    // listen to arrow keys to control number inputs
    if (focusedNumberInput && e.which === 38) {
      // if below 0, just skip to 0
      $(focusedNumberInput).val((i, old) => ((old < 0) ? 0 : Number(old) + 1))
    }
    if (focusedNumberInput && e.which === 40) {
      // don't decrement if already at 0
      $(focusedNumberInput).val((i, old) => ((old <= 0) ? 0 : Number(old) - 1))
    }
  })
}

