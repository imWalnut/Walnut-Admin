/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ComponentInternalInstance,
    getCurrentInstance,
    defineComponent,
    onMounted,
  } from "vue";
  import zhCn from "element-plus/es/locale/lang/zh-cn";
  import en from "element-plus/es/locale/lang/en";
  import { RouterView } from "vue-router";
  
  export default defineComponent({
    name: "App",
    components: {},
    setup(props, { attrs, slots, emit, expose }) {
      const { proxy } = getCurrentInstance() as ComponentInternalInstance;
      const language = zhCn;
  
      onMounted(async () => {});
  
      return () => (
        <div id="app">
          <el-config-provider locale={language}>
            <RouterView />
          </el-config-provider>
        </div>
      );
    },
  });
  