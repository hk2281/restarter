import { Button, List, Typography } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'
import useSWR from 'swr'
import { UnauthorizedLayout } from '@/shared/components/UnauthorizedLayout'
import styles from '@/screens/About/About.module.scss'
import { Chart } from '@/screens/About/Chart/Chart'
import { PATH } from '@/config'

const messagesList = [
  `Корпус по адресу {address} имеет в распоряжении {count} контейнеров.`,
  `Корпус по адресу {address}  - {count} контейнеров. К корпусу на улице`,
  `К корпусу по адресу {address} подключено {count} контейнеров.`,
  `А в корпусе по адресу {address} сбор макулатуры идёт в {count} контейнерах.`,
]

const getMessage = (index: number, address: string, count: number) =>
  messagesList[index]
    ?.replace(`{address}`, address)
    .replace(`{count}`, count.toString())

export const About = () => {
  const { data: globalStats } = useSWR<Backend.Stats>(`/collected-mass`)
  const { data: stats } = useSWR<Backend.ContainerStats>(`/container-count`)
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>О проекте</title>
      </Head>
      <Typography.Title>О проекте</Typography.Title>
      <Typography.Title level={2}>
        Сервис RecycleStarter – что это?
      </Typography.Title>
      <Typography.Paragraph>
        Это экологичная альтернатива классической системе обращения с отходами,
        разработанная командой студентов Университета ИТМО.
      </Typography.Paragraph>
      <Typography.Paragraph>
        Цель проекта – помочь пользователям сервиса увидеть в бытовом и офисном
        мусоре ценное сырьё, сохраняя которое мы даем важный материал для
        последующей переработки.
      </Typography.Paragraph>
      <Typography.Paragraph>
        Раздельный сбор отходов – эффективная переработка. Только такая связка
        работает. И благодаря применению этой технологии в Университете ИТМО мы
        наглядно увидим, как можем сами влиять на экологическую ситуацию в нашем
        городе, стране и целом мире.
      </Typography.Paragraph>
      <Typography.Paragraph>
        ReCycleStarter покажет, насколько полезны наши совместные действия.
      </Typography.Paragraph>
      <Typography.Paragraph>
        В данный момент сервисом пользуются учащиеся и преподаватели четырех
        корпусов нашего университета.
      </Typography.Paragraph>
      <List bordered className={styles.desktopRow}>
        {stats?.map((buildingStats, index) => (
          <List.Item key={buildingStats.id}>
            {getMessage(index, buildingStats.building, buildingStats.count)}
          </List.Item>
        ))}
      </List>
      <Typography.Title level={3}>
        Совместными усилиями мы собрали уже {globalStats?.total_mass} тонн
        макулатуры
      </Typography.Title>
      <Chart />
      <Typography.Title level={3}>
        Почему важен раздельный сбор отходов и ReCycleStarter?
      </Typography.Title>
      <div className={styles.quoteRow}>
        <div>
          <Typography.Paragraph>
            В августе 2021 года межправительственная группа экспертов по
            изменению климата (МГЭИК) опубликовала доклад с оценками темпов,
            причинами и прогнозами последствий увеличения средней температуры
            поверхности Земли.
          </Typography.Paragraph>
          <Typography.Paragraph>
            Согласно докладу и научным работам ученых из разных уголков света
            подтверждено, что температура планеты повышается с недопустимой
            скоростью.
          </Typography.Paragraph>
          <Typography.Paragraph>
            В 2015 году целью Парижского соглашения было «удержание прироста
            глобальной средней температуры намного ниже 2 °С сверх
            доиндустриальных уровней», а 6 лет спустя эксперты считают ее
            практически недостижимой.
          </Typography.Paragraph>
        </div>
        <Typography.Paragraph>
          <List bordered className={styles.beige}>
            <List.Item>
              Аномальная жара и засуха, лесные пожары, обильные осадки
              и следующие за ними наводнения — всё это признаки изменения
              климата.
            </List.Item>
          </List>
        </Typography.Paragraph>
      </div>
      <Typography.Paragraph>
        И они происходят вместе с температурными изменениями, которые в свою
        очередь вызваны антропогенными выбросами углекислого газа (СО2) и метана
        (СН4). На этом моменте мы и подходим к влиянию неправильного
        распределения отходов на ситуацию с глобальным потеплением.
      </Typography.Paragraph>
      <List bordered className={styles.jungle}>
        <List.Item>
          Согласно докладу МГЭИК на долю мусорных свалок приходится 18% от всех
          выбросов метана, производимых человечеством.
        </List.Item>
        <List.Item>
          Больший процент имеет только животноводческое сельское хозяйство
          с выбросами метана 30% от общей массы за 2008-2017 годы периода
          наблюдения.
        </List.Item>
      </List>
      <Typography.Paragraph>
        Выбранная стратегия обращения с твёрдыми коммунальными отходами (ТКО) в
        нашей стране, к сожалению, далека от экологичных идеалов. Так, например,
        согласно докладу о деятельности Росприроднадзора в 2020 году, за 2019
        год на территории Российской Федерации было образовано 61,1 млн тонн
        ТКО, утилизировано из них только 2,7 млн тонн, а на полигоны для
        захоронения отходов отправлено 43,9 млн тонн.
      </Typography.Paragraph>
      <Typography.Paragraph>
        А изучив государственный доклад 2019 года от министерства природы и
        экологии Российской Федерации, мы сделали два основных вывода:
      </Typography.Paragraph>
      <List bordered className={styles.desktopRow}>
        <List.Item>
          70% образованных отходов отправляются на полигоны для захоронения,
          общая площадь которых в России по самым поверхностным оценкам
          составляет 40 тысяч км<sup>2</sup>*.
          <Typography.Text className={styles.note} type='secondary'>
            Для сравнения площадь Ленинградской области 84,5 тысяч км
            <sup>2</sup>.
          </Typography.Text>
        </List.Item>
        <List.Item>
          Текущая мощность объектов утилизации (она же переработка) загружена
          только лишь на 20%.
        </List.Item>
      </List>
      <Typography.Paragraph>
        Тут мы уже сталкиваемся с проблемой нехватки сырья для переработки, ведь
        из пластика, бумаги, пищевых отходов и битого стекла, собранных и
        транспортируемых в одной таре, получится извлечь только около 5%
        вторичного сырья.
      </Typography.Paragraph>
      <Typography.Title level={3}>
        Какое решение видим мы для улучшения экологической ситуации в стране?
      </Typography.Title>
      <div className={styles.quoteRowReverse}>
        <List bordered className={styles.beige}>
          <List.Item>Разделение мусора на фракции</List.Item>
          <List.Item>Помощь планете с сервисом RecycleStarter</List.Item>
        </List>
        <Typography.Paragraph>
          Сейчас с помощью сервиса осуществляется сбор только одной фракции
          отходов, но после успешного запуска и получения ценного опыта общения
          с пользователями и партнёрами, мы расширим список собираемых фракций.
        </Typography.Paragraph>
      </div>
      <List bordered className={styles.green}>
        <List.Item>
          Раздельный сбор и переработка макулатуры — это наш вклад в сохранение
          биологического разнообразия и зелёного покрова нашей планеты.
        </List.Item>
      </List>
      <Link passHref href={PATH.HOME}>
        <Button block className={styles.button} size='large' type='primary'>
          На главную
        </Button>
      </Link>
    </div>
  )
}

About.layout = ({ children }: { children: ReactNode }) => (
  <UnauthorizedLayout ghost>{children}</UnauthorizedLayout>
)
