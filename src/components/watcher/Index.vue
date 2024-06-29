<template>
  <md-list class="watcher-list">
    <template v-for="(item, i) in list">
      <md-divider v-if="i > 0"></md-divider>
      <md-list-item @click="showDetail(item.App)">
        <div slot="headline">{{ item.App }}</div>
        <div slot="supporting-text">{{ item.Desc }}</div>
        <div slot="trailing-supporting-text">{{ item.Method }}</div>
      </md-list-item>
    </template>
  </md-list>
  <!-- <form>
    <md-filled-button>提交</md-filled-button>
  </form> -->
</template>
<script setup lang="ts">
import { Watcher } from '@/models/watcher';
import '@material/web/checkbox/checkbox';
import '@material/web/fab/fab';
import '@material/web/list/list';
import '@material/web/list/list-item';
import '@material/web/divider/divider';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const list = reactive<Watcher[]>([]);
const showDetail = (app: string) => {
  router.push(`/detail/${app}`);
};
const init = async () => {
  const items = await Watcher.list();
  list.splice(0);
  list.push(...items);
};
init();
</script>
<style lang="scss" scoped>
.watcher-list {
  width: 100%;
  height: 100%;
  padding: 8px;
}
</style>
