import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Dispatch, useMemo } from 'react'
import { AlignType } from 'rc-table/es/interface'
import { Building } from '@/screens/Signup/types/building'
import { containerStatuses } from '@/config'

interface Params {
  setEditingId: Dispatch<number | undefined>
}

type Sorter = () => number

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
        align: `center` as AlignType,
      },
      {
        title: `Адрес здания`,
        dataIndex: `building`,
        key: `building`,
        render: (building: Building) => building.address,
        sorter: (() => 0) as Sorter,
      },
      {
        title: `Корпус`,
        dataIndex: `building_part`,
        key: `building_part`,
        render: (buildingPart?: Building['building_part']) =>
          buildingPart?.num || `–`,
        sorter: (() => 0) as Sorter,
        align: `center` as AlignType,
      },
      {
        title: `Этаж`,
        dataIndex: `floor`,
        key: `floor`,
        sorter: (() => 0) as Sorter,
        align: `center` as AlignType,
      },
      {
        title: `Комментарий`,
        dataIndex: `description`,
        key: `description`,
        sorter: (() => 0) as Sorter,
      },
      {
        title: `Активность`,
        dataIndex: `status`,
        key: `status`,
        render: (status: number) =>
          containerStatuses.find(
            (containerStatus) => containerStatus.value === status,
          )?.label,
        sorter: (() => 0) as Sorter,
        align: `center` as AlignType,
      },
      {
        title: `Состояние`,
        dataIndex: `is_full`,
        key: `is_full`,
        render: (isFull: boolean) => (isFull ? `Заполнен` : `Не заполнен`),
        sorter: (() => 0) as Sorter,
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
