import useSWR from 'swr'
import { Card, Typography } from 'antd'
import moment from 'moment'
import styles from '@/screens/Events/exportings/exportings.module.scss'

const getStatus = (exporting: Backend.Export) => {
  return exporting.confirmed_at ? `завершён` : `необходимо завершить`
}

export const Exportings = () => {
  const { data: exports } = useSWR<Backend.Export[]>(`/tank-takeout-requests`)
  return (
    <div className={styles.wrapper}>
      <Typography.Title className={styles.title} level={2}>
        Вывозы
      </Typography.Title>
      {exports
        ?.slice(-3)
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
    </div>
  )
}
