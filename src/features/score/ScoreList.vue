<template>
  <Loading v-show="isLoading" />

  <div class="overflow-x-auto" v-show="!isLoading">
    <table class="table table-md">
      <thead>
        <tr>
          <th>Name</th>
          <th>Class</th>
          <th>Subject</th>
          <th>Semester</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <ScoreListItem v-for="scoreItem in filteredScoreList" :key="scoreItem.id" :scoreItem
          :currentStudent="students.find((student) => student.student_id === scoreItem.student_id)"
          v-if="students.length > 0" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { getScoreList } from '@/services/apiScore';
import { onMounted, ref, computed } from 'vue';
import ScoreListItem from './ScoreListItem.vue';
import { getStudentByStudentId, getStudentList } from '@/services/apiStudent';
import { getUserId } from '@/utils/userHelper';
import Loading from '@/ui/Loading.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isStudent } = storeToRefs(userStore);
const scoreList = ref([]);
const students = ref([]);
const isLoading = ref(true);
const filteredScoreList = computed(() => {
  const userId = getUserId();
  if (isStudent.value) {
    return scoreList.value.filter((scoreItem) => scoreItem.student_id === userId);
  } else {
    return scoreList.value.filter((scoreItem) => students.value.map((student) => student.student_id).includes(scoreItem.student_id));
  };

})

onMounted(async () => {
  isLoading.value = true;
  scoreList.value = await getScoreList();

  const userId = getUserId();
  if (!isStudent.value) {
    students.value = await getStudentList(userId);
  } else {
    const student = await getStudentByStudentId(userId);
    students.value = [student];
  }
  isLoading.value = false;
});


</script>
