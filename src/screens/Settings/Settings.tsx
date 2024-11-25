import { Divider, Typography } from 'antd'
import { BellOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import useSWR from 'swr'
import { authorizedLayoutRenderer } from '@/shared/components/AuthorizedLayout'
import { Password } from '@/screens/Settings/Password/Password'
import { Profile } from '@/screens/Settings/Profile/Profile'
import { Notifications } from '@/screens/Settings/Notifications/Notifications'
import {Modal, Button} from 'antd'
import { useEffect, useState } from 'react'
import { message,notification  } from 'antd';
import {api} from "@/api"


interface EditorComp {
  export_row_html_template: () => any;
  export_mjml_template: () => any;
  init: () => void;
  current_template: any;
}
declare global {
  interface Window {
    grapesjs: any; 
  }
}


export const Settings = () => {
  const { data: user } = useSWR<Backend.Me>(`/auth/users/me/`)
  const { data: globalStats } = useSWR<Backend.Templates>(`/email-templates`)
  const [isModalVisible, setIsModalVisible] = useState(false);
  let editor_comp: EditorComp | null = null;// Явное указание типа

  const showModal = () => {
    console.log(globalStats)
    setIsModalVisible(true);
  };

  const handleOk = async() => {
    try{

      if (!editor_comp) {
        throw new Error('не был получен объект редактора')
      }
      const html_template = editor_comp.export_row_html_template(); // Вызов метода export_template
      const mjml_template = editor_comp.export_mjml_template()
      if (!html_template || !mjml_template){
        throw new Error('экспортируемый шаблон является пустым')
      }

      await api.post('/email-templates', {
        html_template: html_template,
        mjml_template: mjml_template,
        media: editor_comp.current_template.media
      })
      setIsModalVisible(false);
    }catch(error:any){
      message.warning(`Ошибка: ${error.message}`);
    }
    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isModalVisible) {
      // Инициализация raw JS кода после того, как модалка открыта
      const loadCSS = (href: any) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
      };
      const loadScript = (src: string, onLoadCallback: any) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = onLoadCallback;
        document.body.appendChild(script);
      };
      loadCSS('/css/grapes.min.css')
      
      // Загружаем первый скрипт
      loadScript('/js/grapes.min.js', async() => {
        console.log('anotherLib.js загружен');
        // Можно инициализировать другую библиотеку, если требуется

        const mymodule = await import('./Editor/q')
        const grapesjs: any = window.grapesjs || {};

        editor_comp = mymodule.my_comp(grapesjs, [], globalStats as any )
        try{
          editor_comp.init();
          (window as any ).editor_comp = editor_comp;
        }catch(error:any){
          notification.error({
            message: 'Ошибка',
            description: `Произошла ошибка: ${error.message}`,
          })
          setIsModalVisible(false);
        }    
      });
    }
  }, [isModalVisible]);
  return (
    <>
      <Typography.Title level={2}>Настройки</Typography.Title>
      <Divider orientation='left'>
        <UserOutlined /> Смена почты
      </Divider>
      <Profile user={user} />
      <Divider orientation='left'>
        <LockOutlined /> Смена пароля
      </Divider>
      <Password />
      <Divider orientation='left'>
        <BellOutlined /> Настройка уведомлений
      </Divider>
      <Notifications />
      
      {(user?.is_super_user &&
        <div>
          <Divider orientation='left'>
            <MailOutlined /> Редактирование шаблонов
          </Divider>
          <Button  type="primary" onClick={showModal}>
            Открыть редактор
          </Button>
          <Modal
            title="Модальное окно с raw JS"
            visible={isModalVisible}
            onOk={handleOk}
            okText="Сохранить"
            cancelText="Отменить"
            onCancel={handleCancel}
            width={1800}
          >
            <div id="gjs">
            </div>
          </Modal>
        </div>
      )}
    </>
  )
}

Settings.layout = authorizedLayoutRenderer()
