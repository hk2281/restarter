import { authorizedLayoutRenderer } from '@/shared/components/AuthorizedLayout'
import { Gatherings } from '@/screens/Events/Gatherings/Gatherings'
import styles from 'src/screens/Events/Events.module.scss'

export const Events = () => {
  return (
    <div className={styles.wrapper}>
      <Gatherings />
      <Gatherings />
    </div>
  )
}

Events.layout = authorizedLayoutRenderer()
