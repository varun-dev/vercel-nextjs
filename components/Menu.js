import MenuIcon from '@mui/icons-material/Menu'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import QrCodeIcon from '@mui/icons-material/QrCode'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useState } from 'react'

export function Menu({ onClickQR }) {
  const [isOpen, setState] = useState(false)

  const toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState(open)
  }

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button key="qr" onClick={onClickQR}>
          <ListItemIcon>
            <QrCodeIcon />
          </ListItemIcon>
          <ListItemText primary="Get QR" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={'send'}>
          <ListItemIcon>
            <OpenInNewIcon />
          </ListItemIcon>
          <ListItemText primary="Send App 1" />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <div>
      <MenuIcon onClick={toggleDrawer(true)} />
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  )
}
