import generateToken from 'crypto-random-string'
import { Actions, DockLocation, Layout, Model } from 'flexlayout-react'
import 'flexlayout-react/style/light.css'
import { isNumber, pick, size } from 'lodash'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'
import { Col, Row } from '../styles/grid-components'
import { clientApiWrapper as $ } from '../utils/api-utils'
import { Header } from '../windoo/components/Header'
import { getTabConfig, UserContext } from '../windoo/config'
import { initialiseSocket, sendMessage } from '../windoo/socket-client'

export default function Windoo() {
  const [windoId, setWindoId] = useState('')
  const [pos, setPos] = useState(0)
  const [model, setModel] = useState()
  const [username, setUsername] = useState()
  const [windos, setWindos] = useState([])

  const router = useRouter()

  const onWindoChange = windos => {
    console.log('changedWindows', windos)
  }

  useEffect(() => {
    let _username
    const init = async () => {
      if (!router.isReady) return
      function _storedUsername(value) {
        if (value) {
          window.localStorage.setItem('_username', value)
        } else {
          return window.localStorage.getItem('_username')
        }
      }
      const { token } = router.query
      _username =
        token ||
        _storedUsername() ||
        generateToken({ length: 6, type: 'distinguishable' })
      _storedUsername(_username)
      const { id, windos } = await $('apiWindoo', { username: _username })
      const pos = size(windos)
      setWindoId(id)
      setPos(pos)
      setModel(Model.fromJson(getTabConfig(pos)))
      setUsername(_username)
      setWindos(windos)
      console.log('username', _username)
      document.title = `Windoo ${pos}`
    }
    init().then(r => {})
    return async () =>
      await $(
        { apiName: 'apiWindoo', method: 'DELETE' },
        { username: _username }
      )
  }, [router.isReady, router.query])

  useEffect(() => {
    if (!model || !windoId || !username) return
    const onNewWindo = windo => {
      console.log('onNewWindo', windo)
      try {
        model.doAction(
          Actions.addNode(windo, 'contentTabset', DockLocation.CENTER, 0, true)
        )
      } catch (e) {
        //todo:
      }
    }
    initialiseSocket({ username, id: windoId }, { onWindoChange, onNewWindo })
  }, [model, windoId, username])

  const onContextMenu = ({ _attributes }, e) => {
    e.preventDefault()
    // console.log('onContextMenu', _attributes)
    if (_attributes.type === 'tab' && _attributes.id !== 'emptyTab') {
      const windo = pick(_attributes, [
        'id',
        'type',
        'component',
        'name',
        'config',
      ])
      model.doAction(Actions.deleteTab(windo.id))
      sendMessage('move-window', windo)
    }
  }

  return !model ? null : (
    <UserContext.Provider value={username}>
      <Layout
        model={model}
        factory={factory.bind({ pos })}
        onContextMenu={onContextMenu}
      />
    </UserContext.Provider>
  )
}

function factory(node) {
  const Component = node.getComponent()
  let children
  let backgroundColor = '#fff'
  const config = node.getConfig()

  if (Component === 'Header') return <Header />
  if (config && Component === 'tab') {
    backgroundColor = getColor(config.tab)
    children = (
      <span>
        <span>Windo {config.pos}</span>
        <br />
        <span>Tab {config.tab}</span>
      </span>
    )
  } else {
    children = Component
  }
  return (
    <Row css={{ height: '100%', backgroundColor }}>
      <Col css={{ fontSize: '5em' }}>{children}</Col>
    </Row>
  )
}

function getColor(n) {
  return isNumber(n) ? `hsl(${n * 50}0,50%,50%)` : '#fff'
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
