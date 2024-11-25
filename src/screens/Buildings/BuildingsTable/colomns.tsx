import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Divider } from "antd";
import styles from './style.module.css'
import { ColumnsType } from "antd/lib/table";
import { style } from "@dicebear/avatars/dist/utils";

const columns = (
    handleDeleteBuilding: (id: number) => void,
    handleEdit: (record: Backend.AdminBuilding) => void
): ColumnsType<Backend.AdminBuilding> => {
  return [
      {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
          width: 60
      },
      {
          title: 'Адрес',
          dataIndex: 'address',
          key: 'address',
          ellipsis: {
              showTitle: true,
          }
      },
      {
          title: 'Идентификация корпуса',
          dataIndex: 'detect_building_part',
          key: 'detect_building_part',
      },
      {
          title: 'Главный по стикерам',
          dataIndex: 'sticker_giver',
          key: 'sticker_giver',
      },
      {
          title: 'Выдача контейнера',
          dataIndex: 'get_container_room',
          key: 'get_container_room',
      },
      {
          title: 'Выдача стикера',
          dataIndex: 'get_sticker_room',
          key: 'get_sticker_room',
      },
      {
          title: 'Оповещение сбора',
          dataIndex: '_takeout_notified',
          key: '_takeout_notified',
      },
      {
          title: 'Предстартовая масса',
          dataIndex: 'precollected_mass',
          key: 'precollected_mass',
      },
      {
        title: 'Схема проезда',
        dataIndex: 'passage_scheme',
        key: 'passage_scheme',

    },

      {
          title: <MoreOutlined className={styles.BuildingActionTitle}/>,
          key: 'operation',
          fixed: 'right',
          render: (text: any, record: Backend.AdminBuilding) => (
              <div className={styles.ActionBtnPos}>
                  <Button
                      danger
                      icon={<DeleteOutlined />}
                      size='small'
                      shape='circle'
                      onClick={() => handleDeleteBuilding(record.id)} // Вызов функции удаления с передачей ID
                  />
                  <Divider type="vertical" className={styles.BtnDivider}/>
                  <Button
                      icon={<EditOutlined />}
                      size='small'
                      shape='circle'
                      onClick={()=>handleEdit(record)}
                  />
              </div>
          ),
      },
  ];
};

export default columns