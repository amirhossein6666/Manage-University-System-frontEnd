import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/home.vue'
import course from '../views/course.vue'
import login from '../views/login.vue'
import faculty from '../views/faculty.vue'
import professorSetGrades from '../views/professorSetGrades.vue'
import professorSeeStudents from '../views/professorSeeStudents.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/courses',
      name: 'courses',
      component: course
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/faculty',
      name: 'faculty',
      component: faculty
    },
    {
      path: '/professor/setGrades',
      name: 'professorSetGrades',
      component: professorSetGrades
    },
    {
      path: '/professor/stuList',
      name: 'professorSeeStudents',
      component: professorSeeStudents
    }
  ]
})

export default router
