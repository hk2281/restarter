import Image from 'next/image'
import styles from 'src/screens/Home/Page/Page.module.scss'

interface Props {
  src: StaticImageData
  prefix: string
  value?: number
}

export const Page = ({ src, prefix, value }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <div className={styles.imageContent}>
          <Image alt='' className={styles.image} layout='fill' src={src} />
        </div>
      </div>
      <div className={styles.text}>
        <p className={styles.prefix}>{prefix}: </p>
        <p className={styles.value}>{value}</p>
      </div>
    </div>
  )
}
