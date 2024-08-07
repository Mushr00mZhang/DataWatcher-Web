<template>
  <section class="watcher-detail">
    <form class="watcher-detail-form" @submit.prevent>
      <div class="watcher-detail-row">
        <md-outlined-text-field class="watcher-detail-prop" label="模块" v-model="detail.Module" />
        <md-outlined-text-field class="watcher-detail-prop" label="系统" v-model="detail.System" />
      </div>
      <div class="watcher-detail-row">
        <md-outlined-text-field
          class="watcher-detail-prop"
          label="提供方"
          v-model="detail.Provider"
        />
        <md-outlined-text-field
          class="watcher-detail-prop"
          label="请求方"
          v-model="detail.Requester"
        />
      </div>
      <div class="watcher-detail-row">
        <md-outlined-select class="watcher-detail-prop" label="类型" v-model="detail.Type">
          <template v-for="i in Types">
            <md-select-option :value="i">
              {{ i }}
            </md-select-option>
          </template>
        </md-outlined-select>
      </div>
      <div class="watcher-detail-row">
        <md-outlined-select class="watcher-detail-prop" label="承载方式" v-model="detail.Method">
          <template v-for="i in Methods">
            <md-select-option :value="i">
              {{ i }}
            </md-select-option>
          </template>
        </md-outlined-select>
      </div>
      <div class="watcher-detail-row">
        <md-outlined-text-field
          class="watcher-detail-prop"
          label="应用"
          v-model="detail.App"
          required
        />
        <md-outlined-text-field class="watcher-detail-prop" label="描述" v-model="detail.Desc" />
      </div>
      <div class="watcher-detail-row">
        <md-outlined-text-field
          class="watcher-detail-prop"
          label="接口名称"
          v-model="detail.Interface"
        />
      </div>
      <div class="watcher-detail-row">
        <md-outlined-text-field
          class="watcher-detail-prop"
          label="配置路径"
          v-model="detail.ConfigPath"
        />
      </div>
      <div class="watcher-detail-row">
        <md-outlined-select
          class="watcher-detail-prop"
          label="标签"
          value=""
          :display-text="detail.Tags.join(', ')"
        >
          <template v-for="i in Tags">
            <md-select-option>
              <label>
                <md-checkbox
                  touch-target="wrapper"
                  :checked="detail.Tags.includes(i)"
                  @change="
                    detail.Tags.indexOf(i) === -1
                      ? detail.Tags.push(i)
                      : detail.Tags.splice(detail.Tags.indexOf(i), 1)
                  "
                />
                <span>{{ i }}</span>
              </label>
            </md-select-option>
          </template>
        </md-outlined-select>
      </div>
      <div class="watcher-detail-row">
        <md-outlined-select
          class="watcher-detail-prop"
          label="数据源"
          value=""
          :display-text="detail.Sources.join(', ')"
        >
          <template v-for="i in sources">
            <md-select-option>
              <label>
                <md-checkbox
                  touch-target="wrapper"
                  :checked="detail.Sources.includes(i)"
                  @change="
                    detail.Sources.indexOf(i) === -1
                      ? detail.Sources.push(i)
                      : detail.Sources.splice(detail.Sources.indexOf(i), 1)
                  "
                />
                <span>{{ i }}</span>
              </label>
            </md-select-option>
          </template>
        </md-outlined-select>
      </div>
      <div class="watcher-detail-row">
        <md-outlined-text-field
          class="watcher-detail-prop"
          type="textarea"
          label="获取呆滞数据SQL"
          v-model="detail.GetExpired"
        />
      </div>
      <div class="watcher-detail-row">
        <md-outlined-text-field
          class="watcher-detail-prop"
          label="Cron表达式"
          v-model="detail.Cron"
        />
        <!-- <md-outlined-text-field
          class="watcher-detail-prop"
          label="Cron运行时ID"
          v-model="detail.EntryID"
          disabled
        /> -->
      </div>
      <div class="watcher-detail-row">
        <md-outlined-select class="watcher-detail-prop" label="是否启用" v-model="detail.Enabled">
          <md-select-option :value="true">是</md-select-option>
          <md-select-option :value="false">否</md-select-option>
        </md-outlined-select>
      </div>
    </form>
    <md-divider />
    <div class="watcher-detail-foot">
      <md-filled-button class="watcher-detail-foot-btn" @click="confirm">
        <!-- <span>确认</span> -->
        <div>确认</div>
        <md-icon slot="icon">check</md-icon>
      </md-filled-button>
      <md-outlined-button class="watcher-detail-foot-btn" @click="cancel">
        取消
        <md-icon slot="icon">close</md-icon>
      </md-outlined-button>
    </div>
  </section>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Watcher } from '@/models/watcher';
import { useRoute, useRouter } from 'vue-router';
import '@material/web/button/outlined-button';
import '@material/web/button/filled-button';
import '@material/web/checkbox/checkbox';
import '@material/web/divider/divider';
import '@material/web/icon/icon';
import '@material/web/iconbutton/filled-icon-button';
import '@material/web/radio/radio';
import '@material/web/select/outlined-select';
import '@material/web/select/select-option';
import '@material/web/switch/switch';
import '@material/web/textfield/outlined-text-field';
import { Types, Methods, Tags } from '@/models/watcher';
import { Datasource } from '@/models/datasource';
const router = useRouter();
const route = useRoute();
const sources = reactive<string[]>([]);
const detail = ref<Watcher>(new Watcher());
const confirm = async () => {
  const mode = route.query.mode as 'create' | 'update';
  switch (mode) {
    case 'create':
      {
        const res = await detail.value.create();
        if (res) {
          router.back();
        }
      }
      break;
    case 'update':
      {
        const res = await detail.value.update();
        if (res) {
          router.back();
        }
      }
      break;
  }
};
const cancel = () => {
  router.back();
};
const init = async () => {
  const ds = await Datasource.list();
  sources.splice(0);
  sources.push(...ds);
  const mode = route.query.mode as 'create' | 'update';
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
<style lang="scss" scoped>
$prefix-class: 'watcher-detail';
.#{$prefix-class} {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  &-form {
    flex: auto;
    overflow: hidden auto;
    padding: 16px;
  }
  &-row {
    display: flex;
    &:not(:first-child) {
      margin-top: 16px;
    }
  }
  &-prop {
    &:nth-child(n) {
      flex: 1;
    }
    &:not(:first-child) {
      margin-left: 8px;
    }
    &[type='textarea'] {
      min-height: 320px;
      max-height: 640px;
      resize: vertical;
      white-space: pre;
    }
    md-select-option {
      > label {
        display: flex;
        align-items: center;
      }
    }
  }
  &-foot {
    flex: none;
    padding: 16px;
    display: flex;
    justify-content: flex-end;
    &-btn {
      margin-left: 8px;
    }
  }
}
</style>
