// api call wrapper for client side
export async function clientApiWrapper(name, ...args) {
  try {
    const response = await fetch('/api/' + name, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ args }),
    })
    const json = await response.json()
    const data = json.data
    if (response.status === 200) {
      return data
    } else {
      console.error('API error', json.errors)
      throw data
    }
  } catch (error) {
    throw error
  }
}

// api call wrapper for server side
export function serverApiWrapper(fn) {
  return async ({ body: { args } }, res) => {
    let result = {}
    try {
      result = await fn(...args)
      res.status(200).json(result)
    } catch (e) {
      if (e.status) res.status(e.status).json(e.error)
    }
  }
}
