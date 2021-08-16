import { Button, Form, Table } from 'antd'
import Head from 'next/head'
import { AuthorizedLayout } from '@/shared/components/AuthorizedLayout'
import { useTableColumns } from '@/screens/Containers/hooks/useTableColumns'
import { useTableRowSelection } from '@/screens/Containers/hooks/useTableRowSelection'
import { useTableData } from '@/screens/Containers/hooks/useTableData'

export const Containers = () => {
  const { data } = useTableData()
  const { columns } = useTableColumns()
  const { rowSelection, selectedRows } = useTableRowSelection()

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
          pagination={false}
          rowSelection={rowSelection}
        />
      </Form.Item>
    </Form>
  )
}

Containers.layout = AuthorizedLayout
