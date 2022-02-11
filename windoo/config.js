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
        type: 'tabset',
        weight: 50,
        selected: 0,
        children: [getTab(pos, pos * 2)],
      },
      {
        type: 'tabset',
        weight: 50,
        selected: 0,
        children: [getTab(pos, pos * 2 + 1)],
      },
    ],
  },
})

function getTab(pos, tab) {
  return {
    type: 'tab',
    name: `Windo ${pos} : Tab ${tab}`,
    component: tab,
  }
}
