import { Server } from 'socket.io'
import { removeWindo } from '../../windoo/server-store'

const SocketHandler = (req, res) => {
  console.log('SocketHandler')
  let io = res.socket.server.io
  if (io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    io = new Server(res.socket.server)
    res.socket.server.io = io
  }
  io.on('connection', onConnection)
  res.end()
}

export default SocketHandler

const initialisedClients = {}

function onConnection(client) {
  const { username, id } = client.handshake.query
  // console.log('onConnection', id)

  client.on('move-window', msg => {
    // console.log('move-window', msg)
    client.broadcast.emit('move-window', msg)
  })

  client.on('disconnect', () => {
    const windos = removeWindo(username, id)
    client.broadcast.emit('windos-change', windos)
    console.log('disconnected', id)
  })
}
