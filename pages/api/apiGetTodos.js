import { GraphQLClient } from 'graphql-request'
import { serverApiWrapper as $ } from '../../utils/api-utils'

const graphcms = new GraphQLClient(process.env.GRAPHCMS_URL, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
})

export default $(async function apiGetTodos() {
  try {
    const { todos } = await graphcms.request(
      `
        { 
          todos {
          id
            description
            completed
          }
        }
    `
    )

    return todos
  } catch (e) {
    throw e.response
  }
})
