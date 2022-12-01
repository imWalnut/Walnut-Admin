import {
  getCurrentInstance,
  defineComponent,
  ref,
  onMounted,
  watchEffect
} from "vue"
import './index.less'
import {ERouteName, ERoutePath, IRouteParams} from "@/serviceType";
import usePiniaStore from "@/store";
import {storeToRefs} from "pinia";

export default defineComponent({
  name: "navigationBar",
  components: {},
  props: {},
  setup(props, {attrs, slots, emit, expose}) {
    const currentInstance: any = getCurrentInstance()
    const proxy: any = currentInstance.proxy

    // 仓库
    const piniaStore = usePiniaStore()
    const {isCollapse, routeList} = storeToRefs(piniaStore)

    // 变量
    const icon = ref('Expand')
    const activeTab = ref('')
    const fullScreen = ref(false)

    // 左侧菜单折叠状态
    const handleSwitch = () => {
      piniaStore.handleIsCollapse()
    }

    // 全屏
    const handleFullScreen = () => {
      let element = document.documentElement
      if (fullScreen.value) {
        document.exitFullscreen();
      } else {
        element.requestFullscreen();
      }
      fullScreen.value = !fullScreen.value
    }

    // 主题
    const handleChangeTheme = () => {
      piniaStore.handleTheme()
    }

    // 退出登录
    const handleLogout = () => {
      proxy.$router.push(ERoutePath.LOGIN)
    }

    // 移除标签页
    const handleRemoveTab = (val: string) => {
      let routes: Array<IRouteParams> = proxy.$util.handleDeepClone(routeList.value)
      routes = routes.filter((item: IRouteParams) => {
        return item.path !== val
      })
      piniaStore.handleRouteList(routes)
      if (val === proxy.$route.fullPath) {
        proxy.$router.push(routes[routes.length - 1].path)
      }
    }

    // 路由跳转
    const handleJump = (val: string) => {
      proxy.$router.push(val)
    }

    // 点击下拉菜单
    const handleClickDropdown = (val: string) => {
      switch (val) {
        case 'all':
          handleCloseAllTabs()
          break
        case 'other':
          handleCloseOtherTabs()
          break
        case 'left':
          handleCloseLeftTabs()
          break
        case 'right':
          handleCloseRightTabs()
          break
      }
    }

    // 关闭所有标签
    const handleCloseAllTabs = () => {
      const routes = [
        {
          name: ERouteName.HOME,
          path: ERoutePath.HOME,
        }
      ]
      piniaStore.handleRouteList(routes)
      proxy.$router.push(ERoutePath.HOME)
    }

    // 关闭其他标签
    const handleCloseOtherTabs = () => {
      let routes = routeList.value.filter((item: IRouteParams) => {
        return item.path === activeTab.value
      })
      if (!routes.some((item: IRouteParams) => {
        return item.path === ERoutePath.HOME
      })) {
        routes.unshift({
          path: ERoutePath.HOME,
          name: ERouteName.HOME
        })
      }
      piniaStore.handleRouteList(routes)
    }

    // 关闭左侧标签
    const handleCloseLeftTabs = () => {
      let index = routeList.value.findIndex((item: IRouteParams) => {
        return item.path === activeTab.value
      })
      let routes = routeList.value.slice(index)
      if (!routes.some((item: IRouteParams) => {
        return item.path === ERoutePath.HOME
      })) {
        routes.unshift({
          path: ERoutePath.HOME,
          name: ERouteName.HOME
        })
      }
      piniaStore.handleRouteList(routes)
    }

    // 关闭右侧标签
    const handleCloseRightTabs = () => {
      let index = routeList.value.findIndex((item: IRouteParams) => {
        return item.path === activeTab.value
      })
      let routes = routeList.value.slice(0, index + 1)
      piniaStore.handleRouteList(routes)
    }

    onMounted(async () => {
    })

    watchEffect(() => {
      icon.value = isCollapse.value ? 'Expand' : 'Fold'
    })

    watchEffect(() => {
      activeTab.value = proxy.$route.path
    })

    // 路径名
    const renderPath = () => {
      let path: Array<any>
      path = proxy.$route.meta.title.split('/')
      let pathItem = path.map((item: any, index: number) => {
        return (
          <div class="path-item">
            <span>{item}</span>
            {(index !== path.length - 1) && <wIcon icon="ArrowRightBold" size={14}/>}
          </div>
        )
      })
      return (
        <div class="navigation-top-left-path">{pathItem}</div>
      )
    }

    // 页签
    const renderTabs = () => {
      const tabItem: any = routeList.value.map((item: IRouteParams, index: number) => {
        return (
          <el-tab-pane closable={index !== 0} class="tabs-item" label={item.name} key={item.path} name={item.path}/>
        )
      })
      return (
        <div class="navigation-bottom-tabs">
          {tabItem &&
            <el-tabs v-model={activeTab.value} type="card" onTabRemove={handleRemoveTab} onTabChange={handleJump}>
              {tabItem}
            </el-tabs>}
        </div>
      )
    }

    // 下拉菜单项
    const renderDropdownItem = () => {
      return (
        {dropdown: () => <el-dropdown-menu>
            <el-dropdown-item command={'all'}>{proxy.$t('common.closeAll')}</el-dropdown-item>
            <el-dropdown-item command={'other'}>{proxy.$t('common.closeOther')}</el-dropdown-item>
            <el-dropdown-item command={'right'}>{proxy.$t('common.closeRight')}</el-dropdown-item>
            <el-dropdown-item command={'left'}>{proxy.$t('common.closeLeft')}</el-dropdown-item>
          </el-dropdown-menu>}
      )
    }

    return () => (
      <div class="navigation">
        <div class="navigation-top">
          <div class="navigation-top-left">
            <wIcon onClick={handleSwitch} icon={icon.value} size={20}/>
            {renderPath()}
          </div>
          <div class="navigation-top-right">
            <wIcon icon="Refresh" size={20} title={proxy.$t('common.refresh')}/>
            <wIcon icon="FullScreen" size={20}
                   title={fullScreen.value ? proxy.$t('common.exitFullScreen') : proxy.$t('common.fullScreen')}
                   onClick={handleFullScreen}/>
            <wIcon icon="View" size={20} title={proxy.$t('common.theme')} onClick={handleChangeTheme}/>
            <img src={proxy.$util.handleImageUrl('logo.png')}/>
            <span class="navigation-name">admin</span>
            <span class="navigation-exit" onClick={handleLogout}>{`[${proxy.$t('common.logout')}]`}</span>
          </div>
        </div>
        <el-divider/>
        <div class="navigation-bottom">
          {renderTabs()}
          <el-dropdown
            class="navigation-bottom-menu"
            onCommand={handleClickDropdown}
            v-slots={renderDropdownItem()}>
            <wIcon icon="Menu" size={20}/>
          </el-dropdown>
        </div>
      </div>
    )
  }
})
