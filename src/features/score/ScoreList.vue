<template>
  <div class="overflow-x-auto">
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
        <ScoreListItem v-for="scoreItem in scoreList" :key="scoreItem.id" :score-item />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { getScoreList } from '@/services/apiScore';
import { onMounted, ref } from 'vue';
import ScoreListItem from './ScoreListItem.vue';

const scoreList = ref([]);
onMounted(() => {
  scoreList.value = getScoreList();
});
</script>
