<template>
  <md-list class="watcher-list">
    <template v-for="(item, i) in list">
      <md-divider v-if="i > 0"></md-divider>
      <md-list-item class="watcher-item">
        <div slot="headline">{{ item.App }}</div>
        <div slot="supporting-text">
          <div>{{ item.Desc }}</div>
          <template v-if="item.EntryID !== 0">
            <div class="watcher-item-time">
              上次运行时间：{{ item.Prev?.slice(0, 19).replace('T', ' ') }}
            </div>
            <div class="watcher-item-time">
              下次运行时间：{{ item.Next?.slice(0, 19).replace('T', ' ') }}
            </div>
          </template>
          <div>运行次数：{{ item.Count }}</div>
          <div>运行时长：{{ item.PrevDuration }}ms</div>
          <div>运行平均时长：{{ item.DurationAvg }}ms</div>
        </div>
        <!-- <div slot="trailing-supporting-text">{{ item.Method }}</div> -->
        <div slot="trailing-supporting-text">
          <div>
            <template v-if="item.Enabled">
              <md-filled-icon-button
                v-if="!!item.EntryID"
                class="watcher-item-operate watcher-item-operate-started"
                title="运行中"
                @click="stop(item.App)"
              >
                <md-icon filled>play_arrow</md-icon>
              </md-filled-icon-button>
              <md-filled-icon-button
                v-else
                class="watcher-item-operate watcher-item-operate-stopped"
                title="已停止"
                @click="start(item.App)"
              >
                <md-icon filled>stop</md-icon>
              </md-filled-icon-button>
            </template>
            <md-filled-icon-button
              class="watcher-item-operate watcher-item-operate-edit"
              title="编辑"
              @click="edit(item.App)"
            >
              <md-icon filled>edit</md-icon>
            </md-filled-icon-button>
            <md-filled-icon-button
              v-if="item.Enabled"
              class="watcher-item-operate watcher-item-operate-enabled"
              title="已启用"
              @click="disable(item.App)"
            >
              <md-icon filled>toggle_off</md-icon>
            </md-filled-icon-button>
            <md-filled-icon-button
              v-else
              class="watcher-item-operate watcher-item-operate-disabled"
              title="已禁用"
              @click="enable(item.App)"
            >
              <md-icon filled>toggle_on</md-icon>
            </md-filled-icon-button>
          </div>
        </div>
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
import '@material/web/divider/divider';
import '@material/web/fab/fab';
import '@material/web/icon/icon';
import '@material/web/iconbutton/filled-icon-button';
import '@material/web/list/list';
import '@material/web/list/list-item';
import { onUnmounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const list = reactive<Watcher[]>([]);
const enable = async (app: string) => {
  const item = list.find((i) => i.App === app);
  if (!item) return;
  const res = await item.enable();
  if (res) {
  }
};
const disable = async (app: string) => {
  const item = list.find((i) => i.App === app);
  if (!item) return;
  const res = await item.disable();
  if (res) {
  }
};
const edit = (app: string) => {
  router.push({
    path: '/list/detail',
    query: {
      app,
      mode: 'update',
    },
  });
};
const start = async (app: string) => {
  const item = list.find((i) => i.App === app);
  if (!item) return;
  const res = await item.start();
  if (res) {
  }
};
const stop = async (app: string) => {
  const item = list.find((i) => i.App === app);
  if (!item) return;
  const res = await item.stop();
  if (res) {
  }
};
let loop = 0;
/** 更新间隔(ms) */
const interval = 10 * 1000;
const getList = async () => {
  const items = await Watcher.list();
  const entries = await Watcher.entries();
  for (const item of items) {
    const entry = entries.find((i) => i.App === item.App);
    if (!entry) continue;
    item.EntryID = entry.ID;
    item.Prev = entry.Prev;
    item.Next = entry.Next;
  }
  list.splice(0);
  list.push(...items);
};
const init = async () => {
  await getList();
  loop = setInterval(getList, interval);
};
init();
onUnmounted(() => {
  clearInterval(loop);
});
</script>
<style lang="scss" scoped>
.watcher-list {
  width: 100%;
  height: 100%;
  padding: 8px;
  overflow: hidden auto;
  md-filled-icon-button {
    margin-left: 8px;
  }
}
.watcher-item {
  div[slot='headline'],
  div[slot='supporting-text'] {
    cursor: default;
  }
  &-time {
    font-size: 12px;
    display: block;
  }
  &-operate {
    &-start,
    &-started {
      $button-color: cadetblue;
      --md-sys-color-primary: #{$button-color};
    }
    &-stop,
    &-stopped {
      $button-color: orange;
      --md-sys-color-primary: #{$button-color};
    }
    &-edit {
      $button-color: cornflowerblue;
      --md-sys-color-primary: #{$button-color};
    }
    &-enable,
    &-enabled {
      $button-color: forestgreen;
      --md-sys-color-primary: #{$button-color};
    }
    &-disable,
    &-disabled {
      $button-color: brown;
      --md-sys-color-primary: #{$button-color};
    }
  }
}
</style>
