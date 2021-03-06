import { useEffect, useState } from 'react'
import { apiGetCopies } from '../api/apis-todos'
import { InputTodo } from '../components/input-todo'
import { LocaleSwitcher } from '../components/locale-switcher'
import TodoList from '../components/todo-list'
import { Col, Content, Header, Layout, Row } from '../styles/grid-components'
import { Separator, Title } from '../styles/styled-components'
import { clientApiWrapper as $ } from '../utils/api-utils'
import { _keyValues } from '../utils/list-utils'

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
          <Col css={{ _span: 20 }}>
            <Title css={{ lineSpacing: '2em' }}>{props.page_title}</Title>
          </Col>
          <Col css={{ _span: 4 }}>
            <LocaleSwitcher />
          </Col>
        </Row>
      </Header>
      <Content>
        <Row>
          <Col css={{ width: 500, paddingTop: 50 }}>
            <InputTodo
              setTodos={setTodos}
              todos={todos}
              placeholder={props.input_placeholder}
            />
            <Separator />
            <TodoList setTodos={setTodos} todos={todos} />
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
