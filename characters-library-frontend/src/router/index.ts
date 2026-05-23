import { createRouter, createWebHistory } from 'vue-router'
import CharactersView from '@/pages/CharactersView.vue'
import Test from '@/pages/Test.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'characters',
      component: CharactersView,
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
    },
  ],
})

export default router
