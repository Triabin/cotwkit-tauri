<!-- Logo和slogan组件 -->
<template>
  <div class="logo">
    <img src="/app-icon.png"
         class="logo-image"
         :width="props.width"
         :height="props.height"
         alt=""
    />
    <h2 v-if="props.titleVisible" class="logo-title">
      {{ $t('app.title') }}
    </h2>
  </div>
</template>
<script lang="js" setup>

const props = defineProps({
  titleVisible: {
    type: Boolean,
    default: true
  },

  width: {
    type: Number,
    default: 90
  },

  height: {
    type: Number,
    default: 90
  }
});
</script>
<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center; /* 垂直居中 */
  gap: 10px; /* 图片与标题间距 */
  width: 240px;
  height: 120px;
  padding: 10px;
}

.logo-image {
  object-fit: cover;
  border-radius: 6px;
}

.logo-title {
  margin: 0;
  font-size: 28px;
  color: var(--text-color-base);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
