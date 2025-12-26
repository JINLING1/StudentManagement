<template>
  <main class="flex items-center justify-center flex-col min-h-screen gap-5">
    <h1 class="text-4xl font-bold  text-red-500">404 Not Found</h1>
    <button class="btn btn-primary btn-lg" @click="router.push('/')">Back To Home</button>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

</script>
