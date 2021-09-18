import { Checkbox, Form, Button } from 'antd'
import { useCallback, useState } from 'react'
import { saveAs } from 'file-saver'
import { authorizedLayoutRenderer } from '@/shared/components/AuthorizedLayout'
import { api } from '@/api'

const saveFile = async (url: string, name: string) => {
  const { data } = await api.get(url, { responseType: `blob` })
  saveAs(data, name)
}

export const Stats = () => {
  const [checks, setChecks] = useState(new Array(4).fill(false))

  const checkAll = useCallback((event) => {
    const value = event.target.checked
    setChecks(new Array(4).fill(value))
  }, [])

  const getHandleCheck = useCallback(
    (id) => (event: any) => {
      const checksTmp = [...checks]
      checksTmp[id] = event.target.checked
      setChecks(checksTmp)
    },
    [checks],
  )

  const handleSubmit = useCallback(async () => {
    const promises = []

    if (checks[0]) {
    }
    if (checks[1]) {
      promises.push(await saveFile(`/stats/containers`, `containers.xlsx`))
    }
    if (checks[2]) {
      promises.push(
        await saveFile(`/stats/container-takeouts`, `gatherings.xlsx`),
      )
    }
    if (checks[3]) {
      promises.push(await saveFile(`/stats/tank-takeouts`, `exports.xlsx`))
    }

    await Promise.allSettled(promises)
  }, [checks])

  return (
    <Form layout='vertical'>
      <Form.Item>
        <Checkbox checked={checks[0]} onChange={getHandleCheck(0)}>
          Общие данные по объемам
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox checked={checks[1]} onChange={getHandleCheck(1)}>
          Контейнеры
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox checked={checks[2]} onChange={getHandleCheck(2)}>
          Сборы
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox checked={checks[3]} onChange={getHandleCheck(3)}>
          Вывозы
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Checkbox
          checked={!checks.includes(false)}
          indeterminate={checks.includes(false) && checks.includes(true)}
          onChange={checkAll}
        >
          Выбрать всё
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button size='large' type='primary' onClick={handleSubmit}>
          Выгрузить excel-файл
        </Button>
      </Form.Item>
    </Form>
  )
}

Stats.layout = authorizedLayoutRenderer()
