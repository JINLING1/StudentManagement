<template>
  <Form class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto my-20" @submit="onSubmit"
    :validation-schema="validationSchema">
    <legend class="fieldset-legend mx-auto text-3xl">SunShiune</legend>

    <label class="label">Email</label>
    <Field name="email" type="email" class="input" placeholder="Email" v-model="email" />
    <ErrorMessage name="email" class="text-red-500" />

    <label class="label">Password</label>
    <Field name="password" type="password" class="input" placeholder="Password" v-model="password" />
    <ErrorMessage name="password" class="text-red-500" />

    <label class="label">Confirm Password</label>
    <Field name="confirmPassword" type="password" class="input" placeholder="Confirm Password"
      v-model="confirmPassword" />
    <ErrorMessage name="confirmPassword" class="text-red-500" />

    <button class="btn btn-neutral mt-4" :disabled="isLoading">Sign Up</button>
    <button class="btn btn-ghost mt-4" @click="router.push({ name: 'login' })" type="button"
      :disabled="isLoading">Login</button>
  </Form>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { signup as signupApi } from '@/services/apiAuth.js';
import { createTeacher as createTeacherApi } from '@/services/apiTeacher.js'
import { useToast } from 'vue-toastification';
import { useMutation } from '@tanstack/vue-query';

const router = useRouter();
const toast = useToast();
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confirmPassword: yup.string().required().min(6).oneOf([yup.ref('password')], 'Passwords must match'),

});

const { mutate: createTeacher, isPending: isCreating } = useMutation({
  mutationFn: createTeacherApi,
  onSuccess: (userData) => {
    createTeacher({ teacher_id: userData.user.id });
  },
  onError: (error) => {
    toast.error(error.message);
  }
})

const { mutate: signup, isPending: isSigning } = useMutation({
  mutationFn: ({ email, password }) => signupApi(email, password),
  onSuccess: () => {
    toast.success('Signup successful');
    router.push({ name: 'login' });
  },
  onError: (error) => {
    toast.error(error.message);
  }
})

const isLoading = computed(() => isSigning.value || isCreating.value);

function onSubmit() {
  signup({ email: email.value, password: password.value });
}
</script>
