import {
  getCurrentInstance,
  defineComponent,
  onMounted, watch, ref,
} from "vue"
import classes from './index.module.less'
import wMenu from "@/components/wMenu";
import wNavigation from "@/components/wNavigation";
import {storeToRefs} from "pinia";
import useSystemStore from "@/store/system";

export default defineComponent({
  name: "Index",
  components: {
    wMenu,
    wNavigation
  },
  props: {},
  setup(props, { attrs, slots, emit, expose }) {
    const currentInstance: any = getCurrentInstance()
    const proxy: any = currentInstance.proxy
    // 仓库引用
    const systemStore = useSystemStore()
    const {isCollapse} = storeToRefs(systemStore)

    let domWidth = ref('')

    watch(isCollapse, (newValue => {
      proxy.$nextTick(() => {
        domWidth.value = `width: calc(100% - ${proxy.$refs.refMenu.$el.clientWidth}px)`
      })
    }))

    onMounted(async ()=> {})

    return () => (
      <div class={classes.index}>
        <wMenu ref="refMenu" />
        <div class={classes.index_main} style={domWidth.value}>
          <wNavigation />
          <div class={classes.main_content}>
            <router-view class={classes.page_main}/>
          </div>
        </div>
      </div>
    )
  }
})