<!-- 备份管理 -->
<template>
  <div class="backup-menu">
    <div style="margin-bottom: 10px;">
      <a-button type="primary" @click="getBackups">查询</a-button>
    </div>
    <div class="card-data">
      <a-card v-for="item in backups" :title="item.title" style="width: 300px">
        <p>备份时间：{{ item.backupTime }}</p>
        <p>存档时间：{{ item.archiveTime }}</p>
      </a-card>
    </div>
  </div>
</template>
<script lang="js" setup>
import { invoke } from "@tauri-apps/api/core";
import { onMounted, ref } from 'vue';

const backups = ref({});
const getBackups = async () => backups.value = await invoke('get_backup_data');

onMounted(() => getBackups());
</script>
<style lang="scss" scoped>
.backup-menu {
  margin: 10px;
}

.card-data {
  display: grid;  /* 启用网格布局 */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 10px;  /* 网格间距 */
}
</style>