import { useCallback, useState } from 'react'

export interface Sort {
  sort_by?: unknown
  order_by?: string
}

const sorterOrderToOrderBy = {
  ascend: `asc`,
  descend: `desc`,
}

export const useTableSort = () => {
  const [sort, setSort] = useState<Sort>({})
  const handleChange = useCallback((_pagination, _filters, sorter) => {
    if (!sorter.order) {
      setSort({})
      return
    }
    setSort({
      sort_by: sorter.field,
      order_by:
        sorterOrderToOrderBy[sorter.order as keyof typeof sorterOrderToOrderBy],
    })
  }, [])
  console.log(sort)

  return { handleChange, sort }
}
