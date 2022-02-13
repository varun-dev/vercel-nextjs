import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import QrCodeIcon from '@mui/icons-material/QrCode'
import { useContext, useState } from 'react'
import { Col, Row } from '../../styles/grid-components'
import { WindoContext } from '../config'
import { DialogQR } from './DialogQR'
import { Menu } from './Menu'

const icon = {
  style: {
    height: 50,
    width: 50,
    cursor: 'pointer',
  },
}

export function Header({ isMain }) {
  const sendWindo = useContext(WindoContext)
  const [openQR, setOpenQR] = useState(false)

  const handleClose = () => {
    setOpenQR(false)
  }

  const handleOpenQR = () => {
    setOpenQR(true)
  }

  return (
    <Row css={{ height: '100%' }}>
      <Col css={{ fontSize: '2em', _flex: 'auto' }}>Windoo</Col>
      {!isMain ? null : (
        <Col key="icon1" css={{ _flex: 60 }}>
          <QrCodeIcon {...icon} onClick={handleOpenQR} />
          <DialogQR open={openQR} onClose={handleClose} />
        </Col>
      )}
      <Col key="icon2" css={{ _flex: 60 }}>
        <OpenInNewIcon {...icon} onClick={sendWindo} />
      </Col>
    </Row>
  )
}
