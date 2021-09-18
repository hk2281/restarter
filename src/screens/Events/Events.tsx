import { authorizedLayoutRenderer } from '@/shared/components/AuthorizedLayout'
import { Gatherings } from '@/screens/Events/Gatherings/Gatherings'
import styles from 'src/screens/Events/Events.module.scss'
import { Exportings } from '@/screens/Events/Exportings/Exportings'

export const Events = () => {
  return (
    <div className={styles.wrapper}>
      <Gatherings />
      <Exportings />
    </div>
  )
}

Events.layout = authorizedLayoutRenderer()
