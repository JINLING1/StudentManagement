<template>
  <div class="my-4 grid  grid-cols-4 gap-2">
    <section class=" mx-auto col-span-1">
      <div class="badge badge-outline mx-1 badge-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill='none' viewBox=" 0 0 24 24"
          class="inline-block h-4 w-4 stroke-current cursor-pointer transition-transform transform hover:scale-125">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width=" 2" d=" M6 18L18 6M6 6l12 12">
          </path>
        </svg>
        Info
      </div>
    </section>
    <div class="col-span-2 mx-auto">
      <label class="input w-md">
        <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" required placeholder="Search" />
      </label>
    </div>
    <div class="col-span-1 text-center">
      <button class="btn btn-outline btn-primary  btn-md" @click="onClick">
        {{ route.name === 'score' ? 'Upload Score' : 'Add Student' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

function onClick() {
  if (route.name === 'score') {
    router.push({ name: 'score-upload' });
  } else {
    router.push({ name: 'student-add' });
  }
}
</script>
