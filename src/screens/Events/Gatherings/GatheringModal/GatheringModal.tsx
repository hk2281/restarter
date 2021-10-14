import {
  Button,
  Descriptions,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Table,
} from 'antd'
import useSWR, { mutate } from 'swr'
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { api } from '@/api'

interface Props {
  id?: number
  close: () => void
}

enum ResultType {
  successful,
  unavailable,
  empty,
}

const getStatus = (gathering?: Backend.Gathering) => {
  return gathering?.confirmed_at ? `Выполнен` : `Надо выполнить`
}

export const GatheringModal = ({ id, close }: Props) => {
  const { data: gathering } = useSWR<Backend.Gathering>(
    id ? `/container-takeout-requests/${id}` : null,
  )

  const [results, setResults] = useState<{ id: number; value: ResultType }[]>(
    [],
  )
  const [form] = Form.useForm()

  const getContainerIdByResultType = useCallback(
    (resultType: ResultType) => {
      return results
        .filter((result) => result.value === resultType)
        .map((result) => result.id)
    },
    [results],
  )

  const handleSubmit = useCallback(async () => {
    const emptiedContainers = getContainerIdByResultType(ResultType.successful)
    const unavailableContainers = getContainerIdByResultType(
      ResultType.unavailable,
    )
    const emptyContainers = getContainerIdByResultType(ResultType.empty)
    await api.patch(`/container-takeout-requests/${id}`, {
      emptied_containers: emptiedContainers,
      unavailable_containers: unavailableContainers,
      already_empty_containers: emptyContainers,
    })
    await mutate(`/container-takeout-requests`)
    close()
  }, [close, getContainerIdByResultType, id])

  const handleSetResult = useCallback(
    (id: number, index: number, value: ResultType) => {
      setResults([
        ...results.slice(0, index),
        { id, value },
        ...results.slice(index + 1),
      ])
    },
    [results],
  )

  const options = [
    { value: ResultType.successful, label: `Опустошён` },
    { value: ResultType.unavailable, label: `Недоступен` },
    { value: ResultType.empty, label: `Был пуст` },
  ]

  useEffect(() => {
    if (gathering) {
      setResults(
        gathering.containers.map(({ id }) => ({
          id,
          value: ResultType.successful,
        })),
      )
      form.resetFields()
    }
  }, [form, gathering])

  return (
    <>
      <Modal
        footer={[
          <Button
            key='create'
            size='large'
            type='primary'
            onClick={form.submit}
          >
            Завершить сбор
          </Button>,
        ]}
        title={
          gathering?.archive_mass === null
            ? `Сбор №${id}`
            : `Сбор архива №${id}, ${gathering?.archive_mass} кг`
        }
        visible={!!id}
        onCancel={close}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label='Дата'>
            {moment(gathering?.confirmed_at || gathering?.created_at).format(
              `DD.MM.YYYY`,
            )}
          </Descriptions.Item>
          <Descriptions.Item label='Статус'>
            {getStatus(gathering)}
          </Descriptions.Item>
        </Descriptions>
        {!gathering?.archive_mass && (
          <>
            <Divider />
            <Table
              columns={[
                {
                  dataIndex: `id`,
                  title: `ID`,
                },
                {
                  dataIndex: `room`,
                  title: `Аудитория`,
                },
                {
                  dataIndex: `id`,
                  title: `Результат`,
                  render: (id, _record, index) => (
                    <Select
                      defaultValue={ResultType.successful}
                      options={options}
                      value={results[index]?.value}
                      onChange={(result) => handleSetResult(id, index, result)}
                    />
                  ),
                },
              ]}
              dataSource={gathering?.containers.map((container) => ({
                key: container.id,
                ...container,
              }))}
              pagination={false}
            />
          </>
        )}
        <Divider />
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            label='ФИО рабочего'
            name='worker_info'
            rules={[{ required: true, message: `Введите ФИО` }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
