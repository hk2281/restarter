import { Modal, Form, Input, message } from 'antd';
import { api } from '@/api';
import { useState } from 'react';

type ShowDeleteConfirmProps = {
  id: number;
  onCancel: (callback:any) => void;
};

const ShowDeleteConfirm: React.FC<ShowDeleteConfirmProps> = ({ id, onCancel }) => {
  const [password, setPassword] = useState<string>('');
  const handleDelete = async (id: number, password: string) => {
    try {
      await api.post(`/buildings/delete/${id}`, { password });
      message.success({ content: 'Здание удалено успешно', duration: 5 });
    } catch (error) {
      message.error({ content: `Не удалось удалить здание: ${error}`, duration: 5 });
    }
  };

  return (
    <Modal
      title={`Вы уверены, что хотите удалить здание c id: ${id}?`}
      visible={true}
      okText="Да"
      okType="danger"
      cancelText="Нет"
      onOk={async () => {
        await handleDelete(id, password);
        onCancel('hi'); // Закрыть модалку после удаления
      }}
      onCancel={onCancel} // Закрыть модалку, не удаляя
    >
      <Form>
        <p>Это действие необратимо</p>
        <Form.Item
          name="username"
          style={{ display: 'none' }}
        >
          <Input
            type="text"
            value="" // поле скрыто, его можно оставить пустым
            readOnly
            aria-hidden="true"
            autoComplete='username'
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Поле должно содержать пароль!' }]}
        >
          <Input.Password
            placeholder="Введите ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Обновление состояния пароля
            autoFocus
            autoComplete="new-password"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ShowDeleteConfirm;