import i18n from '@/i18n'

export enum EMenuType {
    APPLICATION = 'A', // 应用
    DIRECTORY = 'M', // 目录
    MENU = 'C', // 菜单
    BUTTON = 'F', // 按钮
}

export enum EMenuStatus {
    SHOW = '0', //显示
    HIDE = '1', //隐藏
}

export enum EWhether {
    YES = 1, // 是
    NO = 0, // 否
}

export enum EPageType { //页面类型
    ADD = 'add',
    EDIT = 'edit',
    DETAIL = 'detail',
}

export const gutter: number = 40 //栅格间隔
export const span: number = 12 //栅格占据的列数
export const labelWidth: string = '90px' //列表页顶部查询的label宽度

export const selectPlaceholder: string = i18n.global.t('common.pleaseSelect')
export const enterPlaceholder: string = i18n.global.t('common.pleaseEnter')

export enum ETrigger {
    BLUR = 'blur',
    CHANGE = 'change',
}

export enum EStatus {
    NORMAL = 0,
    DISABLE = 1,
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
    DATE = 'yyyy-MM-dd',
    DATE_TIME = 'yyyy-MM-dd hh:mm:ss', //12小时制
    DATE_TIME_SEPARATOR = 'yyyy-MM-dd HH:mm:ss', //24小时制
    HOUR_MINIUTE = 'HH:mm',
}

export enum EDatePickerType { // DateTimePicker 类型
    YEAR = 'year',
    MONTH = 'month',
    DATE = 'date',
    WEEK = 'week',
    DATE_TIME = 'datetime',
    DATE_TIME_RANGE = 'datetimerange',
    DATE_RANGE = 'daterange',
}

export enum EInputType { // el-input 类型
    TEXT = 'text',
    TEXTAREA = 'textarea',
    NUMBER = 'number',
    PASSWORD = 'password',
}

export enum EButtonType { // el-button 类型
    TEXT = 'text',
    PRIMARY = 'primary',
    DANGER = 'danger',
}

export enum ETabsType { // el-tabs 类型
    CARD = 'card',
    BORDER_CARD = 'border-card',
}

export interface IListParams {
    pageNum: number
    pageSize: number
}

export interface ILoginParams {
  account: string
  password: string
}
