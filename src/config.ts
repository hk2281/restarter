export const PATH = {
  HOME: `/`,
  ADD_CONTAINER: `/add-container`,
  ADD_CONTAINER_SUCCESS: `/add-container/success`,
  FILL: `/fill`,
  FILL_CONTAINER: `/fill/[container]`,
  FILL_CONTAINER_SUCCESS: `/fill/[container]/success`,
  LOGIN: `/login`,
  SIGNUP: `/signup`,
  SIGNUP_SUCCESS: `/signup/success`,
  RULES: `/rules`,
  ABOUT: `/about`,
  CONTAINERS: `/containers`,
  EVENTS: `/events`,
  SETTINGS: `/settings`,
  TOKENS: `/tokens`,
  STATS: `/stats`,
  RESET: `/reset`,
  RESULT: `/result`,
}

export const containerStatuses = [
  {
    value: 1,
    label: `Ожидает подключения`,
  },
  {
    value: 2,
    label: `Активен`,
  },
  {
    value: 3,
    label: `Неактивен`,
  },
]

export const containerTypes = [
  {
    value: 1,
    label: `Экобокс`,
  },
  {
    value: 2,
    label: `Общественный`,
  },
  {
    value: 3,
    label: `Офисная урна`,
    requiresAuth: true,
  },
]

// export enum takeoutConditionTypes {
//   maxDaysOffice = 1,
//   maxDaysPublicPlace,
//   maxPaperWeight,
//   minMessagesAboutFullness,
// }
//
// export const takeoutConditions = {
//   1: `не больше N дней в офисе`,
//   2: `не больше N дней в общественном месте`,
//   3: `суммарная масса бумаги в корпусе не больше N кг`,
//   4: `игнорировать первые N сообщенийо заполненности контейнера в общественном месте`,
// }
