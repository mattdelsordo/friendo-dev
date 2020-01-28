/**
 * Listeners for header
 */

import $ from 'jquery'
import {
  VERSION,
  reload,
  erase,
  saveFriendo,
  storeSavefile,
  cachedVersionMismatch,
  daysSinceLastRelease,
} from '../game-util'

/** DNA Management functions */
/* eslint-disable no-alert */
// reloads the page without saving the friendo
const forceReloadPage = () => {
  // remove save listeners on the window so that it doesnt save after you erase
  $(window).off('blur unload')
  reload()
}

const deleteFriendo = (friendo) => {
  if (!friendo) {
    alert('No Friendo DNA found!')
  } else if ($('#delete-check1').prop('checked') && $('#delete-check2').prop('checked')) {
    // handle deletion flavor text
    if (friendo.level >= 1) {
      alert(`"... ${friendo.owner}... goodbye..."`)
    } else {
      alert('You hear a cracking noise as the egg fades into nothingness.')
    }

    // delete friendo and refresh
    erase()
    forceReloadPage()
  }
}

// downloads friendo as a file
const downloadFriendo = (friendo) => {
  if (!friendo) {
    alert('No Friendo DNA found!')
  } else {
    // save friendo and get the compressed string back
    const saveString = saveFriendo(friendo)
    const pom = document.createElement('a')
    pom.setAttribute('href', `data:text/plain;charset=utf-8,${saveString}`)
    pom.setAttribute('download', `${friendo.name.toLowerCase()}.friendo`)

    if (document.createEvent) {
      const event = document.createEvent('MouseEvents')
      event.initEvent('click', true, true)
      pom.dispatchEvent(event)
    } else {
      pom.click()
    }
  }
}

// load friendo from file
const loadFriendo = () => {
  const savefile = document.getElementById('selectDNA').files[0]
  if (savefile) {
    const reader = new FileReader()
    reader.onload = (e) => {
      storeSavefile(e.target.result)
      forceReloadPage()
    }
    reader.readAsText(savefile)
  }
}

/* eslint-enable no-alert */

export default () => {
  $('#vernum').html(`[v${VERSION}]`).attr('href', `https://github.com/mattdelsordo/friendo/releases/tag/v${VERSION}`)

  // show new version alert if necessary
  const showUpdateAlert = cachedVersionMismatch() || daysSinceLastRelease() < 5
  if (showUpdateAlert) {
    $('#version-link').css('visibility', 'visible').addClass('new-version-alert')
  }

  $('#game-info-icon').mouseenter(() => {
    // make links visible, change icon to open book
    $('#version-link, .header-btn').css('visibility', 'visible')
    $('#game-info-icon').attr('src', './img/emoji/1f4d6.png')
  })

  $('#header').mouseleave(() => {
    // hide links, close book
    $('.header-btn').css('visibility', 'hidden')
    // only hide version link if we aren't notifying of an update
    if (!showUpdateAlert) {
      $('#version-link').css('visibility', 'hidden')
    }
    $('#game-info-icon').attr('src', './img/emoji/1f516.png')
  })

  $('#delete-btn').click(() => {
    deleteFriendo()
  })

  $('#backup-btn').click(() => {
    downloadFriendo()
  })

  // make sure upload label actually shows the name of the file
  $('#selectDNA').on('change', function onSelectDNAChange() {
    if (this.files[0].name) {
      $('#selectDNAlabel').html(this.files[0].name)
    }
  })

  $('#uploadDNA').click(() => {
    loadFriendo()
  })

  /** Enable Add to Homescreen (works in Chrome at time of writing) */
  let A2HSEvent
  window.addEventListener('beforeinstallprompt', (e) => {
    A2HSEvent = e
    $('#btn-a2hs').css('display', 'inline-block')
  })

  $('#btn-a2hs').click(() => {
    A2HSEvent.prompt()
    A2HSEvent.userChoice.then((choiceResult) => {
      // if the choice is accepted, re-hide the button
      if (choiceResult.outcome === 'accepted') {
        $('#btn-a2hs').css('display', 'none')
      }
    })
  })
}

export const updateDelete = (friendo) => {
  $('#delete-btn').off('click').click(() => {
    deleteFriendo(friendo)
  })
}

export const updateDownload = (friendo) => {
  $('#backup-btn').off('click').click(() => {
    downloadFriendo(friendo)
  })
}
