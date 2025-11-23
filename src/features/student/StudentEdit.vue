<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 mx-auto my-20">
    <div class="avatar flex justify-center ">
      <div class="w-24 rounded-full ">
        <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
      </div>
    </div>

    <div class="input flex items-center justify-center gap-2 mx-auto my-2">
      <label class="label">Name</label>
      <input type="text" v-model="name" class="grow" />
    </div>

    <select class="select mx-auto my-2" v-model="gender">
      <option disabled selected>Choose Gender</option>
      <option>Female</option>
      <option>Male</option>
    </select>

    <button class="btn btn-neutral mt-4">Update Profile</button>

  </fieldset>
</template>

<script setup>
import { ref } from 'vue';

const gender = ref('Female');
const name = ref('JinLing');

</script>
