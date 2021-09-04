import { Button } from 'antd'
import { useCallback, useState } from 'react'
import { authorizedLayoutRenderer } from '@/shared/components/AuthorizedLayout'
import styles from 'src/screens/Tokens/Tokens.module.scss'
import { Token } from '@/screens/Tokens/Token/Token'

export const Tokens = () => {
  const [tokens, setTokens] = useState<JSX.Element[]>([])

  const handleAddToken = useCallback(() => {
    setTokens([...tokens, <Token key={tokens.length} />])
  }, [tokens])

  return (
    <div className={styles.wrapper}>
      {tokens}
      <Button block size='large' type='dashed' onClick={handleAddToken}>
        Новая ссылка для регистрации
      </Button>
    </div>
  )
}

Tokens.layout = authorizedLayoutRenderer()
