import { GraphQLClient } from 'graphql-request'

export const graphcms = new GraphQLClient(
  'https://api-eu-central-1.graphcms.com/v2/ckzctrrjf0tk401z55m2vhmbi/master',
  {
    headers: {
      Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NDQyNDYyNjQsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NremN0cnJqZjB0azQwMXo1NW0ydmhtYmkvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiOWY1M2EwMGMtMTczNi00OTgyLWEyNWYtZjcyMDQ2MDE1NTIwIiwianRpIjoiY2t4YWEwZmZ6MjVycDAxeGlobXoyNnRwZSJ9.gnkxlsz4ymFCivjm02uz3NgEkHaCdEx5IIZtE5EhMgV-aUxssnK0PE7oiUzZh3KRGgzIcZ5-w3ZRxo93kCseu7sa3zjRcAsRHRm8lyFt8e-M_NpxGXL9ql0fGvIaThWEKRTCI0jHupfvfRGhvj3biLe_wKbiHzfj2QoCelz9Hr9gpabHYgfY3fWuNB1OoaRYDWxvPcTw8ARnSbGsWZqIjrg9N7mTjwe53ETiB6BkSEC5lm8T3-MeeOulWH3_cf74KX0HkPpYQSr30K3zCnwJpyuVQ0EOsgHy6y1y9z6ZP-wWhmztfDhkiBUMTqFEvyIoqhekn0AQjDFlq1uWA0b3WbBEU0LHO_3NG6meMZqivqdsOKWgeB6K3YuTyxPt6raG8ojt9sIf3idkUd5mAPAXW70Ji8ti1d_Z-F8ioFuxUZbjjwmoFla2QLSmPdvFot2U-vXGlSCJMFeEoJGA5VsDhY09T-bCERYnb_FlqnHOVfKqRRuX1sAIF3-8WN14Ja6QutV-CL-PsHSKMHYZ3P5uXuKShnbXohfhnaYk0-a6tMuXEvtn2NBfWVovuc1rxt2R4oAT_zfhufpseloaL0c5C3si9q52V1xGgaounj0OS46u0nyXLzKdBXKKxAHCRNegzw968mkRP2vTz1q1gXc4hH3shOOsjZ5e7P58XXS8Oeg`,
    },
  }
)

export async function apiGetTodos() {
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

export async function apiDeleteTodo(id) {
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
}
