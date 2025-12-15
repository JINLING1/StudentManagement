<template>
  <div class="navbar bg-base-300 shadow-sm">
    <div class="navbar-start">
      <!-- dropdown menu for mobile  -->
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul tabindex="-1" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li><a @click="router.push({ name: 'score' })" :class="route.name === 'score' ? 'menu-active' : ''">Score</a>
          </li>
          <li><a @click="router.push({ name: 'student' })"
              :class="route.name === 'student' ? 'menu-active' : ''">Student</a>
          </li>
        </ul>
      </div>
      <a @click="router.push('/')" class="btn btn-ghost text-xl">Sunshine</a>
    </div>
    <!-- navigation menu for desktop -->
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1" v-if="!isStudent">
        <li><a @click="router.push({ name: 'score' })" :class="route.name === 'score' ? 'menu-active' : ''">Score</a>
        </li>
        <li><a @click="router.push({ name: 'student' })"
            :class="route.name === 'student' ? 'menu-active' : ''">Student</a>
        </li>
      </ul>
    </div>
    <!-- avatar -->
    <div class="navbar-end">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" :src="user.avatar" />
          </div>
        </div>
        <ul tabindex="-1" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <a class="justify-between" @click="router.push({ name: 'info' })">
              Profile
            </a>
          </li>
          <li><a @click="onClick">Logout</a></li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { signout } from '@/services/apiAuth.js';
import { useUserStore } from '@/stores/user';
import { getConfig } from '@/utils/configHelper';


const route = useRoute();
const router = useRouter();

const userStore = useUserStore();

const { updateUser } = userStore;
const { user, isStudent } = storeToRefs(userStore);

async function onClick() {
  await signout();
  router.push({ name: 'login' });
}

// 所有界面（除了登录页）都有此组件，因此在 NavBar mounted 时更新用户头像
onMounted(() => {
  const token = getConfig('SUPABASE_TOKEN');
  const userToken = JSON.parse(localStorage.getItem(token));
  const userMetadata = userToken?.user?.user_metadata;
  updateUser(userMetadata);
})
</script>
