import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/score',
    },
    {
      path: '/score',
      name: 'score',
      component: () => import('@/features/score/ScoreList.vue'),
    },
    {
      path: '/student',
      name: 'student',
      component: () => import('@/features/student/StudentList.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/features/auth/Login.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/features/auth/Signup.vue'),
    },
  ],
})

export default router
