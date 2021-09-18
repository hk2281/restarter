import { Button, Form, Input, Select, Typography } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import styles from '@/screens/Settings/Notifications/Notifications.module.scss'
import { useBuildings } from '@/shared/hooks/use-buildings'
import { useTakeoutConditions } from '@/screens/Settings/Notifications/hooks/useTakeoutConditions'
import { useTakeoutConditionSubmit } from '@/screens/Settings/Notifications/hooks/useTakeoutConditionSubmit'

export const Notifications = () => {
  const [building, setBuilding] = useState<number>()
  const [buildingPart, setBuildingPart] = useState<number>()
  const { buildings } = useBuildings()
  const { data: conditions, mutate } = useTakeoutConditions({ building })
  const [form] = Form.useForm()
  const { handleSubmit } = useTakeoutConditionSubmit(mutate, conditions?.id)

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

  useEffect(() => {
    if (conditions) {
      form.setFieldsValue(conditions)
    }
  }, [conditions, form])

  return (
    <Form className={styles.form} form={form} onFinish={handleSubmit}>
      <Form.Item>
        <Select
          options={buildings}
          placeholder='Выберите здание'
          size='large'
          value={building}
          onChange={setBuilding}
        />
      </Form.Item>
      <Form.Item>
        {!!buildingParts?.length && (
          <Select
            options={buildingParts}
            placeholder='Выберите корпус'
            size='large'
            value={buildingPart}
            onChange={setBuildingPart}
          />
        )}
      </Form.Item>

      {conditions && (!buildingParts?.length || buildingPart) && (
        <>
          <Typography.Paragraph>
            <Form.Item name='office_days'>
              <Input
                addonAfter='дней в офисе'
                addonBefore='Не более'
                size='large'
              />
            </Form.Item>
          </Typography.Paragraph>
          <Typography.Paragraph>
            <Form.Item name='public_days'>
              <Input
                addonAfter='дней в общественном месте'
                addonBefore='Не более'
                size='large'
              />
            </Form.Item>
          </Typography.Paragraph>
          <Typography.Paragraph className={styles.wide}>
            <Form.Item name='ignore_reports'>
              <Input
                addonAfter='сообщений о заполненности контейнера в общественном месте'
                addonBefore='Игнорировать первые'
                size='large'
              />
            </Form.Item>
          </Typography.Paragraph>
          <Typography.Paragraph className={styles.wide}>
            <Form.Item name='mass'>
              <Input
                addonAfter='кг'
                addonBefore='Суммарная масса бумаги в корпусе не больше'
                size='large'
              />
            </Form.Item>
          </Typography.Paragraph>
          <Button block size='large' type='primary' onClick={form.submit}>
            Сохранить изменения
          </Button>
        </>
      )}
    </Form>
  )
}
