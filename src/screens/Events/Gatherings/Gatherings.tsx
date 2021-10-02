import { Card, Typography } from 'antd'
import useSWR from 'swr'
import moment from 'moment'
import { useState } from 'react'
import classNames from 'classnames'
import styles from 'src/screens/Events/Gatherings/Gatherings.module.scss'
import { GatheringModal } from '@/screens/Events/Gatherings/GatheringModal/GatheringModal'

const getStatus = (gathering: Backend.Gathering) => {
  return gathering.confirmed_at ? `выполнен` : `надо выполнить`
}

export const Gatherings = () => {
  const { data: gatherings } = useSWR<Backend.Gathering[]>(
    `/container-takeout-requests`,
  )
  const [id, setId] = useState<number | undefined>()

  return (
    <div className={styles.wrapper}>
      <Typography.Title className={styles.title} level={2}>
        Сборы
      </Typography.Title>
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
    </div>
  )
}
