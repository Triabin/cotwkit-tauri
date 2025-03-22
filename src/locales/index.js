import { createI18n } from "vue-i18n";
import zh from './lang/zh-CN.js';
import en from './lang/en-US.js';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
import { LANG } from '@/common/enums';

const i18n = createI18n({
  globalInjection: true, // 配置$t全局生效
  locale: localStorage.getItem('lang') || LANG.zhCN.i18nValue,
  legacy: false,
  messages: {
    zh: { ...zh, ...zhCN },
    en: { ...en, ...enUS }
  }
});

export default i18n;
