<template>
  <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto my-20">
    <legend class="fieldset-legend mx-auto text-3xl">SunShiune</legend>

    <label class="label">Email</label>
    <input type="email" class="input" placeholder="Email" v-model="email" />

    <label class="label">Password</label>
    <input type="password" class="input" placeholder="Password" v-model="password" />

    <button class="btn btn-neutral mt-4" @click="onClick">Login</button>

    <div class="grid grid-cols-2 gap-1">
      <label class="label">
        <input type="checkbox" checked="checked" class="checkbox" />
        Remember me
      </label>
      <button class="btn btn-link text-xs">Forget Password?</button>
    </div>

    <button class="btn   mt-4" @click="router.push({ name: 'signup' })">Sign Up</button>

  </fieldset>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '@/services/apiAuth.js';
import { useRouter } from 'vue-router';
const router = useRouter();
const email = ref('');
const password = ref('');

async function onClick() {
  const data = await login(email.value, password.value);
  if (data) {
    router.push('/');
  }

}
</script>
