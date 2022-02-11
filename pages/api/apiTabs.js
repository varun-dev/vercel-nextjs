import { uniqueId } from 'lodash'
import { serverApiWrapper as $ } from '../../utils/api-utils'
import { addWindo, getWindos, removeWindo } from '../../windoo/server-store'

const handlers = {
  GET: ({ username }) => getWindos(username),
  POST: ({ username }) => {
    const id = uniqueId(`${username}_`)
    const windos = addWindo(username, id, {})
    return { id, windos }
  },
  PUT: ({ username, id, windo }) => {
    addWindo(username, id, windo)
  },
  DELETE: ({ username, id }) => {
    removeWindo(username, id)
  },
}

export default $(async function APIWindo(props, method) {
  return handlers[method](props)
})
