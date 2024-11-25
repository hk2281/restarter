import { Modal, Form, Input, InputNumber, Checkbox, Button, Transfer, Divider, Upload, Row, Col, Image, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { api } from '@/api'
import { AxiosResponse } from "axios";
import { CarOutlined, DeleteOutlined, HomeOutlined, IdcardOutlined, MenuUnfoldOutlined, UploadOutlined } from "@ant-design/icons";
import style from "./style.module.css";
import BuildingPartsTable from "../BuildingPartsTable/BuildingPartsTable";

interface RecordType {
    key: string;
    title: string;
    description: string;
}


interface BuildingModalProps {
    visible: boolean;
    onClose: () => void;
    data: Backend.AdminBuilding | null;
    onSave: (updatedData: Backend.AdminBuilding) => void;
}

const nullData: Backend.AdminBuilding = {
    detect_building_part :false,
    precollected_mass:0,
    _takeout_notified:false,
    sticker_giver: '',
    get_container_room: '',
    get_sticker_room:'',
    passage_scheme:'',
    address:'',
    id:null
}

const AddBuildingModal: React.FC<BuildingModalProps> = ({ visible, onClose, data, onSave }) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string|undefined>();
    const [mockData, setMockData] = useState<RecordType[]>([]);
    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [transferLoading, setTransferLoading] = useState<boolean>(true)
    const [file, setFile] = useState(null);
    const [recordNotExist, setRecordNotExist] = useState<number|undefined>()

    useEffect(() => {
        const fetchdata = async () => {
            // const userRsp: AxiosResponse = await api.get(`/buildings/${data.id}/users/`);
            try {


                // Получаем всех пользователей для source
                const sourceResponse = await api.get('/auth/all-users');
                const sourceData = sourceResponse.data;


                // Добавляем данные в mockData
                setMockData([
                    ...sourceData.map((user: any) => ({
                        key: user.id.toString(),
                        title: user.email, // Можешь изменить это на любое другое поле, которое хочешь показывать
                    })),
  
                ]);

                
            } catch (error) {
                message.error('Ошибка при загрузке данных о комендантах');
                
            }
            setTransferLoading(false)
        };
        if (visible) {
            fetchdata();
        }
    }, [visible]);

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data);
            setImageUrl(`http://localhost:8000/media/${data?.passage_scheme}`)
        } else {
            setImageUrl(``)
            form.setFieldsValue(nullData);
        }
    }, [data, form]);

    
    const handleClosed = () => {
        setFile(null)
        setImageUrl(undefined)
        setTransferLoading(true)
        setTargetKeys([])
        setSelectedKeys([])
        setMockData([])
        setRecordNotExist(undefined)
        onClose()
    }

    const deepEqual = (obj1: any, obj2: any) => {
        // Быстрая проверка на одинаковую ссылку
        if (obj1 === obj2) return true;
    
        // Проверка на примитивы или null
        if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) {
            return false;
        }
    
        // Получаем ключи первого объекта
        const keys1 = Object.keys(obj1);
    
        // Для каждого ключа из obj1 проверяем, существует ли такой же в obj2 и совпадают ли значения
        for (const key of keys1) {
            // Если во втором объекте нет такого ключа или значения не совпадают, возвращаем false
            if (!(key in obj2) || !deepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }
    
        return true;
    };
    const transformToAdminBuilding = (obj: any): any => {
        return {
            address: obj.address,
            detect_building_part: obj.detect_building_part === '+' ? true : false,
            sticker_giver: obj.sticker_giver,
            get_container_room: obj.get_container_room,
            get_sticker_room: obj.get_sticker_room,
            _takeout_notified: obj._takeout_notified === '+' ? true : false,
            precollected_mass: obj.precollected_mass,
        };
    };

    const handleFinish = async(values: Backend.AdminBuilding) => {
        console.log(values,"heh")
        var buildingId: number = null
        if(deepEqual(
            values,nullData
        )){
            message.warning('не ввели данные')
            return
        }

        //отправить значения формы и получить id записи
        try {
            const formData = new FormData();
            formData.append('passage_scheme', ''); 
            for (const key in values) {
                if (values.hasOwnProperty(key)) {  // Проверка, что ключ действительно существует в объекте
                    formData.append(key, values[key]);
                }
            }
            const headers = {
                'Content-Type': 'multipart/form-data', // указываем, что это форма с файлами
              };
            const newBuildingResp:AxiosResponse<Backend.AdminBuilding> = await api.post('/buildings/create',formData,{headers})
            if (newBuildingResp.status == 201){
                buildingId=newBuildingResp.data.id
                setRecordNotExist(buildingId)
                console.log('resp', newBuildingResp, buildingId)
                
            }else{
                throw(new Error(`не удалось создать новое здание из-за: ${newBuildingResp.data}`))
            }
        } catch (error) {
            console.log('resp, eroo', error)
            message.error(error)
            return
        }
        //отправка чуваков 
        if(buildingId){
            try {
                const resp = await api.patch(`/buildings/asign-user-to-buildings/${buildingId}`,{
                    user_ids: targetKeys.map((key)=>{return Number(key)})
                })
                message.success(`успешно обновили комендантов`)
            } catch (error) {
                message.error('Ошибка при обновлении комендантов');
            }
            if (!file) {
                message.error('Пожалуйста, выберите изображение!');
                return
            }
            try {
                  const formData = new FormData();
                  formData.append('passage_scheme', file);
            
                    const response = await api.patch(`/buildings/${buildingId}`, formData, {
                      headers: {
                        'Content-Type': 'multipart/form-data', // Важно для отправки файла
                      },
                    });
                    message.success('Изображение успешно загружено');
                    console.log(response.data); // Вы можете обработать ответ сервера здесь
                  
            } catch (error) {
                message.error('Ошибка при загрузке изображения');
                console.error(error); 
            }
        }




        onSave(values);
        handleClosed()
    };

    // Обработчик изменения ключей в target (когда пользователи перемещаются между колонками)
    const handleTransferChange = (nextTargetKeys: string[]) => {
        setTargetKeys(nextTargetKeys);
    };

    // Обработчик изменения выбранных ключей
    const handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const handleRefreshSource = async () => {
        console.log('save comendatnas', targetKeys)
        try{
            const resp = await api.patch(`/buildings/asign-user-to-buildings/${data?.id}`,{
                user_ids: targetKeys.map((key)=>{return Number(key)})
            })
            message.success(`успешно обновили комендантов`)
        }catch (error){
            message.error('Ошибка при обновлении комендантов');
        }
    }
    const handleDeleteImage = async () => {
        try {
            const formData = new FormData();
            formData.append('passage_scheme', ''); // Пустое значение, чтобы удалить изображение

            const headers = {
                'Content-Type': 'multipart/form-data', // указываем, что это форма с файлами
              };
            const resp =await api.patch(
                `/buildings/${data?.id}`, 
                formData,
                {headers}
            );
          console.log(resp.data)
          setImageUrl(``)
          message.success('Изображение успешно удалено');

        } catch (error) {
          message.error('Ошибка при удалении изображения');
        }
      };
        // Хэндлер для обработки выбора изображения
    const handleFileChange = (info:any) => {
        if (info.file.status === 'done') {
        // Если изображение выбрано успешно
        const url = URL.createObjectURL(info.file.originFileObj); // создаем URL для отображения
        setImageUrl(url); // сохраняем URL в состояние
        setFile(info.file.originFileObj);
        }
    };

    // Хэндлер для отправки изображения на сервер
  const handleSubmit = async () => {
    if (!file) {
      message.error('Пожалуйста, выберите изображение!');
      return;
    }

    const formData = new FormData();
    formData.append('passage_scheme', file);

    try {
      const response = await api.patch(`http://localhost:8000/api/buildings/${data?.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Важно для отправки файла
        },
      });
      message.success('Изображение успешно загружено');
      console.log(response.data); // Вы можете обработать ответ сервера здесь
    } catch (error) {
      message.error('Ошибка при загрузке изображения');
      console.error(error);
    }
  };
    return (
        <Modal
            visible={visible}
            title="Редактировать данные здания"
            onCancel={handleClosed}
            footer={[
                <Button key="cancel" onClick={handleClosed}>Cancel</Button>,
                <Button key="submit" type="primary" onClick={() => form.submit()}>Save</Button>,
            ]}
            width={1500}
        >
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Divider orientation='left'>
                        <IdcardOutlined /> Информация о здании
                    </Divider>
                        <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={data}>
                            <Form.Item label="Адрес" name="address" rules={[{ required: true, message: "Введите адрес" }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Определять номер корпуса по аудитории" name="detect_building_part" valuePropName="checked">
                                <Checkbox />
                            </Form.Item>
                            <Form.Item label="Ответственный за стикеры" name="sticker_giver">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Комната для получения контейнера" name="get_container_room">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Комната для получения стикера" name="get_sticker_room">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Оповещение о сборе" name="_takeout_notified" valuePropName="checked">
                                <Checkbox />
                            </Form.Item>
                            <Form.Item label="Собранная масса до старта сервиса (кг)" name="precollected_mass">
                                <InputNumber min={0} style={{ width: "100%" }} />
                            </Form.Item>
                        </Form>
                        <Divider orientation='left'>
                         <HomeOutlined /> Корпусы
                        </Divider>
                        <BuildingPartsTable data={data?.building_parts || []} buildingId={recordNotExist} onUpdate={()=>{}}></BuildingPartsTable>

                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Row gutter={[16,16]}>
                        <Col span={24}>
                            <Divider orientation='left'>
                                <IdcardOutlined /> Коменданты
                            </Divider>
                        </Col>
                        <Col span={24}>
                            <div className={style.TransferWraper}>
                                <Spin spinning={transferLoading}>
                                <Transfer
                                    className={style.TransferModilePos}
                                    dataSource={mockData}
                                    titles={['Источник', 'Цель']}
                                    targetKeys={targetKeys}
                                    selectedKeys={selectedKeys}
                                    render={item => item.title}
                                    showSearch
                                    listStyle={{
                                        whiteSpace: 'nowrap',  // Запрещает перенос текста
                                        overflow: 'hidden',    // Скрывает текст, выходящий за пределы
                                        textOverflow: 'ellipsis',  // Добавляет многоточие, если текст не помещается
                                      }}
                                    pagination={{ pageSize: 4 }}
                                    onChange={handleTransferChange}  // обновление targetKeys при перемещении
                                    onSelectChange={handleSelectChange}  // обновление selectedKeys при выборе
                                    footer={(props) => {
                                        if (props.direction === 'right') {
                                            return (
                                                <div className={style.CommendantSaveBtn}>
                                                <Button onClick={handleRefreshSource} type="primary" disabled={!isFinite(recordNotExist)} >
                                                    Обновить
                                                </Button>
                                                </div>

                                            );
                                        }
                                        return null;
                                    }}
                                />
                                </Spin>
                            </div>
                        </Col>
                        <Col span={24}>
                            <Divider orientation='left'>
                                <CarOutlined /> Схема проезда
                            </Divider>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12} className={style.SchemeImg}>
                            <Image
                                width="100%"
                                src={imageUrl || ''}
                                fallback="data:image/png;base64,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" 
                                alt="Схема проезда"
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Upload showUploadList={false} accept="image/*" onChange={handleFileChange}>
                                    <Button icon={<UploadOutlined />} style={{ marginBottom: 16 }}>
                                        Выбрать новое изображение
                                    </Button>
                                </Upload>
                                <Button icon={<DeleteOutlined />} danger style={{ width: "100%", marginBottom: 8 }} onClick={handleDeleteImage} disabled={!isFinite(recordNotExist)}>
                                    Удалить изображение
                                </Button>
                                <Button type="primary" style={{ width: "100%" }} onClick={handleSubmit} disabled={!isFinite(recordNotExist)}>
                                    Отправить
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Modal>
    );
};

export default AddBuildingModal;
