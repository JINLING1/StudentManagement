<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 mx-auto my-20">
    <legend class="fieldset-legend mx-auto text-3xl pt-15">Alex </legend>

    <div class="input flex items-center justify-center gap-2 mx-auto my-2">
      <label class="label">Class</label>
      <input type="email" class="grow" value="Class 1|Year 9" disabled />
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
    <button class="btn btn-neutral mt-4">Update Score</button>

  </fieldset>
</template>

<script setup>
import { ref } from 'vue';

const score = ref(0);
const subject = ref('Math');
const semesterSeason = ref('Spring');
const semesterYear = ref(new Date().getFullYear());

const yearList = Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => 2000 + i);

</script>
