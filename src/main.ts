import { createApp } from 'vue'
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import '@/assets/css/main.less'
import App from './App'
import router from './router'
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import i18n from "@/i18n";
import wIcon from '@/components/wIcon/index'


const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersist);

app.use(pinia)
app.use(router)
app.use(ElementPlus, { size: "default", zIndex: 2000 });
app.use(i18n);

app.component('wIcon', wIcon)

app.config.globalProperties.$router = router;

app.mount('#app')
