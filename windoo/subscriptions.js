import { onValue, ref, set } from 'firebase/database'
import { db } from './actions'
import { magicTab } from './config'

export function onNewWindos(username, fn) {
  return onValue(ref(db, `windos/${username}`), snapshot => {
    const newWindos = snapshot.val()
    // console.log('new windows', newWindos)
    fn(newWindos)
  })
}

export function onStatusChange(username, windoId, fn) {
  try {
    const windoRef = ref(db, `windos/${username}/${windoId}`)
    return onValue(windoRef, snapshot => {
      const newStatus = snapshot.val()
      fn(newStatus)
    })
  } catch (e) {}
}

export function onNewTab(username, windoId, fn) {
  const windoRef = ref(db, `windos/${username}/${windoId}/message`)
  return onValue(windoRef, snapshot => {
    const newTab = snapshot.val()
    // console.log('On new tab', newTab)
    if (!newTab) return null
    magicTab(true)
    fn(newTab)
    set(ref(db, `windos/${username}/${windoId}/message`), null)
  })
}
