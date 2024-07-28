import { IOptionType } from "@/types"
import i18n from "@/i18n";

export enum EMenuType {
  APPLICATION = "A", // 应用
  DIRECTORY = "M", // 目录
  MENU = "C", // 菜单
  BUTTON = "F", // 按钮
}

export enum EPageType { //页面类型
  ADD = "add",
  EDIT = "edit",
  DETAIL = "detail",
  LIST = "list",
}

export const CPlaceholderSelect: string = i18n.global.t("common.pleaseSelect");
export const CPlaceholderEnter: string = i18n.global.t("common.pleaseEnter");

export enum ETrigger {
  BLUR = "blur",
  CHANGE = "change",
  HOVER = "hover",
}

export enum EFileType {
  HTML = "html",
  DOCX = "docx",
  PDF = "pdf",
}

export enum EFormComponentType {
  INPUT = 1,
  INPUT_NUMBER = 2,
  SELECT = 3,
  CASCADER = 4,
  RADIO = 5,
  DATE_PICKER = 6,
  CHECKBOX = 7,
  SWITCH = 8,
  UPLOAD = 9,
}

export enum ESex {
  MALE = 0, //男
  FEMALE = 1, //女
}

export const sexOptions = [
  {
    label: i18n.global.t("common.male"),
    value: ESex.MALE,
  },
  {
    label: i18n.global.t("common.female"),
    value: ESex.FEMALE,
  },
];

export enum EDateFormat { // 日期组件的 format
  DATE = "YYYY-MM-DD",
  DATE_TIME = "YYYY-MM-DD hh:mm:ss", //12小时制
  DATE_TIME_SEPARATOR = "YYYY-MM-DD HH:mm:ss", //24小时制
  HOUR_MINIUTE = "HH:mm",
}

// WForm 组件配置项
export interface IFormConfigParams {
  // el-form 查询条件类型参数
  label: string; // 标签文本
  type: number; // 控件类型
  key: string; // 绑定值
  value: string | number; // 默认值
  events?: object; // 绑定事件
  options?: Array<IOptionType>; // 选项
  subtype?: string; // 控件子类型
  format?: string; // 格式
  files?: Array<object>; // 格式
}

// 菜单项
export interface IMenuItem {
  icon: string;
  name: string;
  path: string;
  children: Array<IMenuItem>;
}

// 菜单项
export interface IPageParams {
  pageSize: number;
  currentPage: number
}
