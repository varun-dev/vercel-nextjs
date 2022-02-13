import { isNumber } from 'lodash'
import { createContext } from 'react'

export const UserContext = createContext({ username: '' })
export const WindoContext = createContext({})

export const getTabConfig = pos => ({
  global: { tabEnableClose: false },
  // borders:
  //   pos === 1
  //     ? [
  //         {
  //           type: 'border',
  //           location: 'left',
  //           size: 100,
  //           children: [getTab(pos, 0)],
  //         },
  //       ]
  //     : [],
  layout: {
    type: 'row',
    weight: 100,
    children: [
      {
        type: 'row',
        weight: 50,
        children: [getHeaderTabset(pos), getContentTabset(pos)],
      },
    ],
  },
})

function getTab(pos, tab, enableDrag = true) {
  return {
    type: 'tab',
    name: 'App Window',
    component: 'tab',
    enableDrag,
    config: { pos, tab, style: { backgroundColor: getColor(tab) } },
  }
}

function getHeaderTab(pos) {
  return {
    type: 'tab',
    name: 'Header',
    component: 'Header',
    enableDrag: false,
    config: { pos },
  }
}

function getHeaderTabset(pos) {
  return {
    type: 'tabset',
    height: 100,
    selected: 0,
    enabbleDrag: false,
    enableDrop: false,
    enableDivide: false,
    enableMaximize: false,
    enableClose: false,
    enableTabStrip: false,
    children: [getHeaderTab(pos)],
  }
}
function getContentTabset(pos) {
  return pos > 1 ? getEmptyTabset(pos) : getMainContentTabset(pos)
}

export function getMagicTab(pos) {
  return {
    type: 'tab',
    name: 'Magic Tab',
    component: 'Magic App',
    id: 'magicTab',
    config: {
      pos,
      tab: 1,
      style: { backgroundColor: 'purple', color: 'white' },
    },
  }
}

function getMainContentTabset(pos) {
  return {
    type: 'row',
    weight: 50,
    children: [
      {
        type: 'tabset',
        weight: 50,
        selected: 0,
        id: 'contentTabset',
        children: [getMagicTab(pos), getEmptyTab()],
      },
      {
        type: 'tabset',
        weight: 50,
        selected: 0,
        children: [getTab(pos, pos * 2 + 1)],
      },
    ],
  }
}

function getEmptyTabset(pos) {
  return {
    type: 'row',
    weight: 50,
    children: [
      {
        type: 'tabset',
        weight: 50,
        selected: 0,
        id: 'contentTabset',
        children: [getEmptyTab()],
      },
    ],
  }
}

function getEmptyTab() {
  return {
    type: 'tab',
    id: 'emptyTab',
    name: 'Empty',
    component: 'Empty Window',
    enableDrag: false,
  }
}

function getColor(n) {
  return isNumber(n) ? `hsl(${n * 50}0,50%,50%)` : '#fff'
}
export const defaultStyles = { backgroundColor: 'white' }
