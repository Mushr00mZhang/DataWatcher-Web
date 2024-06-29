<template>
  <div class="container">
    <header class="head">
      <md-icon class="toggle-sider" @click="toggleSider">settings</md-icon>
    </header>
    <div class="body">
      <div :class="['sider', { actived: sider.show }]">
        <md-list class="sider-list">
          <template v-for="route in routes">
            <md-list-item>
              <div slot="headline">
                <RouterLink :to="route.path">{{ route?.meta?.title || route.path }}</RouterLink>
              </div>
            </md-list-item>
          </template>
        </md-list>
      </div>
      <div class="main">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
import { routes } from '@/router';
import '@material/web/list/list';
import '@material/web/list/list-item';
import '@material/web/icon/icon';
import { reactive } from 'vue';
const sider = reactive({
  show: false,
});
const toggleSider = () => {
  sider.show = !sider.show;
};
</script>
<style lang="scss" scoped>
$sider-width: 200px;
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .head {
    flex: none;
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    padding: 4px;
    .toggle-sider {
      cursor: pointer;
      &:hover {
        filter: brightness(1.5);
      }
    }
  }
  .body {
    flex: 1;
    display: flex;
    .sider {
      flex: none;
      width: 0;
      height: 100%;
      transition: width 0.2s linear;
      overflow: hidden;
      &.actived {
        width: $sider-width;
      }
      .sider-list {
        width: $sider-width;
        height: 100%;
        overflow: hidden auto;
      }
    }
    .main {
      flex: 1;
      width: 100%;
      height: calc(100% - 32px);
      overflow: hidden;
    }
  }
}
</style>
