import i18n from '@/i18n'

export enum EMenuType {
  APPLICATION = 'A', // 应用
  DIRECTORY = 'M', // 目录
  MENU = 'C', // 菜单
  BUTTON = 'F', // 按钮
}

export enum EPageType { //页面类型
  ADD = 'add',
  EDIT = 'edit',
  DETAIL = 'detail',
  LIST = 'list',
}

export const CPlaceholderSelect: string = i18n.global.t('common.pleaseSelect')
export const CPlaceholderEnter: string = i18n.global.t('common.pleaseEnter')

export enum ETrigger {
  BLUR = 'blur',
  CHANGE = 'change',
  HOVER = 'hover'
}

export enum EFileType {
  HTML = 'html',
  DOCX = 'docx',
  PDF = 'pdf',
}

export enum ESex {
  MALE = 0, //男
  FEMALE = 1, //女
}

export const sexOptions = [
  {
    label: i18n.global.t('common.male'),
    value: ESex.MALE,
  },
  {
    label: i18n.global.t('common.female'),
    value: ESex.FEMALE,
  },
]

export enum EDateFormat { // 日期组件的 format
  DATE = 'YYYY-MM-DD',
  DATE_TIME = 'YYYY-MM-DD hh:mm:ss', //12小时制
  DATE_TIME_SEPARATOR = 'YYYY-MM-DD HH:mm:ss', //24小时制
  HOUR_MINIUTE = 'HH:mm',
}

export interface IListParams {  // 列表分页字段类型
  pageNum: number
  pageSize: number
}

export interface ILoginParams {  // 登陆表单字段类型
  account: string
  password: string
}
