import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { apiAddTodo } from '../_apis/apis-todos'
import { Col } from '../styles/grid-components'
import { Input, RowInput } from '../styles/styled-components'
import { _prepend } from '../utils/list-utils'

export function InputTodo({ todos, setTodos, placeholder }) {
  const [todoText, setTodoText] = useState('')

  const addTodo = async () => {
    if (todoText.trim().length) {
      const todo = { description: todoText, completed: false }
      const created = await apiAddTodo(todo)
      setTodoText('')
      setTodos(_prepend(todos, created))
    }
  }

  const onKeyUp = e => e.keyCode === 13 && addTodo()

  return (
    <RowInput>
      <Col css={{ _flex: 'auto' }}>
        <Input
          type="text"
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          value={todoText}
          onChange={e => setTodoText(e.target.value)}
        />
      </Col>
      <Col css={{ _flex: 50 }}>
        <PlusCircledIcon
          style={{ color: 'hsl(0, 0%, 50%)', cursor: 'pointer' }}
          width={50}
          height={50}
          onClick={addTodo}
        />
      </Col>
    </RowInput>
  )
}
