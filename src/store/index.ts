import {defineStore} from "pinia"
import {ref} from "vue"
import {ERouteName, ERoutePath, IRouteParams} from "@/serviceType";

const usePiniaStore = defineStore('demo', () => {
  // 左侧菜单折叠状态
  const isCollapse = ref(false)

  const handleIsCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  // 主题
  const myTheme = ref('default')

  const handleTheme = () => {
    switch (myTheme.value) {
      case 'default':
        myTheme.value = 'subfield'
        break;
      case 'subfield':
        myTheme.value = 'default'
        break;
    }
  }

  // 已激活的路由信息
  const routeList:any = ref([
    {
      name: ERouteName.HOME,
      path: ERoutePath.HOME,
    }
  ])

  const handleRouteList = (val:Array<IRouteParams>) => {
    routeList.value = val
  }

  return {
    isCollapse,
    handleIsCollapse,
    routeList,
    handleRouteList,
    myTheme,
    handleTheme
  }
}, {persist : {enabled: true}})

export default usePiniaStore
