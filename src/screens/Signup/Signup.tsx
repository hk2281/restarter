import { Button, Form, Input, InputNumber, Select, Typography } from 'antd'
import { PhoneOutlined, MailOutlined } from '@ant-design/icons'
import { useMemo } from 'react'
import useSWR from 'swr'
import { OneAuthorizationStateRoute } from '@/utils/authorization'
import { UnauthorizedLayout } from '@/shared/UnauthorizedLayout'
import { Building } from '@/screens/Signup/types/building'
import styles from 'src/screens/Signup/Signup.module.scss'

export const Signup = () => {
  const { data: buildings } = useSWR<Building[]>(`/buildings`)

  const buildingsOptions = useMemo(
    () =>
      buildings?.map((building) => ({
        label: building.address,
        value: building.id,
      })),
    [buildings],
  )

  return (
    <OneAuthorizationStateRoute authorized={false}>
      <Typography.Title>Регистрация</Typography.Title>
      <Typography.Paragraph>
        Начните ответственный подход к макулатуре с рассказа о себе
      </Typography.Paragraph>
      <Form name='kek' onFinish={() => null}>
        <Form.Item>
          <Input
            placeholder='mail@support.ru'
            size='large'
            suffix={<MailOutlined />}
          />
        </Form.Item>
        <Form.Item>
          <Input
            placeholder='89123456789'
            size='large'
            suffix={<PhoneOutlined />}
          />
        </Form.Item>
        <Form.Item>
          <Select
            options={buildingsOptions}
            placeholder='Корпус'
            size='large'
          />
        </Form.Item>
        <div className={styles.formItemsPair}>
          <Form.Item
            name='floor'
            rules={[{ required: true, message: `Введите этаж` }]}
          >
            <InputNumber placeholder='Этаж' size='large' />
          </Form.Item>
          <Form.Item>
            <Input placeholder='Аудитория' size='large' />
          </Form.Item>
        </div>
        <Form.Item>
          <Select placeholder='Объем контейнера' size='large' />
        </Form.Item>
        <Form.Item>
          <Input.TextArea placeholder='Комментарий' size='large' />
        </Form.Item>
        <Form.Item>
          <Button block htmlType='submit' size='large' type='primary'>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </OneAuthorizationStateRoute>
  )
}

Signup.title = `Регистрация`
Signup.layout = UnauthorizedLayout
