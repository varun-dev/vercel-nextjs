import { useEffect, useState } from 'react'
import { apiAddTodo, apiGetTodos } from '../api/graphql'
import { Col, Input, Row } from 'antd'
import TodoList from '../components/TodoList'

export default function Main() {
  const [todos, setTodos] = useState([])
  const [todoText, setTodoText] = useState('')

  useEffect(() => {
    async function fetchData() {
      const todos = await apiGetTodos()
      setTodos(todos)
    }
    fetchData()
  }, [])

  const _addTodo = async e => {
    if (e.keyCode === 13) {
      const todo = { description: e.target.value, completed: false }
      const created = await apiAddTodo(todo)
      // console.log('created todo', created)
      setTodoText('')
      setTodos(todos.concat([created]))
    }
  }

  return (
    <Row>
      <Col span={12} offset={6}>
        <Row>
          <Input
            type="text"
            onKeyUp={_addTodo}
            placeholder="Type todo and press enter"
            value={todoText}
            onChange={e => setTodoText(e.target.value)}
          />
        </Row>
        <Row>
          <TodoList setTodos={setTodos} todos={todos} />
        </Row>
      </Col>
    </Row>
  )
}
