import { initializeApp as initialiseFirebaseApp } from 'firebase/app'
import {
  child,
  get,
  getDatabase,
  onDisconnect,
  ref,
  set,
  update,
} from 'firebase/database'
import { size } from 'lodash'
import { getTabConfig } from './config'
import { firebaseConfig } from './firebase'
import { deviceType } from './helpers'

export let db

export const STATUS = {
  CONNECTED: 'CONNECTED',
  DISCONNECTED: 'DISCONNECTED',
  INACTIVE: 'INACTIVE',
}

export async function initialiseApp(username) {
  const app = initialiseFirebaseApp(firebaseConfig)
  db = getDatabase(app)
  const dbRef = ref(db)
  const snapshot = await get(child(dbRef, 'windos/' + username))
  return snapshot.val() || {}
}

export const actionSendWindo = (username, windos, targetWindoId, tab) => {
  // log('Sending tab to', targetWindoId, tab)
  // const { windoId } = find(windos, { windoId: targetWindoId })
  // log(
  //   'windos',
  //   windos,
  //   '\notherWindos',
  //   otherWindos,
  //   '\nwindoId',
  //   windoId
  // )

  // const targetWindow = otherWindos[id]
  set(ref(db, `windos/${username}/${targetWindoId}/message`), tab)
    .then(result => {
      // log('After setting tab', result)
    })
    .catch(e => console.error(e))
}

export async function initaliseWindow(username, windoId) {
  let windos = await initialiseApp(username)
  let windo = windos[windoId]
  let pos
  let config
  if (!windo || !windo.config) {
    pos = size(windos) + 1
    config = getTabConfig(pos)
    const newWindow = {
      [windoId]: {
        pos,
        config,
        windoId,
        message: {},
        status: STATUS.CONNECTED,
        deviceType,
      },
    }
    // console.log('db: creating new windo', newWindow)
    await update(ref(db, 'windos/' + username), newWindow)
    windos = { ...windos, ...newWindow }
  } else {
    config = windo.config
    pos = windo.pos
    await setStatus(username, windoId, STATUS.CONNECTED)
  }
  const windoStatusRef = ref(db, `windos/${username}/${windoId}/status`)
  await onDisconnect(windoStatusRef).set('DISCONNECTED')

  document.addEventListener('visibilitychange', function (event) {
    const status = document.hidden ? STATUS.INACTIVE : STATUS.CONNECTED
    setStatus(username, windoId, status)
  })
  return { config, pos, windos }
}

async function setStatus(username, windoId, status) {
  if (!username || !windoId || !status) {
    // log('Retuning from setStatus')
    return
  }
  try {
    const windoStatusRef = ref(db, `windos/${username}/${windoId}/status`)
    // log(
    //   'db: setting status for existing window, key:',
    //   windoStatusRef.key
    // )
    await set(windoStatusRef, status)
  } catch (e) {}
}
