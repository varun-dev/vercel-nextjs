import { Actions, DockLocation, Layout, Model } from 'flexlayout-react'
import 'flexlayout-react/style/light.css'
import { pick } from 'lodash'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  actionSendWindo,
  initaliseWindow,
  onNewTab,
  onNewWindos,
} from '../windoo/actions'
import {
  factory,
  getMagicTab,
  UserContext,
  WindoContext,
} from '../windoo/config'
import { $username, $windoId, log } from '../windoo/helpers'

const tabAttributes = ['id', 'type', 'component', 'name', 'config']

export default function Windoo() {
  const [username, setUsername] = useState()
  const [windoId, setWindoId] = useState('')
  const [pos, setPos] = useState(0)
  const [windos, setWindos] = useState([])
  const [model, setModel] = useState()

  const logState = () =>
    log(
      'username',
      username,
      '\nwindoId',
      windoId,
      '\npos',
      pos,
      '\nwindos',
      windos,
      '\nmodel',
      model
    )

  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      if (!router.isReady) return
      const username = $username(window, router)
      const windoId = $windoId(window)
      const { pos, config, windos } = await initaliseWindow(username, windoId)

      setWindoId(windoId)
      setPos(pos)
      setModel(Model.fromJson(config))
      setUsername(username)
      setWindos(windos)
      document.title = `Windoo ${pos}`
    }
    init().then(() => {})
    return () => {}
  }, [router, router.isReady])

  useEffect(() => {
    if (!model || !windoId || !username) return
    onNewWindos(username, setWindos)
    onNewTab(username, windoId, newTab => {
      if (!newTab) return
      try {
        model.doAction(
          Actions.addNode(newTab, 'contentTabset', DockLocation.CENTER, 0)
        )
      } catch (e) {}
    })
  }, [model, windoId, username])

  const onContextMenu = ({ _attributes }, e) => {
    e.preventDefault()
    // log('onContextMenu', _attributes)
    if (_attributes.type === 'tab' && _attributes.id !== 'emptyTab') {
      const tab = pick(_attributes, tabAttributes)
      actionSendWindo(username, windos, windoId, model, tab)
    }
  }

  const sendWindo = () => {
    actionSendWindo(username, windos, windoId, model, getMagicTab(pos))
  }

  if (!model || !username || !pos) {
    return null
  }

  // console.log('rendering')
  // logState()

  return (
    <UserContext.Provider value={username}>
      <WindoContext.Provider value={sendWindo}>
        <Layout
          model={model}
          factory={factory.bind({ pos })}
          onContextMenu={onContextMenu}
        />
      </WindoContext.Provider>
    </UserContext.Provider>
  )
}
