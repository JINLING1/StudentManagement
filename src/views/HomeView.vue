<template>
  <NavBar />
  <ToolBar v-show="routeName === 'score' || routeName === 'student'" />
  <RouterView />
</template>

<script setup>
import NavBar from '@/ui/NavBar.vue';
import ToolBar from '@/ui/ToolBar.vue';
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();
const routeName = computed(() => route.name)
</script>
