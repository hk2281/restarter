import { Button, Descriptions, Divider, Form, Input, Modal, Table } from 'antd'
import useSWR, { mutate } from 'swr'
import moment from 'moment'
import { Key, useCallback, useEffect, useState } from 'react'
import { api } from '@/api'

interface Props {
  id?: number
  close: () => void
}

export const GatheringModal = ({ id, close }: Props) => {
  const { data: gathering } = useSWR<Backend.Gathering>(
    id ? `/container-takeout-requests/${id}` : null,
  )

  const [selectedRows, setSelectedRows] = useState<Key[]>([])
  const [form] = Form.useForm()

  const handleSubmit = useCallback(
    async (values: Record<string, unknown>) => {
      await api.patch(`/container-takeout-requests/${id}`, {
        emptied_containers: selectedRows,
        ...values,
      })
      await mutate(`/container-takeout-requests`)
      close()
    },
    [close, id, selectedRows],
  )

  useEffect(() => {
    if (id) {
      setSelectedRows([])
      form.resetFields()
    }
  }, [form, id])

  return (
    <>
      <Modal
        footer={[
          <Button
            key='create'
            size='large'
            type='primary'
            onClick={form.submit}
          >
            Завершить сбор
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
        <Divider />
        <Table
          columns={[
            {
              dataIndex: `building`,
              title: `Вынесенные контейнеры`,
              render: (_building: ['building'], container: Backend.Container) =>
                [
                  `ID ${container.id}`,
                  container?.building?.address,
                  container.room
                    ? `аудитория ${container.room}`
                    : `без аудитории`,
                ]
                  .filter((elem) => !!elem)
                  .join(`, `),
            },
          ]}
          dataSource={gathering?.containers.map((container) => ({
            key: container.id,
            ...container,
          }))}
          pagination={false}
          rowSelection={{ onChange: setSelectedRows }}
        />
        <Divider />
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label='ФИО рабочего'
            name='worker_info'
            rules={[{ required: true, message: `Введите ФИО` }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
