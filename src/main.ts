import {createApp} from 'vue'
import {createPinia} from "pinia"
import './assets/css/main.less'
import App from "./App"
import router from "@/router"
import {useRoute} from "vue-router"
import dayjs from "dayjs"
import util from "@/utils/util";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from "@/i18n";
import wIcon from '@/components/wIcon/index'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(ElementPlus)
app.use(ElementPlus, { size: 'small', zIndex: 2000 })

app.component('wIcon', wIcon)

app.config.globalProperties.route = useRoute()
app.config.globalProperties.$router = router
app.config.globalProperties.$dayjs = dayjs
app.config.globalProperties.$util = util
app.config.globalProperties.$t = i18n

app.mount('#app')
