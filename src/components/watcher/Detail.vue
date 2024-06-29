<template></template>
<script setup lang="ts">
import { ref } from 'vue';
import { Watcher } from '@/models/watcher';
import { useRoute } from 'vue-router';
const route = useRoute();
const detail = ref<Watcher>(new Watcher());
const init = async () => {
  const mode = route.query.mode as string;
  if (mode === 'create') {
    detail.value = new Watcher();
    return;
  }
  const app = route.query.app as string;
  const res = await Watcher.get(app);
  if (res) detail.value = res;
};
init();
</script>
<style lang="scss" scoped></style>
