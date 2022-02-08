// A bit of immutability and functional programming fun with Vanilla JS

export const _prop = key => o => o[key]

// Comparator - not equal to props
export const _neProp = (key, value) => o => o[key] !== value

// Comparator - equal to props
export const _eqProp = (key, value) => o => o[key] === value

// Comparator - not equal to index where index as 2nd argument
export const _neIndex = index => (_, i) => index !== i

// Append an element at end of array
export const _append = (list, element) => list.concat([element])

// Remove element at index
export const _remove = (list, index) => list.filter(_neIndex(index))

// Remove element by prop
export const _removeBy = (list, key, value) => list.filter(_neProp(key, value))

// update an element at index
export const _update = (list, element, index) => {
  const newList = list.concat([])
  newList[index] = { ...newList[index], ...element }
  return newList
}

// update element
export const _updateBy = (list, element, key, value) => {
  const index = list.findIndex(_eqProp(key, value))
  return index === -1 ? list : _update(list, element, index)
}

// Function filters and maps in one iteration
export const _filterAndMap = (list, filterComparator, mappingFunction) => {
  return list.reduce((r, o) => {
    if (filterComparator(o)) {
      r.push(mappingFunction(o))
    }
    return r
  }, [])
}
