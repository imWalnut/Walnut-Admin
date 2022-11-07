import {
  defineComponent,
  ref,
  onMounted,
  watchEffect
} from "vue"
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

export default defineComponent({
  name: "wIcon",
  components: {},
  props: {
    icon: {
      default: '',
      type: String
    },
    color: {
      default: '',
      type: String
    },
    size: {
      default: 14,
      type: Number
    },
  },
  setup(props, {attrs, slots, emit, expose}) {
    const ElementPlusIcons:any = ElementPlusIconsVue
    const icon = ref('')
    const size = ref(14)
    const color = ref('')

    onMounted(async () => {
    })

    watchEffect(() => {
      icon.value = props.icon
      size.value = props.size
      color.value = props.color
    })

    return () => {
      const component = ElementPlusIcons[icon.value]
      return (
        <el-icon color={color.value} size={size.value}>
          {icon.value && <component />}
        </el-icon>
      )
    }
  }
})
