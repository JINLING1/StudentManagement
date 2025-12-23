<template>
  <Form class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto my-20" @submit="onSubmit"
    :validation-schema="validationSchema">
    <legend class="fieldset-legend mx-auto text-3xl">SunShine</legend>

    <label class="label">Email</label>
    <Field name="email" type="email" class="input" placeholder="Email" v-model="email" />
    <ErrorMessage name="email" class="text-red-500" />

    <label class="label">Password</label>
    <Field name="password" type="password" class="input" placeholder="Password" v-model="password" />
    <ErrorMessage name="password" class="text-red-500" />

    <button class="btn btn-neutral mt-4">Login</button>

    <div class="grid grid-cols-2 gap-1">
      <label class="label">
        <input type="checkbox" checked="checked" class="checkbox" />
        Remember me
      </label>
      <button class="btn btn-link text-xs" type="button">Forget Password?</button>
    </div>

    <button class="btn btn-ghost mt-4" @click="router.push({ name: 'signup' })" type="button">Sign Up</button>

  </Form>
</template>

<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { login } from '@/services/apiAuth.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

async function onSubmit() {
  const data = await login(email.value, password.value);
  if (data) {
    router.push('/');
  }

}
</script>
