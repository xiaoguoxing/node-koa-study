import { createApp } from 'vue'
import App from './App.vue'
import router from '@/routers/index';
import ElementPlus from 'element-plus';
import * as Icons from '@element-plus/icons-vue';
import znxjUi from '@/components/znxj-components/znxj-ui';

import '@/styles/index.scss';
import 'element-plus/dist/index.css'

const app =  createApp(App)
Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key]);
});

app.use(router).use(ElementPlus).use(znxjUi).mount('#app')
