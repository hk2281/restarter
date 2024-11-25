import { Button, Form, Input, InputNumber, Select, Typography } from 'antd'
import { PhoneOutlined, MailOutlined } from '@ant-design/icons'
import Head from 'next/head'
import { useContext, useMemo, useState } from 'react'
import styles from 'src/screens/AddContainer/AddContainer.module.scss'
import { UnauthorizedLayout } from '@/shared/components/UnauthorizedLayout'
import { containerTypes } from '@/config'
import { useBuildings } from '@/shared/hooks/use-buildings'
import { useHandleSubmit } from '@/screens/AddContainer/hooks/useHandleSubmit'
import { AuthContext } from '@/utils/authorization'

export const AddContainer = () => {
  const { buildings } = useBuildings()
  const { handleAddContainer } = useHandleSubmit()
  const [building, setBuilding] = useState<number>()
  const [buildingPart, setBuildingPart] = useState<number>()
  const [form] = Form.useForm()
  const { authorized } = useContext(AuthContext)

  const buildingParts = useMemo(
    () =>
      buildings
        ?.find((buildingItem) => buildingItem.id === building)
        ?.building_parts?.map(({ id, num }) => ({
          value: id,
          label: `Корпус ${num}`,
        })),
    [building, buildings],
  )

  const options = containerTypes.filter(
    (containerType) => !containerType.requiresAuth || authorized,
  )

  return (
    <>
      <Head>
        <title>Добавить контейнер</title>
      </Head>
      <Typography.Title>Добавить контейнер</Typography.Title>
      <Typography.Paragraph>
        Начните раздельный сбор макулатуры с рассказа о себе
      </Typography.Paragraph>
      <Form form={form} onFinish={handleAddContainer}>
        <Form.Item name='email'>
          <Input
            placeholder='mail@support.ru'
            prefix={<MailOutlined />}
            size='large'
          />
        </Form.Item>
        <Form.Item name='phone'>
          <Input
            placeholder='89123456789'
            prefix={<PhoneOutlined />}
            size='large'
          />
        </Form.Item>
        <Form.Item name='building'>
          <Select
            options={buildings}
            placeholder='Выберите здание'
            size='large'
            value={building}
            onChange={(value) => setBuilding(Number(value))}
          />
        </Form.Item>
        {!!buildingParts?.length && (
          <Form.Item name='building_part'>
            <Select
              options={buildingParts}
              placeholder='Выберите корпус'
              size='large'
              value={buildingPart}
              onChange={(value) => setBuildingPart(Number(value))}
            />
          </Form.Item>
        )}
        <div className={styles.formItemsPair}>
          <Form.Item
            name='floor'
            rules={[{ required: true, message: `Введите этаж` }]}
          >
            <InputNumber placeholder='Этаж' size='large' />
          </Form.Item>
          <Form.Item name='room'>
            <Input placeholder='Аудитория' size='large' />
          </Form.Item>
        </div>
        <Form.Item name='kind'>
          <Select
            options={options}
            placeholder='Объем контейнера'
            size='large'
          />
        </Form.Item>
        <Form.Item name='description'>
          <Input.TextArea placeholder='Комментарий' size='large' />
        </Form.Item>
        <Form.Item>
          <Button block htmlType='submit' size='large' type='primary'>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

AddContainer.layout = UnauthorizedLayout
