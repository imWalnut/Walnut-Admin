import {
  getCurrentInstance,
  defineComponent,
  ref,
  onMounted,
  watchEffect,
  computed
} from "vue"
import './index.less'
import {IRouteParams} from "@/serviceType";
import usePiniaStore from "@/store";
import {storeToRefs} from "pinia";

export default defineComponent({
  name: "menuBar",
  components: {},
  props: {},
  setup(props, {attrs, slots, emit, expose}) {
    const currentInstance: any = getCurrentInstance()
    const proxy: any = currentInstance.proxy

    // 仓库引用
    const piniaStore = usePiniaStore()
    const {isCollapse, myTheme} = storeToRefs(piniaStore)

    // 页面变量
    let menuList: any = ref([])
    let subMenuList = ref([])
    const activeMenuPath = ref('/' + proxy.$route.path.split('/')[1])

    // 获取菜单列表
    const handleMenuList = () => {
      menuList.value = [
        {
          name: '首页',
          path: '/home',
          icon: '',
          children: []
        },
        {
          name: '组件',
          path: '/module',
          icon: '',
          children: [
            {
              name: '基础组件',
              path: '/module/base',
              icon: '',
              children: [
                {
                  name: '图标',
                  path: '/module/base/icon',
                  icon: '',
                  children: []
                },
              ]
            },
            {
              name: '数据展示',
              path: '/module/show',
              icon: '',
              children: [
                {
                  name: '表格',
                  path: '/module/show/table',
                  icon: '',
                  children: []
                },
              ]
            }
          ]
        },
        {
          name: '文档',
          path: '/document',
          icon: '',
          children: [
            {
              name: '组件',
              path: '/document/components',
              icon: '',
              children: []
            },
            {
              name: '方法',
              path: '/document/functions',
              icon: '',
              children: []
            },
          ]
        },
      ]
      let index = menuList.value.findIndex((item: IRouteParams) => item.path === activeMenuPath.value)
      subMenuList.value = menuList.value[index].children || []
    }

    // 切换主菜单
    const handleChangeMenu = (val:any) => {
      if (isCollapse.value) {
        piniaStore.handleIsCollapse()
      }
      subMenuList.value = []
      if (!val.children || val.children.length === 0) {
        handleJump(val)
      } else {
        subMenuList.value = proxy.$util.handleDeepClone(val.children)
        handleSetDefault(val.children[0])
      }
    }

    // 点击主菜单设置默认激活菜单项
    const handleSetDefault = (val:any) => {
      if (!val.children || val.children.length === 0) {
        handleJump(val)
      } else {
        handleSetDefault(val.children[0])
      }
    }

    // 路由跳转
    const handleJump = (val:any) => {
      proxy.$router.push(val.path)
    }

    // 判断当前激活的菜单
    const handleIsActive = (val:any) => {
      activeMenuPath.value = '/' + proxy.$route.path.split('/')[1]
      return val.path === activeMenuPath.value
    }

    // 菜单名称获取
    const handleMenuName = () => {
      let obj:any = subMenuList.value[0]
      let clickObj = menuList.value.find((item: IRouteParams) => {return item.path === ('/' + obj.path.split('/')[1])})
      return clickObj.name
    }

    // 监听路有变化调整子菜单
    watchEffect(() => {
      activeMenuPath.value = '/' + proxy.$route.path.split('/')[1]
      handleMenuList()
    })

    onMounted(async () => {
      await handleMenuList()
    })

    // 分栏-最底层菜单项
    const renderMenuItem = (val:any) => {
      return (
        <el-menu-item index={val.path} onClick={() => handleJump(val)}>
          <div class="sub-menu-item">
            {val.name}
          </div>
        </el-menu-item>
      )
    }

    // 分栏-子菜单
    const renderSubMenu = (val:any) => {
      let menuItem = val.children.map((item: any) => {
        if (item.children && item.children.length > 0) {
          return renderSubMenu(item)
        } else {
          return renderMenuItem(item)
        }
      })
      const slotsTitle = {title: () => val.name}
      return (
        <el-sub-menu class="sub-menu" index={val.path} v-slots={slotsTitle}>
          {menuItem}
        </el-sub-menu>
      )
    }

    // 分栏-主菜单栏
    const renderFatherMenu = () => {
      let menuItem = menuList.value.map((item: IRouteParams) => {
        return (
          <div class={handleIsActive(item) ? "menu-father-item is-active" : "menu-father-item"} onClick={() => handleChangeMenu(item)}>
            <div class="father-item-icon"></div>
            <div class="father-item-name">
              {item.name}
            </div>
          </div>
        )
      })
      return (
        <div class="menu-left-bottom">
          {menuItem}
        </div>
      )
    }

    // 分栏-子菜单栏
    const renderChildMenu = (data: Array<IRouteParams>) => {
      let menuItems = data.map((item: any) => {
        if (item.children && item.children.length > 0) {
          return renderSubMenu(item)
        } else {
          return renderMenuItem(item)
        }
      })
      return (
        <div class="menu-right-bottom">
          <el-menu default-active={proxy.$route.path}>
            {menuItems}
          </el-menu>
        </div>
      )
    }

    // 分栏
    const renderSubfield = () => {
      return (
        <div class="menu-subfield">
          <div class="menu-left">
            <div class="menu-left-top">
              <img src={proxy.$util.handleImageUrl('logo.png')}/>
            </div>
            {menuList.value.length > 0 && renderFatherMenu()}
          </div>
          {!isCollapse.value && subMenuList.value.length > 0 && <div class="menu-right">
            <div class="menu-right-top">
              {proxy.$t('common.webName')}
            </div>
            <div class="menu-right-mid">
              <el-divider content-position="center">{handleMenuName}</el-divider>
            </div>
            {renderChildMenu(subMenuList.value)}
          </div>}
        </div>
      )
    }

    // 默认-顶部
    const renderHeader = () => {
      return (
        <div class="menu-header">
          {isCollapse.value && <img src={proxy.$util.handleImageUrl('logo.png')}/>}
          {!isCollapse.value && <>
            <img src={proxy.$util.handleImageUrl('logo.png')}/>
            {proxy.$t('common.webName')}
          </>}
        </div>
      )
    }

    // 默认-菜单
    const renderMenu = () => {
      const subMenu = menuList.value.map(item => {
        if (item.children && item.children.length > 0) {
          return renderSubMenu(item)
        } else {
          return renderMenuItem(item)
        }
      })
      return (
        <div class="menu-main">
          <el-menu
            collapse-transition={false}
            class="el-menu-vertical"
            collapse={isCollapse.value}
            ref="menu"
            default-active={proxy.$route.path}>
            {subMenu}
          </el-menu>
        </div>
      )
    }

    // 默认
    const renderDefault = () => {
      return (
        <div class="menu-default">
          {renderHeader()}
          {renderMenu()}
        </div>
      )
    }

    return () => (
      <div class="menu">
        {myTheme.value === 'subfield' && renderSubfield()}
        {myTheme.value === 'default' && renderDefault()}
      </div>
    )
  }
})
