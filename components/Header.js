import { Laptop, PhoneIphone, Share, TabletMac } from '@mui/icons-material'
import { map, pickBy, size } from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { Col, Row } from '../styles/grid-components'
import { mapObject } from '../utils/list-utils'
import { STATUS } from '../windoo/actions'
import { UserContext, WindoContext } from '../windoo/config'
import { log } from '../windoo/helpers'
import { onStatusChange } from '../windoo/subscriptions'
import { DialogQR } from './DialogQR'

const icon = {
  height: 50,
  width: 50,
  cursor: 'pointer',
}

export function Header({ isMain }) {
  const { sendWindo, windos, windoId } = useContext(WindoContext)
  const username = useContext(UserContext)

  const [openQR, setOpenQR] = useState(false)
  const [otherWindos, setOtherWindos] = useState({})
  const [statuses, setStatuses] = useState({})

  useEffect(() => {
    if (!windoId || !windos || size(windos) === 0 || !username) return

    const otherWindos = pickBy(
      windos,
      w => w.windoId !== windoId && w.status !== STATUS.DISCONNECTED
    )
    setStatuses(mapObject(windos, 'windoId', 'status'))
    const destroy = map(windos, w => {
      return onStatusChange(username, w.windoId, status => {
        // log('onStatusChange', status)
        setStatuses(s => ({ ...s, [w.windoId]: status }))
      })
    })
    setOtherWindos(otherWindos)
    return () => destroy.forEach(fn => fn && fn())
  }, [windoId, windos, username])

  const handleClose = () => {
    setOpenQR(false)
  }

  const handleOpenQR = () => {
    setOpenQR(true)
  }
  // logState()
  return (
    <Row css={{ height: '100%' }}>
      <Col css={{ fontSize: '2em', _flex: 'auto' }}>
        {isMain && 'Main '}Windoo
      </Col>
      {size(otherWindos) > 0 &&
        map(otherWindos, (w, i) => {
          const props =
            statuses[w.windoId] === STATUS.INACTIVE
              ? { color: 'disabled' }
              : { onClick: sendWindo(w.windoId) }
          const [Icon, height, _flex] =
            w.deviceType === 'mobile'
              ? [PhoneIphone, 37, 50]
              : w.deviceType === 'tablet'
              ? [TabletMac, 35, 50]
              : [Laptop, 50, 60]
          return (
            <Col key={i} css={{ _flex }}>
              <Icon style={{ ...icon, height }} {...props} />
            </Col>
          )
        })}
      {!isMain ? null : (
        <Col key="icon1" css={{ _flex: 60 }}>
          <Share style={{ ...icon, height: 44 }} onClick={handleOpenQR} />
          <DialogQR open={openQR} onClose={handleClose} />
        </Col>
      )}

      {/*<Col key="icon2" css={{ _flex: 60 }}>*/}
      {/*  <OpenInNewIcon {...icon} onClick={sendWindo} />*/}
      {/*</Col>*/}
    </Row>
  )

  function logState() {
    log(
      'username',
      username,
      '\nwindoId',
      windoId,
      '\notherWindos',
      otherWindos,
      '\nwindos',
      windos,
      '\nstatuses',
      statuses
    )
  }
}
