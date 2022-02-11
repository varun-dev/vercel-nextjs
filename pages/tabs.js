import { Actions, DockLocation, Layout, Model } from 'flexlayout-react'
import 'flexlayout-react/style/light.css'
import { pick, size } from 'lodash'
import { useEffect, useState } from 'react'
import { Col, Row } from '../styles/grid-components'
import { clientApiWrapper as $ } from '../utils/api-utils'
import { getTabConfig } from '../windoo/config'
import { initialiseSocket, sendMessage } from '../windoo/socket-client'

const username = 'test'

export default function Tabs() {
  const [windoId, setWindoId] = useState('')
  const [pos, setPos] = useState(0)
  const [model, setModel] = useState()
  // const [windos, setWindos] = useState([])

  const onWindoChange = windos => {
    console.log('changedWindows', windos)
  }

  const onNewWindo = windo => {
    const parent = model.getRoot().getChildren()[0]
    try {
      model.doAction(
        Actions.addNode(windo, parent.getId(), DockLocation.CENTER, 0, true)
      )
    } catch (e) {}
  }

  useEffect(() => {
    const init = async () => {
      const { id, windos } = await $('apiTabs', { username })
      const _pos = size(windos)
      setWindoId(id)
      setPos(_pos)
      setModel(Model.fromJson(getTabConfig(_pos)))
      // setWindos(windos)
      document.title = `Windoo ${_pos}`
    }
    init()
    return async () =>
      await $({ apiName: 'apiTabs', method: 'DELETE' }, { username })
  }, [])

  useEffect(() => {
    if (model && windoId) {
      initialiseSocket({ username, id: windoId }, { onWindoChange, onNewWindo })
    }
  }, [model, windoId])

  const onContextMenu = ({ _attributes }, e) => {
    e.preventDefault()
    if (_attributes.type === 'tab') {
      const windo = pick(_attributes, ['id', 'type', 'component', 'name'])
      model.doAction(Actions.deleteTab(windo.id))
      sendMessage('move-window', windo)
    }
  }

  return !model ? null : (
    <Layout
      model={model}
      factory={factory.bind({ pos })}
      onContextMenu={onContextMenu}
    />
  )
}

function factory(node) {
  let Component = node.getComponent()
  return (
    <Row css={{ height: '100%', backgroundColor: getColor(Component) }}>
      <Col css={{ fontSize: '5em' }}>{Component}</Col>
    </Row>
  )
  // if (Component === 'text') {
  //   return <div className="panel">Panel {node.getName()}</div>
  // }
  // if (Component === 'title') {
  //   return <div className="panel">Windoo {this.pos}</div>
  // } else return <Component />
}
function getColor(n) {
  return `hsl(${n * 50}0,50%,50%)`
}

function getRandomColor(n) {
  return (
    'hsl(' +
    360 * Math.random() +
    ',' +
    (25 + 70 * Math.random()) +
    '%,' +
    (50 + 10 * Math.random()) +
    '%)'
  )
}
