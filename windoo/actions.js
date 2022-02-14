import { initializeApp as initialiseFirebaseApp } from 'firebase/app'
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  set,
  update,
} from 'firebase/database'
import { Actions } from 'flexlayout-react'
import { omit, size } from 'lodash'
import { getTabConfig } from './config'
import { firebaseConfig } from './firebase'
import { log } from './helpers'

let db

export async function initialiseApp(username) {
  const app = initialiseFirebaseApp(firebaseConfig)
  db = getDatabase(app)
  const dbRef = ref(db)
  const snapshot = await get(child(dbRef, 'windos/' + username))
  return snapshot.val() || {}
}

export const actionSendWindo = (username, windos, windoId, model, tab) => {
  // console.log('enterig sendWindo', tab)
  const otherWindos = omit(windos, windoId)
  // log(
  //   'windos',
  //   windos,
  //   '\notherWindos',
  //   otherWindos,
  //   '\nwindoId',
  //   windoId
  // )

  if (size(otherWindos) === 1) {
    const id = Object.keys(otherWindos)[0]
    // const targetWindow = otherWindos[id]
    set(ref(db, `windos/${username}/${id}/message`), tab)
    model.doAction(Actions.deleteTab(tab.id))
  } else {
    log('No other window')
  }
}

export async function initaliseWindow(username, windoId) {
  let windos = await initialiseApp(username)
  let windo = windos[windoId]
  let pos
  let config
  if (!windo) {
    pos = size(windos) + 1
    config = getTabConfig(pos)
    const newWindow = {
      [windoId]: { pos, config, windoId, message: {} },
    }
    await update(ref(db, 'windos/' + username), newWindow)
    windos = { ...windos, ...newWindow }
  } else {
    config = windo.config
    pos = windo.pos
  }
  return { config, pos, windos }
}

export function onNewWindos(username, fn) {
  onValue(ref(db, `windos/${username}`), snapshot => {
    const newWindos = snapshot.val()
    fn(newWindos)
  })
}

export function onNewTab(username, windoId) {
  const tabRef = ref(db, `windos/${username}/${windoId}/message`)
  onValue(tabRef, snapshot => {
    const newTab = snapshot.val()
    if (!newTab) return null
    set(ref(db, `windos/${username}/${windoId}/message`), null)
  })
}
