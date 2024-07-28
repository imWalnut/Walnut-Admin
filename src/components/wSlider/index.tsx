import {
  getCurrentInstance,
  defineComponent,
  ref,
  toRefs,
  onMounted,
  computed,
} from "vue"
import './index.less'
import {CircleCheck, DArrowRight} from "@element-plus/icons-vue";

export default defineComponent({
  name: "sliderVerification",
  components: {
    DArrowRight,
    CircleCheck
  },
  props: {
    multiple: {
      default: 1.5,
      type: Number
    }
  },
  setup(props, {attrs, slots, emit, expose}) {
    const currentInstance: any = getCurrentInstance()
    const proxy: any = currentInstance.proxy
    const {multiple} = toRefs(props)

    let sliderState = ref(false)
    let verifySuccess = ref(false)
    let beginClientX = ref(0)
    let maxWidth = ref(0)
    let iconSize = ref(22)
    let slideWidth = ref(0)
    const sliderToLeftStyle = computed(() => ({left: slideWidth.value + 'px'}))
    const sliderLeftWidthStyle = computed(() => ({width: slideWidth.value + 'px'}))
    const promptTextStyleSuccess = computed(() => ({color: '#ffffff', cursor: 'pointer'}))

    // 鼠标移动
    const handleMouseMove = (e:any) => {
      if (sliderState.value) {
        let width = (e.clientX - beginClientX.value) / multiple.value
        if (width > 0 && width <= maxWidth.value) {
          slideWidth.value = width
        } else if (width > maxWidth.value) {
          slideWidth.value = maxWidth.value
          handleVerifySuccess()
        }
      }
    }

    // 鼠标松开
    const handleMouseUp = (e:any) => {
      sliderState.value = false
      let width = (e.clientX - beginClientX.value) / multiple.value
      if (width < maxWidth.value) {
        slideWidth.value = 0
      }
    }

    // 验证通过
    const handleVerifySuccess = () => {
      verifySuccess.value = true
      emit('change', true)
      document.getElementsByTagName('html')[0].removeEventListener('mousemove', handleMouseMove)
      document.getElementsByTagName('html')[0].removeEventListener('mouseup', handleMouseUp)
    }

    // 事件监听
    const handleAddListener = () => {
      document.getElementsByTagName('html')[0].addEventListener('mousemove', handleMouseMove)
      document.getElementsByTagName('html')[0].addEventListener('mouseup', handleMouseUp)
    }

    // 重置
    const handleReset = () => {
      if (!verifySuccess.value) {
        return
      }
      handleAddListener()
      emit('change', false)
      slideWidth.value = 0
      beginClientX.value = 0
      sliderState.value = false
      verifySuccess.value = false
    }

    // 鼠标点击滑块
    const handleMouseDown = (e:any) => {
      if (!verifySuccess.value) {
        sliderState.value = true
        beginClientX.value = e.clientX
      }
    }

    // defineExpose({
    //   handleReset
    // })

    onMounted(async () => {
      maxWidth.value = proxy.$refs.sliderContainer.offsetWidth - proxy.$refs.slider.offsetWidth
      handleAddListener()
    })

    return () => (
      <div class="slider-verification" ref="sliderContainer">
        <div class="slider-left-bg" style={sliderLeftWidthStyle.value}></div>
        <div onDblclick={handleReset} title={proxy.$t('login.dbClickReset')} class="prompt-text" style={verifySuccess.value ? promptTextStyleSuccess.value: 'color: black'}>
          {verifySuccess.value ? proxy.$t('login.verifySuccess') : proxy.$t('login.verifyDefault')}
        </div>
        <div ref="slider" onMousedown={(e) => {handleMouseDown(e)}} class={verifySuccess.value ? 'slider-verify-success slider' : 'slider'} style={sliderToLeftStyle.value}>
          {
            verifySuccess.value && <el-icon size={iconSize.value} color="#67C23A">
            <CircleCheck />
            </el-icon>
          }
          {
            !verifySuccess.value && <el-icon size={iconSize.value} color="#dcdfe6">
              <DArrowRight />
            </el-icon>
          }
        </div>
      </div>
    )
  }
})
