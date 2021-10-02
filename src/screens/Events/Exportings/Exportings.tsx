import useSWR from 'swr'
import { Button, Card, Form, Modal, Select, Typography } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import styles from '@/screens/Events/Exportings/Exportings.module.scss'
import { useBuildings } from '@/shared/hooks/use-buildings'
import { useHandleAddExporting } from '@/screens/Events/Exportings/hooks/useHandleAddExporting'

const getStatus = (exporting: Backend.Export) => {
  return exporting.confirmed_at ? `завершён` : `необходимо завершить`
}

export const Exportings = () => {
  const { data: exports } = useSWR<Backend.Export[]>(`/tank-takeout-requests`)
  const [visible, setVisible] = useState(false)
  const { buildings } = useBuildings()
  const { handleAddExporting } = useHandleAddExporting(setVisible)
  const [form] = Form.useForm()

  return (
    <div className={styles.wrapper}>
      <Typography.Title className={styles.title} level={2}>
        Вывозы
      </Typography.Title>
      <Button
        block
        className={styles.button}
        size='large'
        onClick={() => setVisible(true)}
      >
        Организовать вывоз
      </Button>
      {exports
        ?.slice()
        .reverse()
        .map((exporting) => (
          <Card key={exporting.id} className={styles.card}>
            <div className={styles.cardBody}>
              <Typography.Title level={5}>
                Вывоз №{exporting.id}
              </Typography.Title>
              <Typography.Paragraph>
                Последнее изменение:{` `}
                {moment(exporting.confirmed_at || exporting.created_at).format(
                  `DD.MM.YYYY`,
                )}
              </Typography.Paragraph>
              <Typography.Paragraph>
                Статус: {getStatus(exporting)}
              </Typography.Paragraph>
            </div>
          </Card>
        ))}
      <Modal
        footer={[
          <Button
            key='create'
            size='large'
            type='primary'
            onClick={form.submit}
          >
            Создать
          </Button>,
        ]}
        title='Создать вызов'
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <Form className={styles.form} form={form} onFinish={handleAddExporting}>
          <Form.Item name='building'>
            <Select
              options={buildings}
              placeholder='Выберите здание'
              size='large'
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
