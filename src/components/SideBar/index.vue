<!-- 侧边栏菜单 -->
<template>
  <a-layout-sider :collapsed="state.collapsed"
                  :collapsed-width="64"
                  :collapsible="collapsible"
                  :defaultCollapsed="false"
                  theme="light"
                  :trigger="null"
  >
    <a-button v-if="collapsible" type="text" @click="() => state.collapsed = !state.collapsed">
      <MenuUnfoldOutlined v-if="state.collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
    <div class="logo"><logo height="32" width="32" :title-visible="!state.collapsed"/></div>
    <a-menu v-model:selected-keys="state.selectedKeys"
            mode="inline"
            theme="light"
            :items="menuItems"
            @click="clickMenu"
    />
  </a-layout-sider>
</template>

<script lang="js" setup>
import {
  DatabaseOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReadOutlined,
  SettingOutlined
} from '@ant-design/icons-vue';
import Logo from "@/components/Logo/index.vue";
import { h, reactive, ref } from 'vue';
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router';

const collapsible = ref(false);
const { t } = useI18n();
const router = useRouter();
const state = reactive({
  collapsed: false,
  selectedKeys: ['/home']
});
const menuItems = reactive([
  {
    key: '/home',
    icon: () => h(HomeOutlined),
    label: t('menu.home'),
    title: t('menu.home')
  },
  {
    key: '/handbook',
    icon: () => h(ReadOutlined),
    label: t('menu.handbook'),
    title: t('menu.handbook'),
  },
  {
    key: '/backup',
    icon: () => h(DatabaseOutlined),
    label: t('menu.backup'),
    title: t('menu.backup')
  },
  {
    key: '/setting',
    icon: () => h(SettingOutlined),
    label: t('menu.setting'),
    title: t('menu.setting')
  }
]);

const clickMenu = (item, key, selectedKeys) => {
  let path = item.key;
  if (router.currentRoute.value.path === path) return;
  router.push(path);
}
</script>

<style lang="scss" scoped>
.sidebar {
  min-width: 240px;
  max-width: min(320px, 25vw); /* 不超过视口宽度的25% */
  min-height: 100vh;
  transition: width 0.3s ease;
  display: inline-flex;
  margin-right: 10px;
  border-radius: var(--border-radius);
}

@media (max-width: 1440px) {
  .sidebar {
    max-width: 280px;
  }
}

#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}
</style>
