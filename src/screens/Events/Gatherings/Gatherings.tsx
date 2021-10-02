import { Button, Card, Form, Input, Modal, Select, Typography } from 'antd'
import useSWR from 'swr'
import moment from 'moment'
import { useCallback, useState } from 'react'
import classNames from 'classnames'
import styles from 'src/screens/Events/Gatherings/Gatherings.module.scss'
import { GatheringModal } from '@/screens/Events/Gatherings/GatheringModal/GatheringModal'
import { useBuildings } from '@/shared/hooks/use-buildings'
import { api } from '@/api'

const getStatus = (gathering: Backend.Gathering) => {
  return gathering.confirmed_at ? `выполнен` : `надо выполнить`
}

export const Gatherings = () => {
  const { data: gatherings, mutate } = useSWR<Backend.Gathering[]>(
    `/container-takeout-requests`,
  )
  const [id, setId] = useState<number | undefined>()
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const { buildings } = useBuildings()

  const handleAddExporting = useCallback(
    async (values: Record<string, unknown>) => {
      await api.post(`/container-takeout-requests`, values)
      await mutate()
      setVisible(false)
    },
    [mutate],
  )

  return (
    <div className={styles.wrapper}>
      <Typography.Title className={styles.title} level={2}>
        Сборы
      </Typography.Title>
      <Button
        block
        className={styles.button}
        size='large'
        onClick={() => setVisible(true)}
      >
        Организовать сбор архива
      </Button>
      {gatherings
        ?.slice()
        .reverse()
        .map((gathering) => (
          <Card
            key={gathering.id}
            className={classNames(
              styles.card,
              gathering.confirmed_at && styles.disabled,
            )}
            onClick={() => setId(gathering.id)}
          >
            <div className={styles.cardBody}>
              <Typography.Title level={5}>
                Сбор №{gathering.id}
              </Typography.Title>
              <Typography.Paragraph>
                Последнее изменение:{` `}
                {moment(gathering.confirmed_at || gathering.created_at).format(
                  `DD.MM.YYYY`,
                )}
              </Typography.Paragraph>
              <Typography.Paragraph>
                Статус: {getStatus(gathering)}
              </Typography.Paragraph>
            </div>
          </Card>
        ))}
      <GatheringModal close={() => setId(undefined)} id={id} />
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
          <Form.Item name='requesting_worker_name'>
            <Input placeholder='ФИО обратившегося сотрудника' size='large' />
          </Form.Item>
          <Form.Item name='requesting_worker_phone'>
            <Input placeholder='Телефон сотрудника' size='large' />
          </Form.Item>
          <Form.Item name='building'>
            <Select
              options={buildings}
              placeholder='Выберите здание'
              size='large'
            />
          </Form.Item>
          <Form.Item name='archive_room'>
            <Input placeholder='Аудитория' size='large' />
          </Form.Item>
          <Form.Item name='archive_mass'>
            <Input placeholder='Объем сбора' size='large' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
