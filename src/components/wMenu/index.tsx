/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ComponentInternalInstance,
  getCurrentInstance,
  defineComponent,
  ref,
  onMounted,
  watchEffect,
} from "vue";
import "./index.less";
import { IMenuItem } from "@/types";
import util from "@/utils/util";
import useSystemStore from "@/store/system";
import {storeToRefs} from "pinia";

export default defineComponent({
  name: "menuBar",
  components: {},
  props: {},
  setup(props, { attrs, slots, emit, expose }) {
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;

    // 仓库引用
    const systemStore = useSystemStore()
    const {isCollapse, myTheme} = storeToRefs(systemStore)

    // 页面变量
    const menuList = ref<IMenuItem[]>();
    const subMenuList = ref<IMenuItem[]>();
    const activeMenuPath = ref("/" + proxy?.$route.path.split("/")[1]);

    // 获取菜单列表
    const handleMenuList = () => {
      menuList.value = [
        {
          name: "首页",
          path: "/home",
          icon: "",
          children: [],
        },
        {
          name: "商品管理",
          path: "/product",
          icon: "",
          children: [
            {
              name: "商品列表",
              path: "/product/list",
              icon: "",
              children: [],
            },
            {
              name: "商品分类",
              path: "/product/classify",
              icon: "",
              children: [],
            },
            {
              name: "商品分组",
              path: "/product/group",
              icon: "",
              children: [],
            },
            {
              name: "商品规格",
              path: "/product/sku",
              icon: "",
              children: [],
            },
          ],
        },
      ];
      const index = menuList.value.findIndex(
        (item: IMenuItem) => item.path === activeMenuPath.value
      );
      subMenuList.value = menuList.value[index].children || [];
    };

    // 切换主菜单
    const handleChangeMenu = (val: IMenuItem) => {
      if (isCollapse.value) {
        systemStore.setIsCollapse();
      }
      subMenuList.value = [];
      if (!val.children || val.children.length === 0) {
        handleJump(val);
      } else {
        subMenuList.value = util.handleDeepClone(val.children);
        handleSetDefault(val.children[0]);
      }
    };

    // 点击主菜单设置默认激活菜单项
    const handleSetDefault = (val: IMenuItem) => {
      if (!val.children || val.children.length === 0) {
        handleJump(val);
      } else {
        handleSetDefault(val.children[0]);
      }
    };

    // 路由跳转
    const handleJump = (val: IMenuItem) => {
      proxy?.$router.push(val.path);
    };

    // 判断当前激活的菜单
    const handleIsActive = (val: IMenuItem) => {
      activeMenuPath.value = "/" + proxy?.$route.path.split("/")[1];
      return val.path === activeMenuPath.value;
    };

    // 菜单名称获取
    const handleMenuName = () => {
      const obj: IMenuItem = subMenuList.value![0];
      const clickObj = menuList.value!.find((item: IMenuItem) => {
        return item.path === "/" + obj.path.split("/")[1];
      });
      return clickObj!.name;
    };

    // 监听路有变化调整子菜单
    watchEffect(() => {
      activeMenuPath.value = "/" + proxy?.$route.path.split("/")[1];
      handleMenuList();
    });

    onMounted(async () => {
      await handleMenuList();
    });

    // 分栏-最底层菜单项
    const renderMenuItem = (val: IMenuItem) => {
      return (
        <el-menu-item index={val.path} onClick={() => handleJump(val)}>
          <div class="sub-menu-item">{val.name}</div>
        </el-menu-item>
      );
    };

    // 分栏-子菜单
    const renderSubMenu = (val: IMenuItem) => {
      const icon = val.icon || "Menu";
      const menuItem = val?.children.map((item: IMenuItem) => {
        if (item.children && item.children.length > 0) {
          return renderSubMenu(item);
        } else {
          return renderMenuItem(item);
        }
      });
      const slotsTitle = {
        title: () => (
          <div>
            {isCollapse.value && <wIcon icon={icon} />}
            {!isCollapse.value && val.name}
          </div>
        ),
      };
      return (
        <el-sub-menu class="sub-menu" index={val.path} v-slots={slotsTitle}>
          {menuItem}
        </el-sub-menu>
      );
    };

    // 分栏-主菜单栏
    const renderFatherMenu = () => {
      const menuItem = menuList.value?.map((item: IMenuItem) => {
        return (
          <div
            class={
              handleIsActive(item)
                ? "menu-father-item is-active"
                : "menu-father-item"
            }
            onClick={() => handleChangeMenu(item)}
          >
            <div class="father-item-icon"></div>
            <div class="father-item-name">{item.name}</div>
          </div>
        );
      });
      return <div class="menu-left-bottom">{menuItem}</div>;
    };

    // 分栏-子菜单栏
    const renderChildMenu = (data: Array<IMenuItem>) => {
      const menuItems = data.map((item: IMenuItem) => {
        if (item.children && item.children.length > 0) {
          return renderSubMenu(item);
        } else {
          return renderMenuItem(item);
        }
      });
      return (
        <div class="menu-right-bottom">
          <el-menu default-active={proxy?.$route.path}>{menuItems}</el-menu>
        </div>
      );
    };

    // 分栏
    const renderSubfield = () => {
      return (
        <div class="menu-subfield">
          <div class="menu-left">
            <div class="menu-left-top">
              <img src={util.handleImageUrl("logo.png")} />
            </div>
            {menuList.value!.length > 0 && renderFatherMenu()}
          </div>
          {!isCollapse.value && subMenuList.value!.length > 0 && (
            <div class="menu-right">
              <div class="menu-right-top">{proxy?.$t("common.webName")}</div>
              <div class="menu-right-mid">
                <el-divider content-position="center">
                  {handleMenuName}
                </el-divider>
              </div>
              {renderChildMenu(subMenuList.value!)}
            </div>
          )}
        </div>
      );
    };

    // 默认-顶部
    const renderHeader = () => {
      return (
        <div class="menu-header">
          {isCollapse.value && (
            <img src={util.handleImageUrl("logo.png")} />
          )}
          {!isCollapse.value && (
            <>
              <img src={util.handleImageUrl("logo.png")} />
              {proxy?.$t("common.webName")}
            </>
          )}
        </div>
      );
    };

    // 默认-菜单
    const renderMenu = () => {
      const subMenu = menuList.value?.map((item) => {
        if (item.children && item.children.length > 0) {
          return renderSubMenu(item);
        } else {
          return renderMenuItem(item);
        }
      });
      return (
        <div class="menu-main">
          <el-menu
            collapse-transition={false}
            class="el-menu-vertical"
            v-model:collapse={isCollapse.value}
            ref="menu"
            default-active={proxy?.$route.path}
          >
            {subMenu}
          </el-menu>
        </div>
      );
    };

    // 默认
    const renderDefault = () => {
      return (
        <div class="menu-default">
          {renderHeader()}
          {renderMenu()}
        </div>
      );
    };

    return () => (
      <div class="menu">
        {myTheme.value === "subfield" && renderSubfield()}
        {myTheme.value === "default" && renderDefault()}
      </div>
    );
  },
});
