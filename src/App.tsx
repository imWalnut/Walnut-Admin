import {getCurrentInstance, defineComponent, ref, toRefs, onBeforeMount, onMounted, watch, computed} from "vue"

export default defineComponent({
  name: "App",
  components: {},
  setup(props, { attrs, slots, emit, expose }) {
    const currentInstance: any = getCurrentInstance()
    const proxy: any = currentInstance.proxy

    onMounted(async ()=> {})

    return () => (
      <div id="app">
        <router-view />
      </div>
    )
  }
})
