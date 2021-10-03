import { Button, Descriptions, Divider, Form, Input, Modal } from 'antd'
import useSWR, { mutate } from 'swr'
import moment from 'moment'
import { useCallback, useEffect } from 'react'
import { api } from '@/api'

interface Props {
  id?: number
  close: () => void
}

const getStatus = (exporting?: Backend.Export) => {
  return exporting?.confirmed_at ? `Завершён` : `Необходимо завершить`
}

export const ExportingsModal = ({ id, close }: Props) => {
  const { data: exporting } = useSWR<Backend.Export>(
    id ? `/tank-takeout-requests/${id}` : null,
  )
  const [form] = Form.useForm()

  const handleSubmit = useCallback(
    async (values: Record<string, unknown>) => {
      await api.patch(`/tank-takeout-requests/${id}`, values)
      await mutate(`/tank-takeout-requests`)
      close()
    },
    [close, id],
  )

  useEffect(() => {
    if (id) {
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
        title={`Вывоз №${id}`}
        visible={!!id}
        onCancel={close}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label='Дата'>
            {moment(exporting?.confirmed_at || exporting?.created_at).format(
              `DD.MM.YYYY`,
            )}
          </Descriptions.Item>
          <Descriptions.Item label='Статус'>
            {getStatus(exporting)}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label='Масса'
            name='confirmed_mass'
            rules={[{ required: true, message: `Введите массу` }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
