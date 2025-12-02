<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 mx-auto my-20">
    <select class="select mx-auto my-2" v-model="currentStudent">
      <option disabled selected>Choose Student</option>
      <option v-for="(student, idx) in students" :key="idx" :value="student">{{ student.name }}</option>
    </select>
    <div class="input flex items-center justify-center gap-2 mx-auto my-2">
      <label class="label">Student ID</label>
      <input type="text" :value="currentStudent.student_id" class="grow" disabled />
    </div>
    <div class="input flex items-center justify-center gap-2 mx-auto my-2">
      <label class="label">Class</label>
      <input type="text" class="grow" :value="`Class ${currentStudent.class} | Year ${currentStudent.grade}`"
        disabled />
    </div>
    <div class="input flex items-center justify-center gap-2 mx-auto my-2">
      <label class="label">Score</label>
      <input type="number" class="grow" v-model="score" min="0" max="100" />
    </div>

    <select class="select mx-auto my-2" v-model="subject">
      <option disabled selected>Choose Subject</option>
      <option>Math</option>
      <option>English</option>
      <option>History</option>
      <option>Physics</option>
      <option>Chemistry</option>
      <option>Biology</option>
      <option>Geography</option>
    </select>
    <div class=" grid grid-cols-2  w-full">
      <select class="select mx-auto my-2 w-5/6" v-model="semesterYear">
        <option disabled>Choose Semester Year</option>
        <option v-for="year in yearList" :key="year">{{ year }}</option>
      </select>
      <select class="select mx-auto my-2 w-5/6" v-model="semesterSeason">
        <option disabled>Choose Semester Season</option>
        <option>Spring</option>
        <option>Fall</option>
      </select>
    </div>
    <button class="btn btn-neutral mt-4" @click="onClick">Update Score</button>

  </fieldset>
</template>

<script setup>
import { createScore } from '@/services/apiScore';
import { getStudentList } from '@/services/apiStudent';
import { getConfig } from '@/utils/configHelper';
import { ref, onMounted } from 'vue';

const currentStudent = ref({
  name: 'someone',
  student_id: '999',
  class: 'x',
  grade: 'x',
})
const students = ref([]);
const score = ref(0);
const subject = ref('Math');
const semesterSeason = ref('Spring');
const semesterYear = ref(new Date().getFullYear());

const yearList = Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => 2000 + i);

async function onClick() {
  const newScore = {
    student_id: currentStudent.value.student_id,
    subject: subject.value,
    score: score.value,
    semesterSeason: semesterSeason.value,
    semesterYear: semesterYear.value,
  };

  const scores = await createScore(newScore);
  console.log(scores);
}

onMounted(async () => {
  const token = getConfig('SUPABASE_TOKEN');
  const userToken = JSON.parse(localStorage.getItem(token));

  const teacherId = userToken.user.id;
  students.value = await getStudentList(teacherId);

  currentStudent.value = students.value[0];
})

</script>
