<template>
  <div class="container">
    <header class="head">
      <md-icon class="toggle-sider" @click="toggleSider" filled>settings</md-icon>
      <!-- <md-filled-icon-button class="toggle-sider" @click="toggleSider">
        <md-icon filled>settings</md-icon>
      </md-filled-icon-button> -->
    </header>
    <div class="body">
      <div :class="['sider', { actived: sider.show }]">
        <md-list class="sider-list">
          <template v-for="route in routes">
            <md-list-item>
              <RouterLink :to="route.path">{{ route?.meta?.title || route.path }}</RouterLink>
              <!-- <div slot="headline">
              </div> -->
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
import '@material/web/icon/icon';
import '@material/web/iconbutton/filled-icon-button';
import '@material/web/list/list';
import '@material/web/list/list-item';
import { reactive } from 'vue';
const sider = reactive({
  show: false,
});
const toggleSider = () => {
  sider.show = !sider.show;
};
</script>
<style lang="scss" scoped>
$sider-width: 160px;
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
    color: var(--md-sys-color-on-primary);
    background-color: var(--md-sys-color-primary);
    .toggle-sider {
      cursor: pointer;
      // &:hover {
      //   filter: brightness(1.5);
      // }
    }
  }
  .body {
    flex: 1;
    display: flex;
    overflow: hidden;
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
      // height: calc(100% - 32px);
      overflow: hidden;
    }
  }
}
</style>
