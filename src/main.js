import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import { createApp } from "vue";
import store from './store';
import router from "./router";
import i18n from './locales';
import scui from './scui';
import App from "./App.vue";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(i18n);
app.use(scui);

app.mount("#app");
