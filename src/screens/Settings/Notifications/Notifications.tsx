import { Button, Form, Input, Select, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { takeoutConditions, takeoutConditionTypes } from '@/config'
import styles from '@/screens/Settings/Notifications/Notifications.module.scss'
import { useBuildings } from '@/shared/hooks/use-buildings'
import { useTakeoutConditions } from '@/screens/Settings/Notifications/hooks/useTakeoutConditions'

export const Notifications = () => {
  const [building, setBuilding] = useState<number>()
  const [buildingPart, setBuildingPart] = useState<number>()
  const { buildings } = useBuildings()
  const { data: conditions } = useTakeoutConditions({ building })
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

  return (
    <Form className={styles.form}>
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
                addonAfter='сообщений о заполненности контейнера в общественном месте'
                addonBefore='Игнорировать первые'
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
        </>
      )}
    </Form>
  )
}
