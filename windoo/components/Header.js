import { Laptop, PhoneIphone, Share, TabletMac } from '@mui/icons-material'
import { forEach, map, pickBy, size } from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { Col, Row } from '../../styles/grid-components'
import { mapObject } from '../../utils/list-utils'
import { STATUS } from '../actions'
import { UserContext, WindoContext } from '../config'
import { log } from '../helpers'
import { onStatusChange } from '../subscriptions'
import { DialogQR } from './DialogQR'

const icon = {
  style: {
    height: 50,
    width: 50,
    cursor: 'pointer',
  },
}

export function Header({ isMain }) {
  const { sendWindo, windos, windoId } = useContext(WindoContext)
  const username = useContext(UserContext)

  const [openQR, setOpenQR] = useState(false)
  const [otherWindos, setOtherWindos] = useState({})
  const [statuses, setStatuses] = useState({})

  const logState = () => {
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
      <Col css={{ fontSize: '2em', _flex: 'auto' }}>Windoo</Col>
      {size(otherWindos) > 0 &&
        map(otherWindos, (w, i) => {
          const props =
            statuses[w.windoId] === STATUS.INACTIVE
              ? { color: 'disabled' }
              : { onClick: sendWindo(w.windoId) }
          const Icon =
            w.deviceType === 'mobile'
              ? PhoneIphone
              : w.deviceType === 'tablet'
              ? TabletMac
              : Laptop
          return (
            <Col key={i} css={{ _flex: 60 }}>
              <Icon {...icon} {...props} />
            </Col>
          )
        })}
      {!isMain ? null : (
        <Col key="icon1" css={{ _flex: 60 }}>
          <Share {...icon} onClick={handleOpenQR} />
          <DialogQR open={openQR} onClose={handleClose} />
        </Col>
      )}

      {/*<Col key="icon2" css={{ _flex: 60 }}>*/}
      {/*  <OpenInNewIcon {...icon} onClick={sendWindo} />*/}
      {/*</Col>*/}
    </Row>
  )
}
