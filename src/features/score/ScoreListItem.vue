<template>
  <tr>
    <td>{{ scoreItem.name }}</td>
    <td>{{ scoreItem.class }}</td>
    <td>{{ scoreItem.subject }}</td>
    <td>{{ scoreItem.semester }}</td>
    <td>{{ scoreItem.score }}</td>
    <td>
      <button class="btn btn-ghost btn-sm"
        @click="router.push({ name: 'score-edit', params: { id: scoreItem.id } })">details</button>
      <button class="btn btn-error btn-sm">delete</button>
    </td>
  </tr>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
defineProps(['scoreItem']);
</script>
