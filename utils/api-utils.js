// following wrappers are for making server-side api calls

// server side api call wrapper for client
export async function clientApiWrapper(name, ...args) {
  try {
    const response = await fetch('/api/' + name, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ args }),
    })
    const data = await response.json()
    if (response.status === 200) {
      return data
    } else {
      console.error('API error', data.errors)
      throw data
    }
  } catch (error) {
    throw error
  }
}

// server side api call wrapper for server
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
