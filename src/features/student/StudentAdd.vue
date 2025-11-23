<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 mx-auto my-20">
    <div class="input flex items-center justify-center gap-2 mx-auto my-2">
      <label class="label">Name</label>
      <input type="text" v-model="name" class="grow" />
    </div>
    <div class="input flex items-center justify-center gap-2 mx-auto my-2">
      <label class="label">Class</label>
      <input type="text" class="grow" v-model="classInfo" />
    </div>

    <select class="select mx-auto my-2" v-model="gender">
      <option disabled selected>Choose Gender</option>
      <option>Female</option>
      <option>Male</option>
    </select>
    <button class="btn btn-neutral mt-4">Add Student</button>

  </fieldset>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('JinLing');
const gender = ref('Female');
const classInfo = ref('Class 1|Year 9');
</script>
