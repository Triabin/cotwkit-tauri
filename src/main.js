import { createApp } from "vue";
import App from "./App.vue";
import { router } from "@/router";
import CustomFunc from "@/plugins/custom-func.js";
import Antd from 'ant-design-vue';
import store from '@/stores';
import i18n from '@/locales';
import '@/styles/styles.css';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);
app.use(router)
  .use(CustomFunc)
  .use(Antd)
  .use(store)
  .use(i18n)
  .mount("#app");
