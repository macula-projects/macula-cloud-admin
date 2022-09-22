import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import { createApp } from "vue";
import { createPinia } from 'pinia';
import router from "./router";
import i18n from './locales';
import scui from './scui';
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(scui);

app.mount("#app");
