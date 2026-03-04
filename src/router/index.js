import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { supabase } from '@/utils/supabase.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home/score?page=1',
    },
    {
      path: '/home',
      component: () => import('@/views/HomeView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          redirect: '/home/score?page=1',
        },
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
              meta: { requiresTeacher: true },
            },
            {
              path: 'upload',
              name: 'score-upload',
              component: () => import('@/features/score/ScoreUpload.vue'),
              meta: { requiresTeacher: true },
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
              meta: { requiresTeacher: true },
            },
            {
              path: ':id',
              name: 'student-edit',
              component: () => import('@/features/student/StudentEdit.vue'),
              meta: { requiresTeacher: true },
            },
            {
              path: 'add',
              name: 'student-add',
              component: () => import('@/features/student/StudentAdd.vue'),
              meta: { requiresTeacher: true },
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
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/ui/PageNotFound.vue'),
    },
  ],
})

let isFirstRouteCheck = true

router.beforeEach(async (to, from, next) => {
  if (isFirstRouteCheck) {
    const isRememberMe = localStorage.getItem('isRememberMe') === 'true'
    const hasTabSession = sessionStorage.getItem('tabSession')

    //若没有勾选Remember me，且是新开的标签页，则强制清除登录状态
    if (!isRememberMe && !hasTabSession) {
      await supabase.auth.signOut()
    }
    //打上标签页存活标记，防止 F5 刷新被误判为新标签页
    sessionStorage.setItem('tabSession', 'active')
    isFirstRouteCheck = false
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session && to.name !== 'login' && to.name !== 'signup') {
    return next({ name: 'login' })
  }

  let isStudent = false

  if (session && session.user) {
    isStudent = session.user.user_metadata?.isStudent === true
    const userStore = useUserStore()
    userStore.updateUser(session.user.user_metadata)
  }

  if (to.meta.requiresTeacher) {
    if (isStudent) {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
