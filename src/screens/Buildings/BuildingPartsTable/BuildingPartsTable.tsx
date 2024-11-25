import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm, message } from 'antd';
import { api } from '@/api';
import { CloseCircleOutlined, EnterOutlined, PlusCircleOutlined } from '@ant-design/icons';
import style from "./style.module.css"
interface BuildingPart {
  id: number;
  num: number;
}

interface BuildingPartsTableProps {
  data: BuildingPart[];
  buildingId: number; // ID здания, передаваемый из родительского компонента
  onUpdate: () => void; // Функция для обновления данных после успешного редактирования или удаления
}

const BuildingPartsTable: React.FC<BuildingPartsTableProps> = ({ data, buildingId, onUpdate }) => {
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newNum, setNewNum] = useState<string>('');
  const [localData, setLocalData] = useState<BuildingPart[]>(data);

  const isEditing = (record: BuildingPart) => record.id === editingKey;

  const edit = (record: BuildingPart) => {
    setEditingKey(record.id);
    setEditValue(record.num);
  };

  const cancel = () => {
    setEditingKey(null);
    setEditValue(null);
  };

  const save = async (id: number) => {
    try {
      await api.patch(`/building-parts/${id}`, { num: editValue });
      onUpdate();
      setEditingKey(null);
      setEditValue(null);
      message.success("Изменения сохранены");
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
      message.error("Не удалось сохранить изменения");
    }
  };

  const deleteRecord = async (id: number) => {
    try {
      await api.delete(`/building-parts/${id}/delete`);
      setLocalData((prevData) => prevData.filter((part) => part.id !== id));
      message.success("Корпус успешно удален");
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      message.error("Не удалось удалить корпус");
    }
  };

  const createBuildingPart = async () => {
    if(!newNum){
        message.warning('поле номер не должно быть пустым')
        return
    }
    try {
      const response = await api.post("/building-parts/create", {
        num: newNum,
        building: buildingId
      });
      const createdBuildingPart = response.data; // Получаем данные о созданном корпусе

      setLocalData((prevData) => [...prevData, createdBuildingPart]); // Добавляем новый корпус в таблицу
      setIsCreating(false);
      setNewNum('');
      message.success("Корпус успешно создан");
    } catch (error) {
      console.error("Ошибка при создании корпуса:", error);
      message.error("Не удалось создать корпус");
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Номер',
      dataIndex: 'num',
      key: 'num',
      render: (text: number, record: BuildingPart) => {
        return isEditing(record) ? (
          <Input
            value={editValue ?? ''}
            onChange={(e) => setEditValue(Number(e.target.value))}
          />
        ) : (
          text
        );
      },
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: BuildingPart) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button onClick={() => save(record.id)} type="link">
              Сохранить
            </Button>
            <Button onClick={cancel} type="link">
              Отмена
            </Button>
          </span>
        ) : (
          <span>
            <Button onClick={() => edit(record)} type="link">
              редактирование
            </Button>
            <Popconfirm
             title="Вы уверены?"
             onConfirm={() => deleteRecord(record.id)}
             cancelText='Отмена'
             okText="да">
              <Button type="link" danger>
                удалить
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <div>
      {/* Кнопка "Создать корпус" и поле ввода для создания нового элемента */}
      {!isCreating ? (
        <Button type="primary" onClick={() => setIsCreating(true)} className={style.BuildingPartAddBtn}>
          <PlusCircleOutlined></PlusCircleOutlined>Создать корпус
        </Button>
      ) : (
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="Введите номер корпуса"
            value={newNum}
            onChange={(e) => setNewNum(e.target.value)}
            style={{ width: 200, marginRight: 8 }}
          />
          <Button type="primary" onClick={createBuildingPart}>
            Сохранить
          </Button>
          <Button onClick={() => setIsCreating(false)} style={{ marginLeft: 8 }}>
            <EnterOutlined />
          </Button>
        </div>
      )}

      {/* Таблица */}
      <Table dataSource={localData} columns={columns} rowKey="id" pagination={{ defaultPageSize: 5 }} />
    </div>
  );
};

export default BuildingPartsTable;
