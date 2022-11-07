import {
  getCurrentInstance,
  defineComponent,
  onMounted,
} from "vue"
import './index.less'

export default defineComponent({
  name: "Home",
  components: {},
  props: {},
  setup(props, { attrs, slots, emit, expose }) {
    const currentInstance: any = getCurrentInstance()
    const proxy: any = currentInstance.proxy

    onMounted(async ()=> {})

    return () => (
      <div class="home">
      </div>
    )
  }
})
