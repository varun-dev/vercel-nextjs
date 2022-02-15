import { Actions, DockLocation, Layout, Model } from 'flexlayout-react'
import 'flexlayout-react/style/light.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { actionSendWindo, initaliseWindow } from '../windoo/actions'
import {
  factory,
  getMagicTab,
  getTabConfig,
  magicTab,
  UserContext,
  WindoContext,
} from '../windoo/config'
import { $username, $windoId, log } from '../windoo/helpers'
import { onNewTab, onNewWindos } from '../windoo/subscriptions'

const tabAttributes = ['id', 'type', 'component', 'name', 'config']

export default function Index() {
  const [username, setUsername] = useState()
  const [windoId, setWindoId] = useState('')
  const [pos, setPos] = useState(0)
  const [windos, setWindos] = useState([])
  const [model, setModel] = useState()

  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      if (!router.isReady) return
      const username = $username(window, router)
      const windoId = $windoId(window)
      // log(username, windoId)
      const { pos, config, windos } = await initaliseWindow(username, windoId)
      magicTab(pos === 1)
      setWindoId(windoId)
      setPos(pos)
      // console.log('after initaliseWindow', pos, config, windos)
      setModel(Model.fromJson(config || getTabConfig(pos)))
      setUsername(username)
      setWindos(windos)
      document.title = `Windoo ${pos}`
    }
    init().then(() => {})
    return () => {}
  }, [router, router.isReady])

  useEffect(() => {
    if (!model || !windoId || !username) return
    const destroy = []
    destroy.push(onNewWindos(username, setWindos))
    destroy.push(
      onNewTab(username, windoId, newTab => {
        if (!newTab) return
        try {
          model.doAction(
            Actions.addNode(newTab, 'contentTabset', DockLocation.CENTER, 0)
          )
        } catch (e) {}
      })
    )
    return () => destroy.forEach(fn => fn())
  }, [model, windoId, username])

  // const onContextMenu = ({ _attributes }, e) => {
  //   e.preventDefault()
  //   // log('onContextMenu', _attributes)
  //   if (_attributes.type === 'tab' && _attributes.id !== 'emptyTab') {
  //     const tab = pick(_attributes, tabAttributes)
  //     actionSendWindo(username, windos, windoId, model, tab)
  //   }
  // }

  const sendWindo = targetWindoId => () => {
    if (!magicTab()) return
    const tab = getMagicTab(pos)
    actionSendWindo(username, windos, targetWindoId, tab)
    model.doAction(Actions.deleteTab(tab.id))
    magicTab(false)
  }

  if (!model || !username || !pos) {
    return null
  }

  // console.log('rendering')
  // logState()

  return (
    <UserContext.Provider value={username}>
      <WindoContext.Provider value={{ sendWindo, windos, windoId }}>
        <Layout
          model={model}
          factory={factory.bind({ pos })}
          // onContextMenu={onContextMenu}
        />
      </WindoContext.Provider>
    </UserContext.Provider>
  )

  function logState() {
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
  }
}
