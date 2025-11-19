import { createRouter, createWebHistory } from 'vue-router'
import ScoreList from '@/features/score/ScoreList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'score',
      component: ScoreList,
    },
    {},
  ],
})

export default router
