<template>
  <NavBar />
  <ToolBar />
  <RouterView />
</template>

<script setup>
import NavBar from '@/ui/NavBar.vue';
import ToolBar from '@/ui/ToolBar.vue';
import { RouterView } from 'vue-router';
</script>
