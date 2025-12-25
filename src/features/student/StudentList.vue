<template>
  <Loading v-show="isLoading" />

  <div class="overflow-x-auto" v-show="!isLoading">
    <table class="table table-md">
      <!-- head -->
      <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th>
          <th>Name</th>
          <th>Class</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <StudentListItem v-for="student in filteredStudentList" :key="student.id" :student />
      </tbody>
    </table>
  </div>
  <Pagination :currentPage :pageCount />
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import StudentListItem from './StudentListItem.vue';
import { getStudentListWithLimit, getStudentListCount } from '@/services/apiStudent';
import { getConfig } from '@/utils/configHelper';
import Loading from '@/ui/Loading.vue';
import { useSearchStore } from '@/stores/search';
import { storeToRefs } from 'pinia';
import Pagination from '@/ui/Pagination.vue';
import { useRouter, useRoute } from 'vue-router';
import { getUserId } from '@/utils/userHelper';



const studentList = ref([]);
const isLoading = ref(true);

const searchStore = useSearchStore();
const { studentSearchCondition } = storeToRefs(searchStore);

//搜索条件过滤学生列表
const filteredStudentList = computed(() => {
  return studentList.value.filter((student) => {
    const studentInfoJSON = JSON.stringify([student.name.toLowerCase(), student.gender, student.class, student.grade]);
    for (const condition of studentSearchCondition.value) {
      if (!studentInfoJSON.includes(condition)) {
        return false;
      }
    }

    return true;
  });
});

const router = useRouter();
const route = useRoute();
const currentPage = ref(route.query.page || 1);
const pageSize = ref(Number(getConfig('PAGE_SIZE')));//每页大小
const pageCount = computed(() => {
  return Math.ceil(studentCount.value / pageSize.value);
});
const studentCount = ref(0);

watch(
  () => currentPage.value,
  () => {
    fetchData();
    router.push({ query: { page: currentPage.value } });
  }
);
watch(
  () => route.query.page,
  (newPage) => {
    currentPage.value = newPage;
  }
);

//后端分页
async function fetchData() {
  isLoading.value = true;
  const token = getConfig('SUPABASE_TOKEN');
  const userToken = JSON.parse(localStorage.getItem(token));

  const teacherId = userToken.user.id;
  studentList.value = await getStudentListWithLimit(teacherId, currentPage.value, pageSize.value);
  isLoading.value = false;
}

onMounted(async () => {
  const userId = getUserId();
  router.push({ query: { page: currentPage.value } });
  fetchData();
  studentCount.value = await getStudentListCount(userId);
});


</script>
