import { Form, Table, Typography, Card, Checkbox, Button } from 'antd'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { authorizedLayoutRenderer } from '@/shared/components/AuthorizedLayout'
import { useTableColumns } from '@/screens/Containers/hooks/useTableColumns'
import { useTableRowSelection } from '@/screens/Containers/hooks/useTableRowSelection'
import { useTableData } from '@/screens/Containers/hooks/useTableData'
import { Edit } from '@/screens/Containers/Edit/Edit'
import { Filters } from '@/screens/Containers/Filters/Filters'
import { useFilters } from '@/screens/Containers/hooks/useFilters'
import { useTableSort } from '@/screens/Containers/hooks/useTableSort'
import { EditOutlined } from '@ant-design/icons'
import { containerStatuses } from '@/config'
import styles from 'src/screens/Containers/style.module.css'

interface DataDisplayProps {
  data: any
  onEdit: (id: number) => void
}

export const DataDisplay: React.FC<DataDisplayProps> = ({ data, onEdit }) => {
  return (
    <>
      <div>
        <strong>ID:</strong> {data.id}
      </div>
      <div>
        <strong>Аудитория:</strong> {data.room}
      </div>
      <div>
        <strong>Адрес здания:</strong> {data.building?.address || '—'}
      </div>
      <div>
        <strong>Корпус:</strong> {data.building_part?.num || '—'}
      </div>
      <div>
        <strong>Этаж:</strong> {data.floor}
      </div>
      <div>
        <strong>Комментарий:</strong> {data.description || 'Нет комментария'}
      </div>
      <div>
        <strong>Активность:</strong> {containerStatuses.find((status) => status.value === data.status)?.label || 'Неизвестно'}
      </div>
      <div>
        <strong>Состояние:</strong> {data.is_full ? 'Заполнен' : 'Не заполнен'}
      </div>
      <div>
        <Button
          className={styles.editBtn}
          icon={<EditOutlined />}
          onClick={() => onEdit(data.id)}
          style={{ marginTop: '8px' }}
        >
          Редактировать
        </Button>
      </div>
    </>
  )
}

export const Containers = () => {
  const [editingId, setEditingId] = useState<number>()
  const isMobile = useMediaQuery({ maxWidth: 768 })

  const { filters } = useFilters()
  const { handleChange, sort } = useTableSort()
  const { data, isValidating, mutate } = useTableData({ filters, sort })
  const { columns } = useTableColumns({ setEditingId })
  const { rowSelection, selectedRows } = useTableRowSelection()

  const handleClose = useCallback(() => setEditingId(undefined), [])

  useEffect(() => {
    console.log("Component mounted, data is:", data)
  }, [data])

  // Функция для обработки выбора/снятия выбора карточки на мобильной версии
  const handleCardSelect = (id: number, checked: boolean) => {
    const updatedSelectedKeys = checked
      ? [...(rowSelection.selectedRowKeys || []), id]
      : (rowSelection.selectedRowKeys || []).filter(key => key !== id);

    const selectedRow = data?.find(item => item.id === id);
    const updatedSelectedRows = checked
      ? [...(selectedRows || []), ...(selectedRow ? [selectedRow] : [])]
      : (selectedRows || []).filter(row => row.id !== id);

    rowSelection.onChange(updatedSelectedKeys, updatedSelectedRows);
};
  // Функция для открытия редактора
  const handleEdit = (id: number) => {
    setEditingId(id)
  }

  return (
    <Form>
      <Head>
        <title>Контейнеры</title>
      </Head>
      <Typography.Title level={2}>Контейнеры</Typography.Title>
      <Filters
        filters={filters}
        rowSelection={rowSelection}
        selectedRows={selectedRows}
      />
      <Form.Item>
        {isMobile ? (
          !isValidating && data ? (
            <div>
              {data.map(item => (
                <Card key={item.id} style={{ marginBottom: '16px' }}>
                  <Checkbox
                    checked={(rowSelection.selectedRowKeys || []).includes(item.id)}
                    onChange={e => handleCardSelect(item.id, e.target.checked)}
                    style={{ marginBottom: '8px' }}
                  >
                    Выбрать
                  </Checkbox>
                  
                  <DataDisplay data={item} onEdit={handleEdit}/>
                </Card>
              ))}
            </div>
          ) : (
            <Typography.Text>Загрузка данных...</Typography.Text>
          )
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            loading={isValidating}
            pagination={false}
            rowSelection={rowSelection}
            style={{ overflowX: `auto` }}
            onChange={handleChange}
          />
        )}
      </Form.Item>
      <Edit id={editingId} mutateTableData={mutate} onClose={handleClose} />
    </Form>
  )
}

// eslint-disable-next-line react/display-name
Containers.layout = authorizedLayoutRenderer({ wide: true })
