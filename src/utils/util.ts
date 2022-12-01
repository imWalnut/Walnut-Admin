// handleRtfToTxt 富文本转纯文本
// handleMulAccuracy 带浮点乘法精度计算
// handleValidDecimal 数值保留有效小数
// handleMinAndMax 获取最小最大值
// handleSpecialCharacter 去除特殊字符
// handleArrayToSingle 树型数据结构数组变成单层级数组
// handleDeepClone 深拷贝
// handleFormatDate 日期格式化
// handleImageUrl 获取本地图片地址
// handleEncodeJumpUrl 对路径中的特殊字符进行编码
// handleWeek 获取星期几
// handleCountdown 日期倒计时
// handleIsIncludeEmoji 检测是否包含表情包
// handleDebounce 防抖
// handleThrottle 节流
// handlePhoneReg 手机号码验证
// handleTelReg 固话和手机号码验证
// handlePasswordReg 密码强校验
// handleIdentityReg 身份证校验
// handleTrimAllSpace 清除字符串所有空格
// handleTrimBothSpace 清除字符串左右两边的空格

import dayjs from "dayjs";
import {ERoutePath, ESex} from "@/serviceType";
const modulesFirst = import.meta.glob('@/views/*/*.tsx')
const modulesSecond = import.meta.glob('@/views/*/*/*.tsx')
const modulesThird = import.meta.glob('@/views/*/*/*/*.tsx')

class Util {
  /**
   *
   * @description 富文本转纯文本
   * @param val:富文本
   */
  handleRtfToTxt(val: string) {
    let dom: any = document.createElement('div')
    dom.innerHTML = val
    setTimeout(() => {
      dom.remove()
    }, 100)
    return dom.innerText
  }

  /**
   *
   * @description 带浮点乘法精度计算
   * @param list:相乘项数组集合
   * @param pattern:*
   */
  handleMulAccuracy(list: Array<any>, pattern = "*") {
    if (list.length === 1) return list[0]
    if (list.every(item => item === 0)) return 0
    let stringList:Array<string> = list.map(item => item.toString())
    if (stringList.every(item => item.indexOf('.') == -1)) {
      let num = eval(list.join(pattern))
      return num
    } else {
      let m:number = eval(stringList.map((item:string) => {
        return (item.indexOf('.') >= 0) ? item.split('.')[1].length : 0
      }).join('+'))
      let num:number = eval(stringList.map((item:string) => {
        return Number(item.replace('.', ''))
      }).join(pattern))
      return num / Math.pow(10, m)
    }
  }

  /**
   *
   * @description 数值保留有效小数
   * @param val:数值
   * @param decimal:保留位数
   */
  handleValidDecimal(val: any, decimal: number) {
    let num = Number(val)
    if (isNaN(num)) {
      return 0;
    }
    const p1 = Math.pow(10, decimal + 1);
    const p2 = Math.pow(10, decimal);
    return Math.round(num * p1 / 10) / p2;
  }

  /**
   * @description 获取最小最大值
   * @param arr:比较项数组集合
   */
  handleMinAndMax(arr: Array<number>) {
    const newArr = Array.from(new Set(arr))
    const min = Math.min.apply(null, newArr)
    const max = Math.max.apply(null, newArr)

    const obj = {
      min,
      max,
    }
    return obj
  }

  /**
   * @description 去除特殊字符
   * @param val:校验项
   */
  handleSpecialCharacter(val: string) {
    const pattern = new RegExp(
      "[`!$^&*()=|{}':',\\[\\]<>/?~！@#￥……%*（）;—{}【】‘；：”“'。，、？]",
    )
    let rs = ''
    rs = val.replaceAll(pattern, '')
    return rs
  }

  /**
   * @description 树型数据结构数组变成单层级数组
   * @param arr:树型数据结构数组
   * @param subName:子项名称
   */
  handleArrayToSingle(arr: any, subName: string) {
    let tempArr:Array<any> = []
    arr.forEach((item: any, index: number) => {
      tempArr.push(item)
      if (item[subName] && item[subName].length > 0) {
        this.handleArrayToSingle(item[subName], subName)
      }
    })
    return tempArr
  }

