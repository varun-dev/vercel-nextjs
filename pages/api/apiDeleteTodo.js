import { GraphQLClient } from 'graphql-request'
import { serverApiWrapper as $ } from '../../utils/api-utils'

const graphcms = new GraphQLClient(process.env.GRAPHCMS_URL, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
})

export default $(async function deleteTodo(id) {
  try {
    const { deleteTodo } = await graphcms.request(
      `
      mutation deleteTodo($id: ID!) {
        deleteTodo (
        where: {id: $id}
        ){
          id
          description
          completed
        }
      }
      `,
      { id }
    )

    return deleteTodo
  } catch (e) {
    throw e.response
  }
})
