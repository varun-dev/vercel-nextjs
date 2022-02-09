import { Col, Input, Row } from 'antd'
import { useEffect, useState } from 'react'
import { apiAddTodo, apiGetTodos } from '../api/apis-todos'
import TodoList from '../components/TodoList'
import { clientApiWrapper as $ } from '../utils/api-utils'
import { _append } from '../utils/list-utils'

export default function Main() {
  const [todos, setTodos] = useState([])
  const [todoText, setTodoText] = useState('')

  useEffect(() => {
    async function fetchData() {
      // $ - server side api call with wrapper
      const _todos = await $('apiGetTodos')
      setTodos(_todos)
    }
    fetchData()
  }, [])

  const _addTodo = async e => {
    if (e.keyCode === 13) {
      const todo = { description: e.target.value, completed: false }
      const created = await apiAddTodo(todo)
      // console.log('created todo', created)
      setTodoText('')
      setTodos(_append(todos, created))
    }
  }

  return (
    <Row>
      <Col span={12} offset={6}>
        <Row>
          <Col span={20}>
            <Input
              type="text"
              onKeyUp={_addTodo}
              placeholder="Type todo and press enter"
              value={todoText}
              onChange={e => setTodoText(e.target.value)}
              style={{ margin: '20px 0' }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={20}>
            <TodoList setTodos={setTodos} todos={todos} />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