  /**
   * @description 深拷贝
   * @param sourceData:数据
   */
  handleDeepClone<T extends Array<T> | any>(sourceData: T): T {
    if (Array.isArray(sourceData)) {
      return sourceData.map((item) => this.handleDeepClone(item)) as T
    }
    const obj: T = {} as T
    for (let key in sourceData) {
      if (typeof sourceData[key] === 'object' && sourceData[key] !== null) {
        obj[key] = this.handleDeepClone(sourceData[key])
      } else {
        obj[key] = sourceData[key]
      }
    }
    return obj
  }

  /**
   * @description 日期格式化
   * @param {Date} date
   * @param format: 格式 例: 'YYYY-MM-DD HH:mm:ss'
   */
  handleFormatDate(date: Date, format: string) {
    return dayjs(date).format(format)
  }

  /**
   * @description 获取本地图片地址
   * @param path: 图片名字 例：'logo.png'
   */
  handleImageUrl(path: string) {
    return new URL(`../assets/image/${path}`, import.meta.url).href
  }

  /**
   * @description 对路径中的特殊字符进行编码
   * @param url: 网址 例：'https://www.google.com'
   */
  handleEncodeJumpUrl(url: string) {
    const encodeArr:Array<any> = [
      {
        code: '+',
        encode: '%2B'
      },
      {
        code: '%',
        encode: '%25'
      },
      {
        code: '?',
        encode: '%3F'
      },
      {
        code: '#',
        encode: '%23'
      },
      {
        code: '&',
        encode: '%26'
      },
      {
        code: '=',
        encode: '%3D'
      },
    ]
    return url.replace(/[+%?#&=]/g, ($, index, str) => {
      for (const k of encodeArr) {
        if (k.code === $) {
          return k.encode
        }
      }
    })
  }

  /**
   * @description 获取星期几
   * @param {Date} date
   */
  handleWeek(date:string) {
    let week = ''
    switch (dayjs(date).day()) {
      case 0:
        week = '星期日'
        break;
      case 1:
        week = '星期一'
        break;
      case 2:
        week = '星期二'
        break;
      case 3:
        week = '星期三'
        break;
      case 4:
        week = '星期四'
        break;
      case 5:
        week = '星期五'
        break;
      case 6:
        week = '星期六'
        break;
    }
    return week
  }

  /**
   * @description 日期倒计时
   * @param val: 目标日期 例: '2023-01-01 23:59:59' （注：仅目标日期大于当前日期时生效）
   */
  handleCountdown(val:string) {
    if (!val) {
      return null
    }
    let date:number = new Date(val.replaceAll('-', '/')).getTime() - new Date().getTime()
    let value:number = date/60/1000
    if (!value || value <= 0) {
      return null
    }
    let day = parseInt((value/60/24).toString())
    let hour = parseInt((value/60%24).toString())
    let min = parseInt((value%60).toString()) + 1
    if(day>0) {
      if (hour > 0) {
        return `${day}天${hour}小时`
      } else {
        return `${day}天`
      }
    } else {
      if (hour > 0) {
        if (min > 0) {
          return `${hour}小时${min}分钟`
        } else {
          return `${hour}小时`
        }
      } else {
        return `${min}分钟`
      }
    }
  }

