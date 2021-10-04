import { useEffect } from 'react'
import { Button, Form, Input, Modal, Select, Switch } from 'antd'
import { useBuildings } from '@/shared/hooks/use-buildings'
import { useContainer } from '@/shared/hooks'
import { containerStatuses } from '@/config'
import { useHandleSubmit } from '@/screens/Containers/Edit/hooks/useHandleSubmit'

interface Props {
  id?: number
  onClose: () => void
  mutateTableData: () => Promise<Backend.Container[] | undefined>
}

export const Edit = ({ id, onClose, mutateTableData }: Props) => {
  const [form] = Form.useForm()
  const { data: container, isValidating } = useContainer({ id })
  const { buildings } = useBuildings()
  const { handleSubmit } = useHandleSubmit({ id, onClose, mutateTableData })

  useEffect(() => {
    if (container) {
      form.setFieldsValue({ ...container, building: container.building.id })
    }
  }, [container, form])

  return (
    <Modal
      footer={
        <Button size='large' type='primary' onClick={form.submit}>
          Сохранить
        </Button>
      }
      title={`ID ${container?.id}`}
      visible={!!id}
      onCancel={onClose}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item label='Аудитория' name='room'>
          <Input disabled={isValidating} size='large' />
        </Form.Item>
        <Form.Item label='Здание' name='building'>
          <Select disabled={isValidating} options={buildings} size='large' />
        </Form.Item>
        <Form.Item label='Этаж' name='floor'>
          <Input disabled={isValidating} size='large' />
        </Form.Item>
        <Form.Item label='Заполнен' name='is_full' valuePropName='checked'>
          <Switch disabled={isValidating} />
        </Form.Item>
        <Form.Item label='Активность' name='status'>
          <Select
            disabled={isValidating}
            options={containerStatuses}
            size='large'
          />
        </Form.Item>
        <Form.Item label='Комментарий' name='description'>
          <Input.TextArea disabled={isValidating} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
