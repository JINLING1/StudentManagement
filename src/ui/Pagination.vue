<template>
  <div class="join flex justify-center items-center">
    <button v-for="(_, idx) in new Array(pageCount)"
      :class="`join-item btn btn-lg ${idx + 1 == currentPage ? 'btn-disabled' : ''}`"
      @click="handleChangePage(idx + 1)">{{ idx + 1
      }}</button>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
defineProps(['currentPage', 'pageCount']);
const router = useRouter();
function handleChangePage(page) {
  router.push({ query: { page } });
}
</script>