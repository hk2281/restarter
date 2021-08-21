import { Button, Form, Select } from 'antd'
import { Container } from '@/screens/Containers/types/container'
import { useBuildings } from '@/shared/hooks/use-buildings'
import styles from 'src/screens/Containers/Filters/Filters.module.scss'
import { FiltersType } from '@/screens/Containers/hooks/useTableData'

interface Props {
  filters: FiltersType
  selectedRows?: Container[]
}

const isFullToValue: Record<number, boolean> = { 0: false, 1: true }

export const Filters = (props: Props) => {
  const { filters, selectedRows } = props
  const { buildings } = useBuildings()

  return (
    <>
      <Form.Item className={styles.row}>
        <Button disabled={!selectedRows?.length} size='large' type='primary'>
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
          onChange={(value) =>
            filters.setIsFull(isFullToValue[value as number])
          }
        />
      </Form.Item>
    </>
  )
}
