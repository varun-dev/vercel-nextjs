import Table from 'antd/lib/table'
import 'antd/lib/table/style/index.css'
import { useEffect, useState } from 'react'
import { DeleteFilled } from '@ant-design/icons'
import { apiDeleteTodo, apiUpdateTodo } from '../api/apis-todos'
import {
  _filterAndMap,
  _removeBy,
  _updateBy,
  _eqProp,
  _prop,
} from '../utils/list-utils'

const getSelectedKeys = todos =>
  _filterAndMap(todos, _eqProp('completed', true), _prop('id'))

export default function TodoList({ todos, setTodos }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  useEffect(() => {
    setSelectedRowKeys(getSelectedKeys(todos))
  }, [todos])

  const updateTodo = async ({ id }, completed) => {
    const updated = await apiUpdateTodo(id, completed)
    setTodos(_updateBy(todos, updated, 'id', id))
  }

  // optimistic update
  const deleteTodo = id => async () => {
    setTodos(_removeBy(todos, 'id', id))
    await apiDeleteTodo(id)
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
    onSelect: updateTodo,
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
