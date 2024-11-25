import { memo, ReactNode } from 'react'
import { PageHeader } from 'antd'
import Link from 'next/link'
import styles from '@/shared/components/AuthorizedLayout/AuthorizedLayout.module.scss'
// import { Navigation } from '@/shared/components/AuthorizedLayout/Navigation/Navigation'
import { OneAuthorizationStateRoute } from '@/utils/authorization'
import { PATH } from '@/config'
import dynamic from 'next/dynamic';

const Navigation = dynamic(
  () => import('@/shared/components/AuthorizedLayout/Navigation/Navigation'),
  { ssr: false }
);

interface Props {
  children: ReactNode
  wide?: boolean
}

// eslint-disable-next-line react/display-name
const AuthorizedLayout = memo(({ children, wide }: Props) => {
  return (
    <>
      <PageHeader
        className={styles.header}
        ghost={false}
        title={
          <Link href={PATH.HOME}>
            <a className={styles.link}>RecycleStarter</a>
          </Link>
        }
      />
      <div className={wide ? styles.wideWrapper : styles.wrapper}>
        <Navigation />
        <OneAuthorizationStateRoute authorized={true}>
          <div className={styles.content}>{children}</div>
        </OneAuthorizationStateRoute>
      </div>
    </>
  )
})

export const authorizedLayoutRenderer = (
  additionalProps: Partial<Props> = {},
) =>
  // eslint-disable-next-line react/display-name
  memo((props: Props) => <AuthorizedLayout {...props} {...additionalProps} />)
