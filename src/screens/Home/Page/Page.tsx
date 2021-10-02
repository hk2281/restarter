import Image from 'next/image'
import { ReactNode } from 'react'
import styles from 'src/screens/Home/Page/Page.module.scss'

interface Props {
  src: StaticImageData
  prefix: ReactNode
  value?: number
  postfix: ReactNode
}

export const Page = ({ src, prefix, value, postfix }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <div className={styles.imageContent}>
          <Image alt='' className={styles.image} layout='fill' src={src} />
        </div>
      </div>
      <div className={styles.text}>
        <p className={styles.prefix}>{prefix}</p>
        <p className={styles.value}>{value}</p>
        <p className={styles.postfix}>{postfix}</p>
      </div>
    </div>
  )
}
