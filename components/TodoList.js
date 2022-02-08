import { Table } from 'antd'
import { DeleteFilled } from '@ant-design/icons'
import { apiUpdateTodo } from '../api/api-client'
import { useEffect, useState } from 'react'
import { clientApiWrapper as $ } from '../utils/api-utils'
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

  const onSelect = async ({ id }, completed) => {
    const updated = await apiUpdateTodo(id, completed)
    setTodos(_updateBy(todos, updated, 'id', id))
  }

  const onChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys)
  }

  const deleteTodo = id => async () => {
    // $ - server side api wrapper
    await $('apiDeleteTodo', id)
    setTodos(_removeBy(todos, 'id', id))
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
