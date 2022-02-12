import { useState } from 'react'
import { Col, Row } from '../../styles/grid-components'
import { DialogQR } from './DialogQR'
import { Menu } from './Menu'

export function Header() {
  const [openQR, setOpenQR] = useState(false)

  const handleClose = () => {
    setOpenQR(false)
  }

  const handleOpenQR = () => {
    setOpenQR(true)
  }

  return (
    <Row css={{ height: '100%' }}>
      <Col css={{ fontSize: '5em', _flex: 'auto' }}></Col>
      <Col css={{ _flex: 30 }}>
        <Menu onClickQR={handleOpenQR} />
        <DialogQR open={openQR} onClose={handleClose} />
      </Col>
    </Row>
  )
}
