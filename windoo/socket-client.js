import io from 'socket.io-client'

let socket
window.addEventListener('beforeunload', () => socket && socket.disconnect())

export const initialiseSocket = function (
  query,
  { onWindoChange, onNewWindo }
) {
  if (!socket) {
    fetch('/api/socket-server')
      .then(() => {
        socket = io({ query })
        // socket.on('connect', () => {
        //   console.log('connected', socket)
        // })
        socket.on('windos-change', onWindoChange)
        socket.on('move-window', onNewWindo)
      })
      .catch(e => {
        console.error(e)
      })
  }
}

export function sendMessage(name, data) {
  socket && socket.emit(name, data)
}
