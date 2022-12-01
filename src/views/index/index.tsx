import {
  getCurrentInstance,
  defineComponent,
  onMounted,
} from "vue"
import './index.less'
import wMenu from "@/components/wMenu";
import wNavigation from "@/components/wNavigation";
import {storeToRefs} from "pinia";
import usePiniaStore from "@/store";

export default defineComponent({
  name: "Index",
  components: {
    wMenu,
    wNavigation
  },
  props: {},
  setup(props, { attrs, slots, emit, expose }) {
    // 仓库引用
    const piniaStore = usePiniaStore()
    const {isCollapse} = storeToRefs(piniaStore)

    onMounted(async ()=> {})

    return () => (
      <div class="index">
        <wMenu />
        <div class={isCollapse.value ? 'index-main index-collapse' : 'index-main'}>
          <wNavigation />
          <div class="main-content">
            <router-view class="page-main"/>
          </div>
        </div>
      </div>
    )
  }
})
