<template>
  <section class="watcher-data-preview">
    <section class="watcher-data-preview-container">
      <table>
        <thead>
          <tr>
            <th>时间戳</th>
            <th>呆滞一天</th>
            <th>呆滞一周</th>
            <th>呆滞一月</th>
            <th>扩展数据</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="datas.length" v-for="data in datas">
            <td>{{ data['@timestamp'].slice(0, 19).replace('T', ' ') }}</td>
            <td>{{ data.Expire1Day }}</td>
            <td>{{ data.Expire1Week }}</td>
            <td>{{ data.Expire1Month }}</td>
            <td>{{ JSON.stringify(data.External) }}</td>
            <!-- <div class="watcher-data-preview-item">
              <div class="watcher-data-preview-item-prop">
                <label class="watcher-data-preview-item-prop-label">时间戳</label>
                <span class="watcher-data-preview-item-prop-value">{{
                  data['@timestamp'].slice(0, 19).replace('T', ' ')
                }}</span>
              </div>
              <div class="watcher-data-preview-item-prop">
                <label class="watcher-data-preview-item-prop-label">呆滞一天</label>
                <span class="watcher-data-preview-item-prop-value">{{ data.Expire1Day }}</span>
              </div>
              <div class="watcher-data-preview-item-prop">
                <label class="watcher-data-preview-item-prop-label">呆滞一周</label>
                <span class="watcher-data-preview-item-prop-value">{{ data.Expire1Week }}</span>
              </div>
              <div class="watcher-data-preview-item-prop">
                <label class="watcher-data-preview-item-prop-label">呆滞一月</label>
                <span class="watcher-data-preview-item-prop-value">{{ data.Expire1Month }}</span>
              </div>
              <div class="watcher-data-preview-item-prop">
                <label class="watcher-data-preview-item-prop-label">扩展数据</label>
                <span class="watcher-data-preview-item-prop-value">{{
                  JSON.stringify(data.External)
                }}</span>
              </div>
            </div> -->
          </tr>
          <tr v-else>
            <td class="watcher-data-preview-item" colspan="5">暂无数据</td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>
<script setup lang="ts">
import { Watcher } from '@/models/watcher';
import { onMounted, reactive } from 'vue';
type Props = {
  app: string;
  datasources: string[];
};
const props = withDefaults(defineProps<Props>(), {
  app: '',
  datasources: () => [],
});
const datas = reactive<ReturnType<typeof Watcher.dataPreview> extends Promise<infer T> ? T : never>(
  []
);
const init = async () => {
  if (!props.app || !props.datasources.length) return;
  const res = await Watcher.dataPreview(props.app, props.datasources[0]);
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
