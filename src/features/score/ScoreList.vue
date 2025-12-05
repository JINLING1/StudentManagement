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
          :currentStudent="students.find((student) => student.student_id === scoreItem.student_id)" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { getScoreList } from '@/services/apiScore';
import { onMounted, ref, computed } from 'vue';
import ScoreListItem from './ScoreListItem.vue';
import { getStudentList } from '@/services/apiStudent';
import { getConfig } from '@/utils/configHelper';
import Loading from '@/ui/Loading.vue';

const scoreList = ref([]);
const students = ref([]);
const isLoading = ref(true);
const filteredScoreList = computed(() => {
  return scoreList.value.filter((scoreItem) =>
    students.value.map((student) => student.student_id).includes(scoreItem.student_id)
  );
})

onMounted(async () => {
  isLoading.value = true;
  scoreList.value = await getScoreList();

  const token = getConfig('SUPABASE_TOKEN');
  const userToken = JSON.parse(localStorage.getItem(token));
  const teacherId = userToken.user.id;
  students.value = await getStudentList(teacherId);
  isLoading.value = false;
});


</script>
