import { Pagination, Table, TablePaginationConfig} from 'antd';
import columns from './colomns';
import React, { useEffect, useState } from 'react';
import { FilterValue } from 'antd/lib/table/interface';
import qs from 'qs';
import useSWR from 'swr';
import ShowDeleteConfirm from './ShowDeleteConfirm';
import BuildingEditModal from './Edit'
import useIsMobile from '@/screens/Buildings/hooks/isMobile'
import BuildingCard from './BuildingCard';

interface AdminBuildingPagi extends Backend.PagiWraper {
    results: Backend.AdminBuilding[];
}


interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
}



export const BuildingsTable = () => {
    console.log('in building table')
    const isMobile = useIsMobile();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 15,
        },
    });
    const [isModalVisible, setIsModalVisible] = useState(false);  // Состояние для отображения модалки
    const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(null);  // ID выбранного здания для удаления
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [dataForEdit, setDataForEdit] = useState<Backend.AdminBuilding | null>(null)

    function transformData(data: Backend.AdminBuilding[]) {
        console.log('transform', data)
        return data.map((item) => ({
            key: item.id,
            id: item.id,
            address: item.address,
            detect_building_part: item.detect_building_part ? '+' : '-',  // Преобразование в 'Да' / 'Нет'
            sticker_giver: item.sticker_giver,
            get_container_room: item.get_container_room,
            get_sticker_room: item.get_sticker_room,
            _takeout_notified: item._takeout_notified ? '+' : '-', // Преобразование в 'Да' / 'Нет'
            precollected_mass: item.precollected_mass,
            passage_scheme: item.passage_scheme,
            building_parts:item.building_parts
        }));
    }
    // Функция для подготовки параметров для запроса
    const getQueryParams = (params: TableParams) => ({
        page: params.pagination?.current,
        limit: params.pagination?.pageSize,
        ...params,
    });

    // Используем useSWR с параметрами пагинации
    const { data: buildings, error, isValidating, mutate} = useSWR<AdminBuildingPagi>(
        `/buildings/pagi?${qs.stringify(getQueryParams(tableParams))}`,
        {   
            revalidateOnFocus:true,
            focusThrottleInterval: 11000, // Перезапросить данные при фокусе
        }
    );


    // Обработчик изменений пагинации
    const handleTableChange = (
        pagination: TablePaginationConfig,
        extra: any
    ) => {
        console.log('pagi', pagination, extra)
        setTableParams({
            pagination,
        });
    };
    // Управление состоянием загрузки
    useEffect(() => {
        if (isValidating) {
            setLoading(true); // Когда данные обновляются, показываем спиннер
        } else {
            setLoading(false); // Когда данные загружены, убираем спиннер
            console.log('data updload ++', buildings)
        }
    }, [isValidating]);

    useEffect(() => {
        if (error?.response?.data?.detail === 'Invalid page.') {
            setTableParams({
                pagination: {
                    current: 1,
                    pageSize: 2,
                },
            });
        }
    }, [error]);

    useEffect(() => {
        if (!isModalVisible) {
            mutate();
        }
    }, [isModalVisible]);

    const handleDeleteBuilding = (id: number) => {
        setSelectedBuildingId(id);  // Сохраняем id здания для удаления
        setIsModalVisible(true);     // Показываем модалку
    };

    const handleCancelModal = async (callback:any) => {
        console.log(callback)
        setIsModalVisible(false);  // Закрыть модалку
        setSelectedBuildingId(null);  // Сбросить выбранный ID
    };

    const handleEdit = (callback:any) => {
        console.log(callback)
        setDataForEdit(callback)
        setIsEditModalVisible(true)
    }

    const EditModalOnClose = () => {
        mutate()
        setDataForEdit(null)
        setIsEditModalVisible(false)
    }

    return (
        <div>
            {isMobile ? (
                <div className='kek'>
                    {transformData(buildings?.results || []).map((building) => (
                        <BuildingCard
                            key={building.id}
                            building={building}
                            onDelete={handleDeleteBuilding}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            ) : (
                <Table
                    dataSource={transformData(buildings?.results || [])}
                    columns={columns(handleDeleteBuilding, handleEdit)}
                    pagination={false}
                    onChange={handleTableChange}
                    loading={loading}
                    size='small'
                />
            )}
            {/* Пагинация */}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <Pagination
                    current={tableParams.pagination?.current}
                    pageSize={tableParams.pagination?.pageSize}
                    total={buildings?.count || 0}
                    onChange={(page) =>
                        setTableParams((prev) => ({
                            ...prev,
                            pagination: { ...prev.pagination, current: page },
                        }))
                    }
                />
            </div>
            {/* Модалки */}
            {isModalVisible && selectedBuildingId !== null && (
                <ShowDeleteConfirm id={selectedBuildingId} onCancel={handleCancelModal} />
            )}
            <BuildingEditModal visible={isEditModalVisible} onClose={EditModalOnClose} data={dataForEdit} onSave={() => {}}/>
        </div>
    );

};

export default BuildingsTable;