import { Key, useMemo, useState } from 'react'

export const useTableRowSelection = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>()
  const [selectedRows, setSelectedRows] = useState<Backend.Container[]>()

  const rowSelection = useMemo(
    () => ({
      onChange: (selectedRowKeys: Key[], selectedRows: Backend.Container[]) => {
        setSelectedRowKeys(selectedRowKeys)
        setSelectedRows(selectedRows)
      },
      selectedRowKeys,
    }),
    [selectedRowKeys],
  )

  return { rowSelection, selectedRows }
}
