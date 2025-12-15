<template>
  <tr>
    <td>{{ currentStudent.name }}</td>
    <td>{{ `Class ${currentStudent.class} | Year ${currentStudent.grade}` }}</td>
    <td>{{ scoreItem.subject }}</td>
    <td>{{ scoreItem.semesterSeason }} {{ scoreItem.semesterYear }}</td>
    <td>{{ scoreItem.score }}</td>
    <td v-if="!isStudent">
      <button class="btn btn-ghost btn-sm"
        @click="router.push({ name: 'score-edit', params: { id: scoreItem.id } })">details</button>
      <button class="btn btn-error btn-sm">delete</button>
    </td>
  </tr>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { isStudent } = storeToRefs(userStore);
const router = useRouter();
defineProps(['scoreItem', 'currentStudent']);
</script>
