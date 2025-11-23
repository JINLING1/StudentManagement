<template>
  <NavBar />
  <ToolBar v-if="route.name === 'score-edit' ? false : true" />
  <RouterView />
</template>

<script setup>
import NavBar from '@/ui/NavBar.vue';
import ToolBar from '@/ui/ToolBar.vue';
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();

</script>
