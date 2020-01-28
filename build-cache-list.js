/**
 * This script builds a list of the files/directories that should be cached by the service worker.
 * This includes index.html, styles.css(.map), and the entirety of /res.
 * 
 * These need to be injected into the build because there's no other way for the service worker to
 * know about what needs to be cached before it is accessed.
 */

const fs = require('fs')
const path = require('path')

const RES_PATH = './res'
const RELATIVE_RES_PATH = path.resolve(__dirname, './res')
const BLACKLIST = [
  '/.nojekyll',
  '/.directory',
  '/img/.directory',
  '/img/bg/.directory',
  '/img/emoji/.directory',
  '/img/icons/.directory'
]

const findFilesToCache = (dir, addToList) => {
  const list = fs.readdirSync(dir)

  list.forEach((file) => {
    const filepath = path.resolve(dir, file)

    const stat = fs.statSync(filepath)
    const relativePath = path.relative(RELATIVE_RES_PATH, filepath)
    if (stat.isDirectory()) {
      addToList(`/${relativePath}/`)
      findFilesToCache(filepath, addToList)
    } else {
      addToList(`/${relativePath}`)
    }
  })
}

export const buildCacheList = () => {
  const paths = [
    '/index.html',
    '/styles.css',
    '/styles.css.map'
  ]

  findFilesToCache(RES_PATH, (filepath) => {
    // only add if not in blacklist
    if (BLACKLIST.indexOf(filepath) === -1) {
      paths.push(filepath)
    }
  })

  return paths
}
