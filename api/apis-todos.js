import { GraphQLClient } from 'graphql-request'

const graphcms = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHCMS_URL, {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPHCMS_TOKEN}`,
  },
})

export async function apiGetTodos() {
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
}

export async function apiAddTodo({ description }) {
  const { createTodo } = await graphcms.request(
    `
      mutation createTodo($description: String!) {
        createTodo (data: {description:$description}){
          id
          description
          completed
        }
      }
      `,
    { description }
  )

  return createTodo
}

export async function apiUpdateTodo(id, completed) {
  const { updateTodo } = await graphcms.request(
    `
      mutation updateTodo($id: ID!, $completed:Boolean!) {
        updateTodo (
        where: {id: $id}
        data: {completed:$completed}
        ){
          id
          description
          completed
        }
      }
      `,
    { id, completed }
  )

  return updateTodo
}

export async function deleteTodo(id) {
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
}
