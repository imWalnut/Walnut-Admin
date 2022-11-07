import {
  getCurrentInstance,
  defineComponent,
  onMounted,
} from "vue"
import './index.less'
import wMenu from "@/components/wMenu";
import wNavigation from "@/components/wNavigation";

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

    onMounted(async ()=> {})

    return () => (
      <div class="index">
        <wMenu />
        <div class="index-main">
          <wNavigation />
          <div class="main-content">
            <router-view/>
          </div>
        </div>
      </div>
    )
  }
})
