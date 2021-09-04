import { Button, Form, Input, Typography } from 'antd'
import { takeoutConditions, takeoutConditionTypes } from '@/config'
import styles from '@/screens/Settings/Notifications/Notifications.module.scss'

export const Notifications = () => {
  return (
    <Form className={styles.form}>
      <Typography.Paragraph>
        <Form.Item
          name={takeoutConditions[takeoutConditionTypes.maxDaysOffice]}
        >
          <Input
            addonAfter='дней в офисе'
            addonBefore='Не более'
            size='large'
          />
        </Form.Item>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Form.Item
          name={takeoutConditions[takeoutConditionTypes.maxDaysOffice]}
        >
          <Input
            addonAfter='дней в общественном месте'
            addonBefore='Не более'
            size='large'
          />
        </Form.Item>
      </Typography.Paragraph>
      <Typography.Paragraph className={styles.wide}>
        <Form.Item
          name={takeoutConditions[takeoutConditionTypes.maxDaysOffice]}
        >
          <Input
            addonAfter='кг'
            addonBefore='Суммарная масса бумаги в корпусе не больше'
            size='large'
          />
        </Form.Item>
      </Typography.Paragraph>
      <Button block size='large' type='primary'>
        Сохранить изменения
      </Button>
    </Form>
  )
}
