import React from 'react';
import { Card, Button, Divider } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface BuildingCardProps {
    building: Backend.AdminBuilding;
    onDelete: (id: number) => void;
    onEdit: (building: Backend.AdminBuilding) => void;
}

const BuildingCard: React.FC<BuildingCardProps> = ({ building, onDelete, onEdit }) => (
    <Card title={`Здание №${building.id}`} style={{ marginBottom: 16 }}>
        <p><strong>Адрес:</strong> {building.address}</p>
        <p><strong>Идентификация корпуса:</strong> {building.detect_building_part ? '+' : '-'}</p>
        <p><strong>Главный по стикерам:</strong> {building.sticker_giver}</p>
        <p><strong>Выдача контейнера:</strong> {building.get_container_room}</p>
        <p><strong>Выдача стикера:</strong> {building.get_sticker_room}</p>
        <p><strong>Оповещение сбора:</strong> {building._takeout_notified ? '+' : '-'}</p>
        <p><strong>Предстартовая масса:</strong> {building.precollected_mass}</p>
        <p><strong>Схема проезда:</strong> {building.passage_scheme}</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
                danger
                icon={<DeleteOutlined />}
                size="small"
                shape="circle"
                onClick={() => onDelete(building.id)}
            />
            <Divider type="vertical" />
            <Button
                icon={<EditOutlined />}
                size="small"
                shape="circle"
                onClick={() => onEdit(building)}
            />
        </div>
    </Card>
);

export default BuildingCard