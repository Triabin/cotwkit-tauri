<!-- 组件式国际化组件 -->
<template>
  <a-config-provider :theme="themeConfig"
                     :locale="local === LANG.enUS.value ? enUS : zhCN"
  >
    <slot></slot>
  </a-config-provider>
</template>
<script lang="js" setup>
import { ref, reactive } from 'vue';
import { theme } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
import { LANG } from '@/common/enums';

const themeConfig = reactive({
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#FF9700'
  }
});

const local = ref(LANG.zhCN.value);
</script>
