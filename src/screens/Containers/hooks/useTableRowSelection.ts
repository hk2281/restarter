import { Key, useMemo, useState } from 'react'
import { Container } from '@/screens/Containers/types/container'

export const useTableRowSelection = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>()
  const [selectedRows, setSelectedRows] = useState<Container[]>()

  const rowSelection = useMemo(
    () => ({
      onChange: (selectedRowKeys: Key[], selectedRows: Container[]) => {
        setSelectedRowKeys(selectedRowKeys)
        setSelectedRows(selectedRows)
      },
      selectedRowKeys,
    }),
    [selectedRowKeys],
  )

  return { rowSelection, selectedRows }
}
