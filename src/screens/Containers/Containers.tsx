import { Form, Table } from 'antd'
import Head from 'next/head'
import { useCallback, useState } from 'react'
import { AuthorizedLayout } from '@/shared/components/AuthorizedLayout'
import { useTableColumns } from '@/screens/Containers/hooks/useTableColumns'
import { useTableRowSelection } from '@/screens/Containers/hooks/useTableRowSelection'
import { useTableData } from '@/screens/Containers/hooks/useTableData'
import { Edit } from '@/screens/Containers/Edit/Edit'
import { Filters } from '@/screens/Containers/Filters/Filters'
import { useFilters } from '@/screens/Containers/hooks/useFilters'
import { useTableSort } from '@/screens/Containers/hooks/useTableSort'

export const Containers = () => {
  const [editingId, setEditingId] = useState<number>()

  const { filters } = useFilters()
  const { handleChange, sort } = useTableSort()
  const { data, isValidating, mutate } = useTableData({ filters, sort })
  const { columns } = useTableColumns({ setEditingId })
  const { rowSelection, selectedRows } = useTableRowSelection()

  const handleClose = useCallback(() => setEditingId(undefined), [])

  return (
    <Form>
      <Head>
        <title>Контейнеры</title>
      </Head>
      <Filters filters={filters} selectedRows={selectedRows} />
      <Form.Item>
        <Table
          columns={columns}
          dataSource={data}
          loading={isValidating}
          pagination={false}
          rowSelection={rowSelection}
          style={{ overflowX: `auto` }}
          onChange={handleChange}
        />
      </Form.Item>
      <Edit id={editingId} mutateTableData={mutate} onClose={handleClose} />
    </Form>
  )
}

Containers.layout = AuthorizedLayout
