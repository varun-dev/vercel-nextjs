import generateToken from 'crypto-random-string'

const isDebug = process.env.NEXT_PUBLIC_DEVMODE === 'true'

export function $username(window, router) {
  const { token } = router.query
  const username =
    token ||
    window.localStorage.getItem('username') ||
    'U_' + generateToken({ length: 6, type: 'distinguishable' })
  window.localStorage.setItem('username', username)
  return username
}

export function $windoId(window) {
  const windoId =
    window.localStorage.getItem('windoId') ||
    'W_' + generateToken({ length: 6, type: 'distinguishable' })
  window.localStorage.setItem('windoId', windoId)
  return windoId
}

export function log(...args) {
  if (isDebug) console.log(...args)
}
