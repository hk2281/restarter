import { Key, useMemo, useState } from 'react'
import { Container } from '@/screens/Containers/types/container'

export const useTableRowSelection = () => {
  const [selectedRows, setSelectedRows] = useState<Container[]>()

  const rowSelection = useMemo(
    () => ({
      onChange: (selectedRowKeys: Key[], selectedRows: Container[]) => {
        setSelectedRows(selectedRows)
      },
    }),
    [],
  )

  return { rowSelection, selectedRows }
}
