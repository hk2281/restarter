import { List, Typography } from 'antd'
import Head from 'next/head'
import { ReactNode } from 'react'
import { UnauthorizedLayout } from '@/shared/components/UnauthorizedLayout'
import styles from '@/screens/Rules/Rules.module.scss'

export const Rules = () => {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Правила сбора</title>
      </Head>
      <Typography.Title>Правила сбора</Typography.Title>
      <Typography.Paragraph>
        Убедитесь, что бумага сервиса RecycleStarter не содержит персональных
        данных или других материалов, требующих особой процедуры утилизации.
        Такую бумагу тоже можно направить в переработку, но для этого просим
        связаться с отделом охраны труда и экологической безопасности ИТМО.
      </Typography.Paragraph>
      <div className={styles.lists}>
        <Typography.Title level={5}>
          <Typography.Text type='danger'>Нельзя</Typography.Text> складывать в
          контейнер:
        </Typography.Title>
        <List bordered className={styles.desktopRow}>
          <List.Item>
            Тетрапак и аналоги (многослойная упаковка из бумаги, алюминия и
            нескольких слоёв пластика)
          </List.Item>
          <List.Item>Грязная (жирная) бумага и картон</List.Item>
          <List.Item>Термобумага (чеки, бумага для факсов и т.п.)</List.Item>
          <List.Item>
            Ламинированная бумага (при разрыве остаётся пластиковая плёнка)
          </List.Item>
          <List.Item>
            Влагостойкая бумага (одноразовая посуда, «бумажные» стаканчики)
          </List.Item>
          <List.Item>Бумажные салфетки и полотенца</List.Item>
          <List.Item>Обои, фотобумага, калька.</List.Item>
        </List>
        <Typography.Title level={5}>
          <Typography.Text type='success'>Обязательны</Typography.Text> к
          переработке:
        </Typography.Title>
        <List bordered className={styles.desktopRow}>
          <List.Item>Офисная бумага, тетради</List.Item>
          <List.Item>Чистая бумажная упаковка и картон</List.Item>
          <List.Item>Глянцевые журналы, газеты</List.Item>
        </List>
      </div>
      <Typography.Paragraph>
        Просим вас убирать из бумаги скрепки, пластиковые стикеры и файлики. Всё
        сырьё перед переработкой пройдёт сортировку и досмотр. Но устранение
        инородных фракций на производстве происходит с большими потерями ценного
        сырья.
      </Typography.Paragraph>
    </div>
  )
}

Rules.layout = ({ children }: { children: ReactNode }) => (
  <UnauthorizedLayout ghost>{children}</UnauthorizedLayout>
)
