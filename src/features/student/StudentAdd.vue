<template>
  <Loading v-show="isLoading" />
  <Form class="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 mx-auto my-20" v-show="!isLoading"
    :validation-schema="validationSchema" @submit="onSubmit">
    <div class="input flex items-center justify-center gap-2 mx-auto my-2">
      <label class="label">Email</label>
      <Field name="email" type="email" v-model="email" class="grow" />
      <ErrorMessage name="email" class="text-red-500 text-xs absolute -bottom-5 left-2" />
    </div>
    <div class="input flex items-center justify-center gap-2 mx-auto my-2">
      <label class="label">Name</label>
      <input type="text" v-model="name" class="grow" />
    </div>
    <select class="select mx-auto my-2" v-model="classInfo">
      <option disabled selected>Choose Class</option>
      <option v-for="classItem in classInChargeArr" :key="classItem" :value="classItem">
        Class {{ classItem.split("|")[0] }} | Year {{ classItem.split("|")[1] }}
      </option>
    </select>

    <select class="select mx-auto my-2" v-model="gender">
      <option disabled selected>Choose Gender</option>
      <option>female</option>
      <option>male</option>
    </select>
    <button class="btn btn-neutral mt-4">Add Student</button>

  </Form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

import { useUserStore } from '@/stores/user.js';
import { getTeacherByTeacherId } from '@/services/apiTeacher';
import { addStudent } from '@/services/apiStudent';
import { signup } from '@/services/apiAuth.js';
import Loading from '@/ui/Loading.vue';


const email = ref('someone@example.com');
const name = ref('JinLing');
const gender = ref('female');
const classInfo = ref('Class X| Year X');
const classInChargeArr = ref([]);
const teacherId = ref('');

const router = useRouter();

const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const validationSchema = yup.object({
  email: yup.string().required().email(),
});
console.log(validationSchema);

const toast = useToast();
async function onSubmit() {
  toast.info('Adding...');
  const userData = await signup(email.value, '123456', { isStudent: true });
  // 检查是否注册成功
  if (!userData || !userData.user) {
    toast.clear();
    toast.error('Sign up failed. Please check console for details.');
    return; 
  }
  const studentId = userData.user.id;
  const students = await addStudent({
    name: name.value,
    class: classInfo.value.split("|")[0],
    grade: classInfo.value.split("|")[1],
    gender: gender.value,
    teacher_id: teacherId.value,
    avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
    student_id: studentId,
  });
  console.log(students);
  toast.clear();
  toast.success('Successfully added!');
  router.push({ name: 'student' });
}

const isLoading = ref(true);
onMounted(async () => {
  isLoading.value = true;
  teacherId.value = user.value.sub;
  const teachers = await getTeacherByTeacherId(teacherId.value);
  classInChargeArr.value = JSON.parse(teachers[0].class_in_charge);
  isLoading.value = false;
})
</script>
