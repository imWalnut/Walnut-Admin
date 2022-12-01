import {getCurrentInstance, defineComponent, ref, toRefs, onBeforeMount, onMounted, watch, computed} from "vue"
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'

export default defineComponent({
  name: "App",
  components: {},
  setup(props, { attrs, slots, emit, expose }) {
    const currentInstance: any = getCurrentInstance()
    const proxy: any = currentInstance.proxy
    const language: any = zhCn

    onMounted(async ()=> {})

    return () => (
      <div id="app">
        <el-config-provider locale={language}>
          <router-view />
        </el-config-provider>
      </div>
    )
  }
})
