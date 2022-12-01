import {
  getCurrentInstance,
  defineComponent,
  onMounted,
} from "vue"
import './index.less'
import wTable from '@/components/wTable'

export default defineComponent({
  name: "icon",
  components: {
    wTable
  },
  props: {},
  setup(props, { attrs, slots, emit, expose }) {
    const currentInstance: any = getCurrentInstance()
    const proxy: any = currentInstance.proxy

    onMounted(async ()=> {})

    return () => (
      <div class="icon">
        <wTable />
      </div>
    )
  }
})
