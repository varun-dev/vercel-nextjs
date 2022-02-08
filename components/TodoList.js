import { Table } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import { apiDeleteTodo, apiUpdateTodo } from '../api/graphql'
import { useEffect, useState } from 'react'

export default function TodoList({ todos, setTodos }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  useEffect(() => {
    const _selectedRowKeys = getSelectedRowKeys(todos)
    setSelectedRowKeys(_selectedRowKeys)
  }, [todos])

  const onSelect = async ({ id }, completed) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys)
    const updated = await apiUpdateTodo(id, completed)
    // console.log('updated', updated)
    const nextTodos = todos.map(todo => {
      if (todo.id === id) return updated
      return todo
    }, [])
    setTodos(nextTodos)
  }

  const onChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys)
  }

  const deleteTodo = id => async () => {
    await apiDeleteTodo(id)
    setTodos(
      todos.reduce((r, t) => {
        if (t.id !== id) r.push(t)
        return r
      }, [])
    )
  }

  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      render: (_, record) => <DeleteFilled onClick={deleteTodo(record.id)} />,
      width: 50,
    },
  ]

  const rowSelection = {
    selectedRowKeys,
    onSelect,
    onChange,
  }

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={todos}
      rowKey="id"
      pagination={false}
      showHeader={false}
      style={{ width: '100%' }}
    />
  )
}

function getSelectedRowKeys(todos) {
  return todos.reduce((r, { id, completed }) => {
    if (completed === true) {
      r.push(id)
    }
    return r
  }, [])
}
