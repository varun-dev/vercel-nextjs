import { initializeApp } from 'firebase/app'
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  set,
  update,
} from 'firebase/database'
import { Actions, DockLocation, Layout, Model } from 'flexlayout-react'
import 'flexlayout-react/style/light.css'
import { isNumber, omit, pick, size } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Col, Row } from '../styles/grid-components'
import { Header } from '../windoo/components/Header'
import { getTabConfig, UserContext } from '../windoo/config'
import { firebaseConfig } from '../windoo/firebase'
import { $username, $windoId, log } from '../windoo/helpers'

let db
export default function Windoo() {
  const [windoId, setWindoId] = useState('')
  const [pos, setPos] = useState(0)
  const [model, setModel] = useState()
  const [username, setUsername] = useState()
  const [windos, setWindos] = useState([])

  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      if (!router.isReady) return
      const username = $username(window, router)
      const windoId = $windoId(window)
      const app = initializeApp(firebaseConfig)
      db = getDatabase(app)
      const dbRef = ref(db)
      const snapshot = await get(child(dbRef, 'windos/' + username))
      let windos = snapshot.val() || {}
      // log('Windos', windos)
      let windo = windos[windoId]
      let pos
      let config
      if (!windo) {
        pos = size(windos) + 1
        config = getTabConfig(pos)
        const newWindow = {
          [windoId]: { pos, config, windoId, message: {} },
        }
        await update(ref(db, 'windos/' + username), newWindow)
        windos = { ...windos, ...newWindow }
      } else {
        config = windo.config
        pos = windo.pos
      }
      log('username', username, 'pos', pos, 'windos', windos)
      setWindoId(windoId)
      setPos(pos)
      setModel(Model.fromJson(config))
      setUsername(username)
      setWindos(windos)
      document.title = `Windoo ${pos}`
    }
    init().then(r => {})
    return async () => {}
  }, [router, router.isReady])

  useEffect(() => {
    if (!model || !windoId || !username) return

    const windosRef = ref(db, `windos/${username}`)
    onValue(windosRef, snapshot => {
      const newWindos = snapshot.val()
      setWindos(newWindos)
    })

    const tabRef = ref(db, `windos/${username}/${windoId}/message`)
    onValue(tabRef, snapshot => {
      const newTab = snapshot.val()
      if (!newTab) return
      try {
        model.doAction(
          Actions.addNode(newTab, 'contentTabset', DockLocation.CENTER, 0)
        )
        set(ref(db, `windos/${username}/${windoId}/message`), null)
      } catch (e) {
        log('newTab already exists', newTab)
      }
    })
  }, [model, windoId, username])

  const onContextMenu = ({ _attributes }, e) => {
    e.preventDefault()
    // log('onContextMenu', _attributes)
    if (_attributes.type === 'tab' && _attributes.id !== 'emptyTab') {
      const tab = pick(_attributes, [
        'id',
        'type',
        'component',
        'name',
        'config',
      ])
      // model.doAction(Actions.deleteTab(windo.id))
      const otherWindos = omit(windos, windoId)
      // log(
      //   'windos',
      //   windos,
      //   '\notherWindos',
      //   otherWindos,
      //   '\nwindoId',
      //   windoId
      // )
      if (size(otherWindos) === 1) {
        const id = Object.keys(otherWindos)[0]
        // const targetWindow = otherWindos[id]
        set(ref(db, `windos/${username}/${id}/message`), tab)
        model.doAction(Actions.deleteTab(tab.id))
      } else {
        log('No other window')
      }
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
