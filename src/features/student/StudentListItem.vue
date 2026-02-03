<template>
  <tr>
    <td>
      <div class="flex items-center gap-3">
        <div class="avatar">
          <div class="mask mask-squircle h-12 w-12">
            <img :src="student.avatar" alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
        <!-- name and gender -->
        <div>
          <div class="font-bold">{{ student.name }}</div>
          <div class="text-sm opacity-50">{{ student.gender }}</div>
        </div>
      </div>
    </td>
    <!-- class and teacher -->
    <td>
      class{{ student.class }}|grade{{ student.grade }}
    </td>
    <th>
      <button class="btn btn-ghost btn-sm"
        @click="router.push({ name: 'student-edit', params: { id: student.student_id } })">details</button>
      <button class="btn btn-error btn-sm" @click="deleteStudent(student.student_id)">delete</button>
    </th>
  </tr>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useMutation } from '@tanstack/vue-query';
import { deleteStudent as deleteStudentApi } from '@/services/apiStudent';

const router = useRouter();
defineProps(['student']);
const toast = useToast();
const emit = defineEmits(['studentDeleted']);

const { mutate: deleteStudent } = useMutation({
  mutationFn: (studentId) => deleteStudentApi(studentId),
  onSuccess: () => {
    toast.success('Student deleted successfully');
    emit('studentDeleted');
  },
  onError: (error) => {
    toast.error(error.message);
  }
});
</script>
