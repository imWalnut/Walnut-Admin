const modulesFirst = import.meta.glob('@/views/*/*.tsx')
const modulesSecond = import.meta.glob('@/views/*/*/*.tsx')
const modulesThird = import.meta.glob('@/views/*/*/*/*.tsx')

class util {
  /**
   * @description 深拷贝
   * @param sourceData:数据
   */
  handleDeepClone<T extends Array<T> | any>(sourceData: T): T {
    if (Array.isArray(sourceData)) {
      return sourceData.map((item) => this.handleDeepClone(item)) as T;
    }
    const obj: T = {} as T;
    for (const key in sourceData) {
      if (typeof sourceData[key] === "object" && sourceData[key] !== null) {
        obj[key] = this.handleDeepClone(sourceData[key]);
      } else {
        obj[key] = sourceData[key];
      }
    }
    return obj;
  }

  /**
   * @description 获取本地图片地址
   * @param path: 图片名字 例：'logo.png'
   */
  handleImageUrl(path: string) {
    return new URL(`../assets/image/${path}`, import.meta.url).href;
  }

  /**
   * 获取组件路径
   * @param routePath
   */
  handleComponentPath(routePath: string) {
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

export default new util();
