<template>
  <div class="my-4 flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-2 items-center">
    <section class="flex flex-wrap gap-2 justify-center w-full md:col-span-1">
      <Condition v-for="(condition, idx) in studentSearchCondition" :onDelete='() => onDelete(idx)' :key="idx"
        v-if="isStudentList">
        {{ condition }}
      </Condition>
      <Condition v-for="(condition, idx) in scoreSearchCondition" :onDelete='() => onDelete(idx)' :key="idx"
        v-if="!isStudentList">
        {{ condition }}
      </Condition>
    </section>
    <div class="w-full md:col-span-3 flex flex-row items-center gap-2 px-2 md:px-0 md:grid md:grid-cols-3">
      <div class="flex-grow md:col-span-2 flex md:justify-center">
        <label class="input w-full md:w-md">
          <svg class="h-[1em] opacity-50 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            @click="onSearch">
            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search" v-model="searchString" class="grow w-full" />
        </label>
      </div>
      <div class="shrink-0 md:col-span-1 flex md:justify-center">
        <button class="btn btn-outline btn-primary btn-md w-full md:w-auto" @click="onClick" v-if="!isStudent">
          {{ route.name === 'score' ? 'Upload Score' : 'Add Student' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useSearchStore } from '@/stores/search';
import Condition from './Condition.vue';

const searchString = ref('');
const isStudentList = computed(() => route.name === 'student');
const toast = useToast();

const userStore = useUserStore();
const searchStore = useSearchStore();
const { isStudent } = storeToRefs(userStore);
const { studentSearchCondition, scoreSearchCondition } = storeToRefs(searchStore);

const route = useRoute();
const router = useRouter();

function onClick() {
  if (route.name === 'score') {
    router.push({ name: 'score-upload' });
  } else {
    router.push({ name: 'student-add' });
  }
}

function onSearch() {
  if (!searchString.value) {
    toast.warning('Please input search string');
    return;
  }
  if (isStudentList.value) {
    studentSearchCondition.value = [...studentSearchCondition.value, searchString.value.toLowerCase()];

  } else {
    scoreSearchCondition.value = [...scoreSearchCondition.value, searchString.value.toLowerCase()];
  }
  searchString.value = '';
}

function onDelete(idx) {
  if (isStudentList.value) {
    studentSearchCondition.value.splice(idx, 1);
  } else {
    scoreSearchCondition.value.splice(idx, 1);
  }
}
</script>
