/**
 * Experimental feature test
 * https://nextjs.org/docs/api-reference/next.config.js/url-imports
 *
 * Importing code from github gist
 * https://gist.github.com/varun-dev/8d4254c2dbc45e2d5c9d336ae367472a
 */
export {
  _append,
  _filterAndMap,
  _removeBy,
  _updateBy,
  _eqProp,
  _neProp,
  _prop,
  _prepend,
  _keyValues,
} from 'https://gist.githubusercontent.com/varun-dev/8d4254c2dbc45e2d5c9d336ae367472a/raw/dc266e9b59cb3827bbd6259c5bad026f66a89353/list-utils.js'

export function mapObject(o, key, valueKey) {
  const resp = {}
  for (let w in o) {
    const k = o[w][key]
    const v = o[w][valueKey]
    resp[k] = v
    // console.log('mapObject', o, w, k, v)
  }
  return resp
}
