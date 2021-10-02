import { Button, Form, Select } from 'antd'
import { Key } from 'react'
import { useBuildings } from '@/shared/hooks/use-buildings'
import styles from 'src/screens/Containers/Filters/Filters.module.scss'
import { FiltersType } from '@/screens/Containers/hooks/useTableData'
import { useHandleCreateGathering } from '@/screens/Containers/Filters/hooks/useHandleCreateGathering'

interface Props {
  filters: FiltersType
  rowSelection: {
    onChange: ([], []) => void
    selectedRowKeys?: Key[]
  }
  selectedRows?: Backend.Container[]
  tableData?: Backend.Container[]
}

const isFullToValue: Record<number, boolean> = { 0: false, 1: true }

export const Filters = (props: Props) => {
  const { filters, rowSelection, selectedRows } = props
  const { buildings } = useBuildings()
  const { handleCreateGathering } = useHandleCreateGathering({
    rowSelection,
    selectedRows,
  })

  return (
    <Form.Item className={styles.row}>
      <Button
        disabled={!rowSelection.selectedRowKeys?.length}
        size='large'
        type='primary'
        onClick={handleCreateGathering}
      >
        Организовать сбор
      </Button>
      <br />
      <Select
        allowClear
        options={buildings}
        placeholder='Здание'
        size='large'
        onChange={filters.setBuilding}
      />
      <Select
        allowClear
        options={[
          { label: `Не заполнен`, value: 0 },
          { label: `Заполнен`, value: 1 },
        ]}
        placeholder='Состояние'
        size='large'
        onChange={(value) => filters.setIsFull(isFullToValue[value as number])}
      />
    </Form.Item>
  )
}
