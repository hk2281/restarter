import { Button, Form, Table } from 'antd'
import Head from 'next/head'
import { useCallback, useState } from 'react'
import { AuthorizedLayout } from '@/shared/components/AuthorizedLayout'
import { useTableColumns } from '@/screens/Containers/hooks/useTableColumns'
import { useTableRowSelection } from '@/screens/Containers/hooks/useTableRowSelection'
import { useTableData } from '@/screens/Containers/hooks/useTableData'
import { Edit } from '@/screens/Containers/Edit/Edit'

export const Containers = () => {
  const [editingId, setEditingId] = useState<number>()

  const { data, isValidating } = useTableData()
  const { columns } = useTableColumns({ setEditingId })
  const { rowSelection, selectedRows } = useTableRowSelection()

  const handleClose = useCallback(() => setEditingId(undefined), [])

  return (
    <Form>
      <Head>
        <title>Контейнеры</title>
      </Head>
      <Form.Item>
        <Button disabled={!selectedRows?.length} size='large' type='primary'>
          Организовать сбор
        </Button>
      </Form.Item>
      <Form.Item>
        <Table
          columns={columns}
          dataSource={data}
          loading={isValidating}
          pagination={false}
          rowSelection={rowSelection}
        />
      </Form.Item>
      <Edit id={editingId} onClose={handleClose} />
    </Form>
  )
}

Containers.layout = AuthorizedLayout
