import { useCallback } from 'react'
import { mutate } from 'swr'
import { useRouter } from 'next/router'
import { api } from '@/api'
import { PATH } from '@/config'
import { declareNumber } from '@/utils/declareNumber'

interface Params {
  id: number
}

export const useFillContainer = ({ id }: Params) => {
  const router = useRouter()
  return {
    fillContainer: useCallback(async () => {
      const { data } = await api.post(`/full-container-reports`, {
        container: id,
      })

      await mutate(`/containers/${id}`)
      await router.push({
        pathname: PATH.RESULT,
        query: {
          container: id,
          status: `success`,
          title: `Вы молодец, контейнер будет вывезен через ~${
            data.time_condition_days
          } ${declareNumber(data.time_condition_days, [
            `день`,
            `дня`,
            `дней`,
          ])}`,
          text: `В день вывоза специально обученные люди заберут макулатуру прямо из офиса.`,
        },
      })
    }, [id, router]),
  }
}
