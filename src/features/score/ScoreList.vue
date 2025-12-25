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
        <ScoreListItem v-for="scoreItem in filteredScoreListByPage" :key="scoreItem.id" :scoreItem
          :currentStudent="students.find((student) => student.student_id === scoreItem.student_id)"
          v-if="students.length > 0" />
      </tbody>
    </table>
  </div>
  <Pagination :currentPage :pageCount />
</template>

<script setup>
import { getScoreList } from '@/services/apiScore';
import { onMounted, ref, computed, watch } from 'vue';
import ScoreListItem from './ScoreListItem.vue';
import { getStudentByStudentId, getStudentList } from '@/services/apiStudent';
import { getUserId } from '@/utils/userHelper';
import Loading from '@/ui/Loading.vue';
import { useUserStore } from '@/stores/user';
import { useSearchStore } from '@/stores/search';
import { storeToRefs } from 'pinia';
import Pagination from '@/ui/Pagination.vue';
import { useRouter } from 'vue-router';
import { getConfig } from '@/utils/configHelper';
import { useRoute } from 'vue-router';

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

const router = useRouter();
const route = useRoute();
const currentPage = ref(route.query.page || 1);
const pageSize = ref(Number(getConfig('PAGE_SIZE')));
const pageCount = computed(() =>
  Math.ceil(filteredScoreListBySearch.value.length / pageSize.value)//向上取整
);

watch(
  () => currentPage.value,
  () => {
    router.push({ query: { page: currentPage.value } });
  }
);
watch(
  () => route.query.page,
  (newPage) => {
    currentPage.value = newPage;
  }
);

//前端分页
const filteredScoreListByPage = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = currentPage.value * pageSize.value;
  return filteredScoreListBySearch.value.slice(startIndex, endIndex);
});

const searchStore = useSearchStore();
const { scoreSearchCondition } = storeToRefs(searchStore);
const filteredScoreListBySearch = computed(() => {
  if (!scoreSearchCondition.value.length) {
    return filteredScoreList.value;
  }

  return filteredScoreList.value.filter((scoreItem) => {
    const scoreInfoJSON = JSON.stringify([
      scoreItem.subject.toLowerCase(),
      scoreItem.semesterYear,
      scoreItem.semesterSeason.toLowerCase(),
      scoreItem.score,
    ]);

    for (const condition of scoreSearchCondition.value) {
      if (!scoreInfoJSON.includes(condition)) {
        return false;
      }
    }
    return true;
  });
});

onMounted(async () => {
  router.push({ query: { page: currentPage.value } });
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
