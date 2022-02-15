import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import QRCode from 'qrcode'
import { useContext, useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Col, Row } from '../styles/grid-components'
import { UserContext } from '../windoo/config'
import Img from 'next/image'

export function DialogQR(props) {
  const [qrImage, setQRImage] = useState('')
  const [copied, setCopied] = useState(false)
  const username = useContext(UserContext)
  const href = window.location.href
  const url = href.indexOf('token=') > 0 ? href : `${href}?token=${username}`

  useEffect(() => {
    if (!username) return
    const generateQR = async text => {
      try {
        setQRImage(await QRCode.toDataURL(url))
      } catch (err) {
        console.error(err)
      }
    }
    generateQR()
  }, [username, url])

  const onClose = () => {
    setCopied(false)
    props.onClose()
  }

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Get Link</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Use to link or QR to open window on another device,
        </DialogContentText>
        <Row>
          <Col css={{ _flex: 'auto' }}>
            <span>{url}</span>
          </Col>
          <Col css={{ _flex: 20 }}>
            <CopyToClipboard text={url} onCopy={() => setCopied(true)}>
              <ContentCopyIcon style={{ cursor: 'pointer' }} />
            </CopyToClipboard>
          </Col>
        </Row>
        <Row>
          <Col css={{ _flex: 'auto' }}>
            <Img src={qrImage} alt='Url QR'/>
          </Col>
          {copied && (
            <Col css={{ _flex: 60, fontSize: 12 }}>Copied to clipboard</Col>
          )}
        </Row>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}
