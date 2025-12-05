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
        <StudentListItem v-for="student in studentList" :key="student.id" :student />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import StudentListItem from './StudentListItem.vue';
import { getStudentList } from '@/services/apiStudent';
import { getConfig } from '@/utils/configHelper';
import Loading from '@/ui/Loading.vue';

const studentList = ref([]);
const isLoading = ref(true);
onMounted(async () => {
  isLoading.value = true;
  const token = getConfig('SUPABASE_TOKEN');
  const userToken = JSON.parse(localStorage.getItem(token));

  const teacherId = userToken.user.id;
  studentList.value = await getStudentList(teacherId);
  isLoading.value = false;
});
</script>
