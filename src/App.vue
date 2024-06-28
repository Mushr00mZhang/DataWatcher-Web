<template>
  <md-list>
    <template v-for="route in routes">
      <md-list-item>
        <RouterLink :to="route.path">{{ route?.meta?.title || route.path }}</RouterLink>
      </md-list-item>
    </template>
  </md-list>
  <RouterView />
</template>
<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
import { routes } from '@/router';
import '@material/web/list/list';
import '@material/web/list/list-item';
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
