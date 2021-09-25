import { Button, Descriptions, Modal } from 'antd'
import useSWR from 'swr'
import moment from 'moment'

interface Props {
  id?: number
  close: () => void
}

export const GatheringModal = ({ id, close }: Props) => {
  const { data: gathering } = useSWR<Backend.Gathering>(
    id ? `/container-takeout-requests/${id}` : null,
  )
  return (
    <>
      <Modal
        footer={[
          <Button key='create' size='large' type='primary'>
            Создать
          </Button>,
        ]}
        title={`Сбор №${id}`}
        visible={!!id}
        onCancel={close}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label='Дата'>
            {moment(gathering?.confirmed_at || gathering?.created_at).format(
              `DD.MM.YYYY`,
            )}
          </Descriptions.Item>
          <Descriptions.Item label='Статус'>Prepaid</Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  )
}
