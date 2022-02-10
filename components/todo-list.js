import * as Checkbox from '@radix-ui/react-checkbox'
import { CheckIcon, CrossCircledIcon } from '@radix-ui/react-icons'
import { apiDeleteTodo, apiUpdateTodo } from '../api/apis-todos'
import { Col, Row } from '../styles/grid-components'
import { RowTodoMotion } from '../styles/motion-components'
import { CheckboxRoot } from '../styles/styled-components'
import { _updateBy } from '../utils/list-utils'

export default function TodoList({ todos, setTodos }) {
  const updateTodo = id => async completed => {
    const updated = await apiUpdateTodo(id, completed)
    setTodos(_updateBy(todos, updated, 'id', id))
  }

  // optimistic update
  const deleteTodo = id => async () => {
    setTodos(_updateBy(todos, { deleted: true }, 'id', id))
    await apiDeleteTodo(id)
  }

  const renderTodo = ({ id, description, completed, deleted }) => (
    <RowTodoMotion key={id} deleted={deleted}>
      <Col css={{ span: 2 }}>
        <CheckboxRoot checked={completed} onCheckedChange={updateTodo(id)}>
          <Checkbox.Indicator>
            {completed === true && <CheckIcon />}
          </Checkbox.Indicator>{' '}
        </CheckboxRoot>
      </Col>
      <Col css={{ span: 20 }}>{description}</Col>
      <Col css={{ span: 2 }}>
        <CrossCircledIcon height={25} width={25} onClick={deleteTodo(id)} />
      </Col>
    </RowTodoMotion>
  )

  return (
    <Row>
      <Col css={{ span: 24 }}> {todos.map(renderTodo)} </Col>
    </Row>
  )
}
