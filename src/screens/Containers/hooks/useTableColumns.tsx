import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Building } from '@/screens/Signup/types/building'
import { containerStatuses } from '@/config'

export const useTableColumns = () => {
  const columns = [
    {
      title: `ID`,
      dataIndex: `id`,
      key: `id`,
    },
    {
      title: `Номер аудитории`,
      dataIndex: `location`,
      key: `location`,
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
      title: `Состояние`,
      dataIndex: `status`,
      key: `status`,
      render: (status: number) =>
        containerStatuses.find(
          (containerStatus) => containerStatus.value === status,
        )?.label,
    },
    {
      key: `edit`,
      dataIndex: `key`,
      // eslint-disable-next-line react/display-name
      render: () => <Button icon={<EditOutlined />} />,
    },
  ]

  return { columns }
}
