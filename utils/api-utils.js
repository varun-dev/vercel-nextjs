// following wrappers are for making server-side _apis calls

// server side _apis call wrapper for client
export async function clientApiWrapper(options, ...args) {
  let apiName = options
  let method = 'POST'
  if (typeof options === 'object') {
    apiName = options.apiName
    method = options.method
  }
  try {
    const response = await fetch('/api/' + apiName, {
      method,
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
    }
  } catch (error) {
    console.error(error)
  }
}

// server side _apis call wrapper for server
export function serverApiWrapper(fn) {
  return async ({ method, body: { args } }, res) => {
    try {
      const result = await fn(...args, method)
      // console.log('returnig result', result)
      res.status(200).json(result || {})
    } catch (e) {
      if (e.status) res.status(e.status).json(e.error)
    }
  }
}
