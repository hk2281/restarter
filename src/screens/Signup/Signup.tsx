import { Button, Form, Input, InputNumber, Select, Typography } from 'antd'
import { PhoneOutlined, MailOutlined } from '@ant-design/icons'
import { OneAuthorizationStateRoute } from '@/utils/authorization'
import { UnauthorizedLayout } from '@/shared/UnauthorizedLayout'

export const Signup = () => {
  return (
    <OneAuthorizationStateRoute authorized={false}>
      <Typography.Title>Регистрация</Typography.Title>
      <Form>
        <Form.Item label='Почта'>
          <Input prefix={<MailOutlined />} />
        </Form.Item>
        <Form.Item label='Телефон'>
          <Input prefix={<PhoneOutlined />} />
        </Form.Item>
        <Form.Item label='Корпус'>
          <Select />
        </Form.Item>
        <Form.Item label='Этаж'>
          <InputNumber />
        </Form.Item>
        <Form.Item label='Аудитория'>
          <Input />
        </Form.Item>
        <Form.Item label='Объем контейнера'>
          <Select />
        </Form.Item>
        <Form.Item label='Комментарий'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button>Зарегистрироваться</Button>
        </Form.Item>
      </Form>
    </OneAuthorizationStateRoute>
  )
}

Signup.title = `Регистрация`
Signup.layout = UnauthorizedLayout
