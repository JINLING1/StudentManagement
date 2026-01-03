<template>
  <Loading v-show="isLoading" />

  <div class="overflow-x-auto " v-show="!isLoading">
    <table class="table table-md">
      <thead>
        <tr>
          <th>Name</th>
          <th>Class</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <StudentListItem v-for="student in filteredStudentListByPage" :key="student.id" :student />
      </tbody>
    </table>
  </div>

  <Pagination :currentPage :pageCount />
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useMutation } from '@tanstack/vue-query';

import StudentListItem from './StudentListItem.vue';
import { getStudentList as getStudentListApi } from '@/services/apiStudent.js';
import { getConfig } from '@/utils/configHelper.js';
import { getUserId } from '@/utils/userHelper.js';
import Loading from '@/ui/Loading.vue';
import Pagination from '@/ui/Pagination.vue';
import { useSearchStore } from '@/stores/search.js';

const toast = useToast();
const router = useRouter();
const route = useRoute();

const studentList = ref([]);
const teacherId = getUserId();

const { mutate: getStudentList, isPending: isStudentListLoading } = useMutation({
  mutationFn: ({ teacherId }) => getStudentListApi(teacherId),
  onSuccess: (studentListData) => {
    studentList.value = studentListData;
  },
  onError: (error) => {
    toast.error(error.message);
  }
})

const searchStore = useSearchStore();
const { studentSearchCondition } = storeToRefs(searchStore);

//搜索条件过滤学生列表
const filteredStudentListBySearch = computed(() => {
  if (!studentSearchCondition.value) {
    return studentList.value;
  }

  const conditions = studentSearchCondition.value.map(condition => condition.toLowerCase());

  return studentList.value.filter((student) => {
    const fieldToSearch = [
      student.name,
      student.gender,
      student.class,
      student.grade
    ];
    return conditions.every(condition =>
      fieldToSearch.some(field =>
        String(field).toLowerCase().includes(condition)
      )
    );
  })
});

const currentPage = ref(route.query.page || 1);
const pageSize = ref(Number(getConfig('PAGE_SIZE')));//每页大小

const pageCount = computed(() => {
  return Math.ceil(filteredStudentListBySearch.value.length / pageSize.value);
});

const filteredStudentListByPage = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = currentPage.value * pageSize.value;
  return filteredStudentListBySearch.value.slice(startIndex, endIndex);
});

const isLoading = computed(() => isStudentListLoading.value);

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

onMounted(() => {
  router.push({ query: { page: currentPage.value } });
  getStudentList({ teacherId });
});

</script>
