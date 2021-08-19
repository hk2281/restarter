import { Button, Form, Input, InputNumber, Select, Typography } from 'antd'
import { PhoneOutlined, MailOutlined } from '@ant-design/icons'
import Head from 'next/head'
import { OneAuthorizationStateRoute } from '@/utils/authorization'
import { UnauthorizedLayout } from '@/shared/components/UnauthorizedLayout'
import { containerTypes } from '@/config'
import styles from 'src/screens/Signup/Signup.module.scss'
import { useBuildings } from '@/shared/hooks/use-buildings'
import { useHandleSignup } from '@/screens/Signup/hooks/useHandleSignup'

export const Signup = () => {
  const { buildings } = useBuildings()
  const { handleSignup } = useHandleSignup()

  return (
    <>
      <Head>
        <title>Регистрация</title>
      </Head>
      <OneAuthorizationStateRoute authorized={false}>
        <Typography.Title>Регистрация</Typography.Title>
        <Typography.Paragraph>
          Начните ответственный подход к макулатуре с рассказа о себе
        </Typography.Paragraph>
        <Form onFinish={handleSignup}>
          <Form.Item name='email'>
            <Input
              placeholder='mail@support.ru'
              prefix={<MailOutlined />}
              size='large'
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder='89123456789'
              prefix={<PhoneOutlined />}
              size='large'
            />
          </Form.Item>
          <Form.Item name='password'>
            <Input.Password />
          </Form.Item>
          <Form.Item
            hasFeedback
            dependencies={[`password`]}
            name='confirm'
            rules={[
              {
                required: true,
                message: `Подтвердите пароль`,
              },
              ({ getFieldValue }) => ({
                validator: (_, value) =>
                  !value || getFieldValue(`password`) === value
                    ? Promise.resolve()
                    : Promise.reject(new Error(`Пароли не совпадают`)),
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Select options={buildings} placeholder='Корпус' size='large' />
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
            <Select
              options={containerTypes}
              placeholder='Объем контейнера'
              size='large'
            />
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
    </>
  )
}

Signup.layout = UnauthorizedLayout
