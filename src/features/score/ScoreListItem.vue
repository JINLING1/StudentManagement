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
      <button class="btn btn-error btn-sm" @click="deleteScore(scoreItem.id)">delete</button>
    </td>
  </tr>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { storeToRefs } from 'pinia';
import { useMutation } from '@tanstack/vue-query';
import { useUserStore } from '@/stores/user';
import { deleteScore as deleteScoreApi } from '@/services/apiScore';

const userStore = useUserStore();
const { isStudent } = storeToRefs(userStore);
const router = useRouter();
const toast = useToast();
defineProps(['scoreItem', 'currentStudent']);

const emit = defineEmits(['scoreDeleted']);

const { mutate: deleteScore } = useMutation({
  mutationFn: (scoreId) => deleteScoreApi(scoreId),
  onSuccess: () => {
    toast.success('Score deleted successfully');
    emit('scoreDeleted');
  },
  onError: (error) => {
    toast.error(error.message);
  }
});



</script>
