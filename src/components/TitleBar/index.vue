<!-- 软件标题栏 -->
<template>
  <!-- 标题栏 -->
  <a-flex :vertical="false" justify="flex-end" align="center" gap="small">
    <!-- 最小化按钮 -->
    <a-button type="text" @click="minimize">
      <minus-outlined/>
    </a-button>
    <!-- 最大化按钮 -->
    <a-button type="text" @click="toggleMaximize">
      <block-outlined v-if="isMaximized"/>
      <border-outlined v-if="!isMaximized"/>
    </a-button>
    <!-- 关闭按钮 -->
    <a-button type="text" @click="closeWindow">
      <close-outlined/>
    </a-button>
  </a-flex>
</template>
<script lang="js" setup>
import { getCurrentWindow } from "@tauri-apps/api/window";
import { BorderOutlined, CloseOutlined, MinusOutlined, BlockOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';

const appWindow = getCurrentWindow();
const minimize = () => appWindow.minimize();
const toggleMaximize = async () => {
  await appWindow.toggleMaximize();
  isMaximized.value = await appWindow.isMaximized();
}
const closeWindow = () => appWindow.close();
const isMaximized = ref(false);
</script>
