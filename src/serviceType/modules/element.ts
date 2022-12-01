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

export interface ITableColumnParams {  // el-icon 列字段类型
  label: string
  prop: string
  width: string
}

export const CGridGutter: number = 40 // 栅格间隔
export const CGridSpan: number = 12 // 栅格占据的列数
