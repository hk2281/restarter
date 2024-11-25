import { authorizedLayoutRenderer } from '@/shared/components/AuthorizedLayout';
import React, { useState } from 'react';
import { BankOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Tabs, message } from 'antd';
import { BuildingsTable } from './BuildingsTable/BuildigsTable'
import AddBuildingModal from './BuildingsTable/AddBuilding';
import style from './BuildingsTable/style.module.css'



export const Buildings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleSave = async (newBuildingData: Backend.AdminBuilding) => {
    try {
        // const response = await api.post('/buildings/', newBuildingData);
        message.success('Здание успешно добавлено');
        setIsModalVisible(false); // Закрыть модалку после сохранения
    } catch (error) {
        message.error('Ошибка при добавлении здания');
    }
  };
  return (
    <>
      <Tabs defaultActiveKey="1" centered={true} className={style.lol} tabBarExtraContent={
        <Button type='primary' onClick={showModal}><PlusCircleOutlined />Добавть</Button>
      }>
        <Tabs.TabPane
          tab={
            <span>
              <BankOutlined />
              {"Здания"}
            </span>
          }
          key="1"
        >
          <BuildingsTable/>
        </Tabs.TabPane>
      </Tabs>
      <AddBuildingModal
          visible={isModalVisible}
          onClose={handleCancel}
          data={null} // Для нового здания передаем null
          onSave={handleSave} // Обработчик сохранения нового здания
      ></AddBuildingModal>
    </>
);
};

export default Buildings;
Buildings.layout = authorizedLayoutRenderer()