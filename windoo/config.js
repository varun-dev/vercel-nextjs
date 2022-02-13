import { createContext } from 'react'

export const UserContext = createContext({ username: '' })

export const getTabConfig = pos => ({
  global: { tabEnableClose: false },
  borders: [
    {
      type: 'border',
      location: 'left',
      size: 100,
      children: [getTab(pos, 0)],
    },
  ],
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
    config: { pos, tab },
  }
}

function getHeaderTab() {
  return {
    type: 'tab',
    name: 'Header',
    component: 'Header',
    enableDrag: false,
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
    children: [getHeaderTab()],
  }
}
function getContentTabset(pos) {
  return pos > 1 ? getEmptyTabset(pos) : getMainContentTabset(pos)
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
        children: [getTab(pos, pos * 2), getEmptyTab()],
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
    component: 'Send window from main window',
    enableDrag: false,
  }
}
