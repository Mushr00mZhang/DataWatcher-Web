<template>
  <section class="watcher-data-preview">
    <section class="watcher-data-preview-container">
      <DataPreviewTable :datas="datas" />
    </section>
  </section>
</template>
<script setup lang="ts">
import { Watcher, IDataDto as WatcherIDataDto } from '@/models/watcher';
import { onMounted, reactive } from 'vue';
import DataPreviewTable from '@/components/watcher/DataPreviewTable.vue';
type Props = {
  app: string;
  datasources: string[];
};
const props = withDefaults(defineProps<Props>(), {
  app: '',
  datasources: () => [],
});
const datas = reactive<WatcherIDataDto[]>([]);
const init = async () => {
  if (!props.app || !props.datasources.length) return;
  const res = await Watcher.dataPreview(props.app, props.datasources[0]);
  for (const r of res) {
    r['@timestamp'] = r['@timestamp'].slice(0, 19).replace('T', ' ');
  }
  datas.splice(0);
  datas.push(...res);
};
onMounted(init);
</script>
<style lang="scss">
$prefix-class: 'watcher-data-preview';
.#{$prefix-class} {
  &-container {
    text-align: center;
    // display: flex;
    // flex-direction: column;
  }
  &-item {
    // display: flex;
  }
}
</style>
