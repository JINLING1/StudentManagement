<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto my-20">
    <legend class="fieldset-legend mx-auto text-3xl">SunShiune</legend>

    <label class="label">Email</label>
    <input type="email" class="input" placeholder="Email" v-model="email" />

    <label class="label">Password</label>
    <input type="password" class="input" placeholder="Password" v-model="password" />

    <label class="label">Confirm Password</label>
    <input type="password" class="input" placeholder="Confirm Password" v-model="confirmPassword" />

    <button class="btn btn-neutral mt-4" @click="onClick">Sign Up</button>
    <button class="btn btn-ghost mt-4" @click="router.push({ name: 'login' })">Login</button>
  </fieldset>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { signup } from '@/services/apiAuth.js';
import { createTeacher } from '@/services/apiTeacher.js'

const router = useRouter();
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

async function onClick() {
  const data = await signup(email.value, password.value);
  console.log(data);

  const teacherId = data.user.id;
  await createTeacher({ teacher_id: teacherId });
}
</script>
