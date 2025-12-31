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
        <StudentListItem v-for="student in filteredStudentListBySearch" :key="student.id" :student />
      </tbody>
    </table>
  </div>
  <Pagination :currentPage :pageCount />
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import StudentListItem from './StudentListItem.vue';
import { getStudentListWithLimit as getStudentListWithLimitApi, getStudentListCount as getStudentListCountApi } from '@/services/apiStudent';
import { getConfig } from '@/utils/configHelper';
import Loading from '@/ui/Loading.vue';
import { useSearchStore } from '@/stores/search';
import { storeToRefs } from 'pinia';
import Pagination from '@/ui/Pagination.vue';
import { useRouter, useRoute } from 'vue-router';
import { getUserId } from '@/utils/userHelper';
import { useMutation } from '@tanstack/vue-query';
import { useToast } from 'vue-toastification';



const toast = useToast();

const studentList = ref([]);


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

const router = useRouter();
const route = useRoute();
const currentPage = ref(route.query.page || 1);
const pageSize = ref(Number(getConfig('PAGE_SIZE')));//每页大小
const pageCount = computed(() => {
  return Math.ceil(studentCount.value / pageSize.value);
});
const studentCount = ref(0);


//后端分页
function fetchData() {
  const teacherId = getUserId();
  getStudentListWithLimit({ teacherId, currentPage: currentPage.value, pageSize: pageSize.value });
}

const { mutate: getStudentListWithLimit, isPending: isStudentListLoading } = useMutation({
  mutationFn: ({ teacherId, currentPage, pageSize }) => getStudentListWithLimitApi(teacherId, currentPage, pageSize),
  onSuccess: (studentListData) => {
    studentList.value = studentListData;
  },
  onError: (error) => {
    toast.error(error.message);
  }
})

const { mutate: getStudentListCount, isPending: isCounting } = useMutation({
  mutationFn: () => getStudentListCountApi(getUserId()),
  onSuccess: (studentCountData) => {
    studentCount.value = studentCountData;
  },
  onError: (error) => {
    toast.error(error.message);
  }
})

const isLoading = computed(() => isStudentListLoading.value || isCounting.value);

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

onMounted(() => {
  router.push({ query: { page: currentPage.value } });
  fetchData();
  getStudentListCount();
});


</script>
