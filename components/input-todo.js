import { useState } from 'react'
import { apiAddTodo } from '../api/apis-todos'
import { Input } from '../styles/styled-components'
import { _append } from '../utils/list-utils'

export function InputTodo({ todos, setTodos, placeholder }) {
  const [todoText, setTodoText] = useState('')

  const _addTodo = async e => {
    if (e.keyCode === 13) {
      const todo = { description: e.target.value, completed: false }
      const created = await apiAddTodo(todo)
      setTodoText('')
      setTodos(_append(todos, created))
    }
  }

  return (
    <Input
      type="text"
      onKeyUp={_addTodo}
      placeholder={placeholder}
      value={todoText}
      onChange={e => setTodoText(e.target.value)}
    />
  )
}
