import { ERouteName, ERoutePath, ERouteTitle, IRouteParams } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

const useSystemStore = defineStore(
  "system",
  () => {
    // 左侧菜单折叠状态
    const isCollapse = ref(false);

    const setIsCollapse = () => {
      isCollapse.value = !isCollapse.value;
    };

    // 主题
    const myTheme = ref("default");

    const setTheme = () => {
      switch (myTheme.value) {
        case "default":
          myTheme.value = "subfield";
          break;
        case "subfield":
          myTheme.value = "default";
          break;
      }
    };

    // 已激活的路由信息
    const routeList = ref<IRouteParams[]>([
      {
        path: ERoutePath.HOME,
        name: ERouteName.HOME,
        title: ERouteTitle.HOME,
      },
    ]);

    const setRouteList = (val: Array<IRouteParams>) => {
      routeList.value = val;
    };

    return {
      isCollapse,
      setIsCollapse,
      routeList,
      setRouteList,
      myTheme,
      setTheme,
    };
  },
  { persist: { enabled: true } }
);

export default useSystemStore;
