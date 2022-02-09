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
  _prop,
} from 'https://gist.githubusercontent.com/varun-dev/8d4254c2dbc45e2d5c9d336ae367472a/raw/11d1819a9f7bc9885f04ee7ba15b88b4421f8872/list-utils.js'

export const _keyValues = (list, key, valueKey) =>
  list.reduce((resp, item) => {
    resp[item[key]] = item[valueKey]
    return resp
  }, {})
