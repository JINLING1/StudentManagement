<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 mx-auto my-20">
    <div class="input flex items-center justify-center gap-2 mx-auto my-2">
      <label class="label">Email</label>
      <input type="text" v-model="email" class="grow" />
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
    <button class="btn btn-neutral mt-4" @click="onClick">Add Student</button>

  </fieldset>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useUserStore } from '@/stores/user.js';
import { getTeacherByTeacherId } from '@/services/apiTeacher';
import { addStudent } from '@/services/apiStudent';
import { signup } from '@/services/apiAuth.js';


const email = ref('someone@example.com');
const name = ref('JinLing');
const gender = ref('female');
const classInfo = ref('Class X| Year X');
const classInChargeArr = ref([]);
const teacherId = ref('');

const userStore = useUserStore();
const { user } = storeToRefs(userStore);


async function onClick() {
  const userData = await signup(email.value, '123456', { isStudent: true });
  const studentId = userData.user.id;
  const students = await addStudent({
    name: name.value,
    class: classInfo.value.split("|")[0],
    grade: classInfo.value.split("|")[1],
    teacher_id: teacherId.value,
    avatar: 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
    student_id: studentId,
  });
  console.log(students);
}


onMounted(async () => {
  teacherId.value = user.value.sub;
  const teachers = await getTeacherByTeacherId(teacherId.value);
  classInChargeArr.value = JSON.parse(teachers[0].class_in_charge);
})
</script>
