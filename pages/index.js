import { Col, Layout, Row } from 'antd'
import { useEffect, useState } from 'react'
import { apiGetCopies } from '../api/apis-todos'
import { InputTodo } from '../components/input-todo'
import { LocaleSwitcher } from '../components/locale-switcher'
import TodoList from '../components/todo-list'
import { clientApiWrapper as $ } from '../utils/api-utils'
import { _keyValues } from '../utils/list-utils'

const { Header, Content } = Layout

export async function getServerSideProps({ locale }) {
  const data = await apiGetCopies(locale)
  return { props: _keyValues(data, 'key', 'copy') }
}

export default function Main(props) {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    async function fetchData() {
      // $ - server side api call with wrapper
      const _todos = await $('apiGetTodos')
      setTodos(_todos)
    }
    fetchData()
  }, [])

  return (
    <Layout>
      <Header>
        <Row>
          <Col span={20}>{props.page_title}</Col>
          <Col span={4}>
            <LocaleSwitcher />
          </Col>
        </Row>
      </Header>
      <Content>
        <Row>
          <Col span={12} offset={6}>
            <Row>
              <Col span={20}>
                <InputTodo
                  setTodos={setTodos}
                  todos={todos}
                  placeholder={props.input_placeholder}
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
      </Content>
    </Layout>
  )
}