  /**
   * @description 检测是否包含表情包
   * @param val: 被检测字符串
   */
  handleIsIncludeEmoji(val:string) {
    if(!val){
      return false
    }
    for(let i = 0; i <val.length; i ++){
      let  hs = val.charCodeAt(i)
      if(0xd800 <= hs && hs <= 0xdbff) {
        if(val.length> 1) {
          let ls = val.charCodeAt(i + 1)
          let uc = ((hs - 0xd800)* 0x400)+(ls - 0xdc00)+ 0x10000;
          if (0x1d000 <= uc && uc <= 0x1f77f) {
            return true
          }
        }
      } else if (val.length> 1) {
        let  ls = val.charCodeAt(i + 1)
        if  (ls == 0x20e3) {
          return true
        }
      } else {
        if (0x2100 <= hs && hs <= 0x27ff) {
          return true
        } else if  (0x2B05 <= hs && hs <= 0x2b07){
          return true
        }  else if  (0x2934 <= hs && hs <= 0x2935){
          return true
        }  else if  (0x3297 <= hs && hs <= 0x3299){
          return true
        }  else if  (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
          || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
          || hs == 0x2b50){
          return true
        }
      }
    }
  }

  /**
   * @description 防抖
   * @param fn: 方法
   * @param gapTime: 时间间隔 例： 1000
   */
  handleDebounce(fn:any, gapTime:number) {
    let _this = this
    if (gapTime == null || gapTime == undefined) {
      gapTime = 1500
    }
    let _lastTime:any = null
    // 返回新的函数
    return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn.apply(_this, arguments)   //将this和参数传给原函数
        _lastTime = _nowTime
      }
    }
  }

  /**
   * @description 节流
   * @param fn: 方法
   * @param wait: 时间间隔 例： 1000
   */
  handleThrottle(fn:any, wait:number) {
    let timer:any = null
    let _this = this
    if (!wait) {
      wait = 1000
    }
    return function () {
      if (!!timer) return
      timer = setTimeout(() => {
        fn.apply(_this, arguments)
        timer = null
      }, wait)
    }
  }

  /**
   * @description 固话和手机号码验证
   * @param phone: 电话号码
   **/
  handleTelReg(phone:string) {
    const reg = /^((0\d{2,3}-?\d{7,8})|(1[3465789]\d{9}))$/ //联系方式
    return reg.test(phone)
  }

  /**
   * @description 手机号码验证
   * @param phone: 电话号码
   **/
  handlePhoneReg(phone:string) {
    const reg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/
    return reg.test(phone)
  }

  /**
   * @description 密码强校验
   * @param val: 密码
   * @param type: 验证类型
   **/
  handlePasswordReg(val:string, type:number) {
    let reg:any
    switch (type) {
      case 1:
        reg = /^(?![A-Za-z0-9]+$)(?![a-z0-9\W]+$)(?![A-Za-z\W]+$)(?![A-Z0-9\W]+$)[a-zA-Z0-9\W]{11,20}$/ // 包含大小写字母、数字、特殊字符
        break;
      case 2:
        reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/ // 只包含字母、数字组合
        break;
      case 3:
        reg = /^(?![^a-zA-Z]+$)(?!\D+$)[^\u4e00-\u9fa5]{8,20}$/ // 至少包含字母、数字，可包含其他(不包含汉字)
        break;
    }
    return reg.test(val)
  }

  /**
   * @description 身份证校验
   * @param val: 身份证号码
   **/
  handleIdentityReg(val:string) {
    let reg =/^\d{6}(18|19|20)?\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    return reg.test(val)
  }

  /**
   * 清除字符串所有空格
   * @param val: 校验项
   */
  handleTrimAllSpace(val:string) {
    val = val.replace(/\s/g, '')
    return val
  }

  /**
   * 清除字符串左右两边的空格
   * @param val: 校验项
   */
  handleTrimBothSpace(val:string) {
    val = val.replace(/(^\s*)|(\s*$)/g, "")
    return val
  }

  /**
   * 获取组件路径
   * @param routeName: 页面路径
   */
  handleComponentPath(routePath: ERoutePath) {
    const path:string = `/src/views${routePath}/index.tsx`
    let module:any
    switch (routePath.split('/').length) {
      case 2:
      module = modulesFirst[path]
        break;
      case 3:
      module = modulesSecond[path]
        break;
      case 4:
      module = modulesThird[path]
        break;
    }
    return module
  }

}

export default new Util()
