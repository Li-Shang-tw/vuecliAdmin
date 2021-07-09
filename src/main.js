import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import { date, currency } from './methods/filters';



const app=createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.mount("#app");

app.config.globalProperties.$filters = {
  date,
  currency,
};
