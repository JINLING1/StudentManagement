import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home/score',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      children: [
        {
          path: 'score',
          children: [
            {
              path: '',
              name: 'score',
              component: () => import('@/features/score/ScoreList.vue'),
            },
            {
              path: ':id', //路由参数
              name: 'score-edit',
              component: () => import('@/features/score/ScoreEdit.vue'),
            },
            {
              path: 'upload',
              name: 'score-upload',
              component: () => import('@/features/score/ScoreUpload.vue'),
            },
          ],
        },
        {
          path: 'student',
          children: [
            {
              path: '',
              name: 'student',
              component: () => import('@/features/student/StudentList.vue'),
            },
            {
              path: ':id',
              name: 'student-edit',
              component: () => import('@/features/student/StudentEdit.vue'),
            },
            {
              path: 'add',
              name: 'student-add',
              component: () => import('@/features/student/StudentAdd.vue'),
            },
          ],
        },
        {
          path: 'info',
          name: 'info',
          component: () => import('@/features/user/Info.vue'),
        },
      ],
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
