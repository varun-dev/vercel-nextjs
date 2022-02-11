import { get, set, unset } from 'lodash'

const store = { windos: {} }

export const addWindo = (username, id, object) => {
  set(store.windos, `${username}.${id}`, object)
  return store.windos[username]
}

export const removeWindo = (username, id) => {
  unset(store.windos, `${username}.${id}`)
  return store.windos[username]
}

export const getWindos = username => get(store.windos, username)
