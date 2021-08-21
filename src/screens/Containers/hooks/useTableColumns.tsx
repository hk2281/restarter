import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Dispatch, useMemo } from 'react'
import { Building } from '@/screens/Signup/types/building'
import { containerStatuses } from '@/config'

interface Params {
  setEditingId: Dispatch<number | undefined>
}

export const useTableColumns = ({ setEditingId }: Params) => {
  const columns = useMemo(
    () => [
      {
        title: `ID`,
        dataIndex: `id`,
        key: `id`,
      },
      {
        title: `Аудитория`,
        dataIndex: `room`,
        key: `room`,
      },
      {
        title: `Адрес здания`,
        dataIndex: `building`,
        key: `building`,
        render: (building: Building) => building.address,
      },
      {
        title: `Этаж`,
        dataIndex: `floor`,
        key: `floor`,
      },
      {
        title: `Комментарий`,
        dataIndex: `description`,
        key: `description`,
      },
      {
        title: `Активность`,
        dataIndex: `status`,
        key: `status`,
        render: (status: number) =>
          containerStatuses.find(
            (containerStatus) => containerStatus.value === status,
          )?.label,
      },
      {
        title: `Состояние`,
        dataIndex: `is_full`,
        key: `is_full`,
        render: (isFull: boolean) => (isFull ? `Заполнен` : `Не заполнен`),
      },
      {
        key: `edit`,
        dataIndex: `id`,
        // eslint-disable-next-line react/display-name
        render: (id: number) => (
          <Button icon={<EditOutlined />} onClick={() => setEditingId(id)} />
        ),
      },
    ],
    [setEditingId],
  )

  return { columns }
}
