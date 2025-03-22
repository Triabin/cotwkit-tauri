<template>
  <init-naive-config-provider>
    <title-bar/>
    <a-layout style="min-height: 100vh;">
      <side-bar/>
      <a-layout>
        <a-layout-content style="text-align: center">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </init-naive-config-provider>
</template>
<script lang="js" setup>
import InitNaiveConfigProvider from '@/components/ConfigProvider'
import TitleBar from '@/components/TitleBar';
import SideBar from '@/components/SideBar';
import { RouterView } from "vue-router";
</script>
