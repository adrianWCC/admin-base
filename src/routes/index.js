export default [
  {
    path: '/',
    component: () => import('@/Layout/basic.vue'),
    redirect: 'home',
    children: [{
      path: 'home',
      component: () => import('@/views/HomePage/index.vue')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage.vue')
  },
  { // 404 page
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]
