import { Button, Card, Typography } from 'antd'
import useSWR from 'swr'
import moment from 'moment'
import styles from 'src/screens/Events/Gatherings/Gatherings.module.scss'

const getStatus = (gathering: Backend.Gathering) => {
  return gathering.confirmed_at ? `выполнен` : `надо выполнить`
}

export const Gatherings = () => {
  const { data: gatherings } = useSWR<Backend.Gathering[]>(
    `/container-takeout-requests`,
  )

  return (
    <div className={styles.wrapper}>
      <Typography.Title className={styles.title} level={2}>
        Сборы
      </Typography.Title>
      {gatherings
        ?.slice(-3)
        .reverse()
        .map((gathering) => (
          <Card key={gathering.id} className={styles.card}>
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
            <Button className={styles.button} size='large' type='primary'>
              В сбор
            </Button>
          </Card>
        ))}
    </div>
  )
}
