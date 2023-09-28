import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/home.vue'
import course from '../views/course.vue'
import login from '../views/login.vue'
import faculty from '../views/faculty.vue'
import professorSetGrades from '../views/professorSetGrades.vue'
import professorSeeStudents from '../views/professorSeeStudents.vue'
import stulist from '../views/students.vue'
import courseEnroll from '../views/courseEnroll.vue'
import studentCourses from '../views/studentCourses.vue'
import studentDetail from '../views/studentDetail.vue'
import professors from '../views/professors.vue'
import courseDetail from '../views/courseDetail.vue'
import professorDetail from '../views/professorDetail.vue'
import professorCourses from '../views/professorCourses.vue'
import protests from '../views/protests.vue'
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
    },
    {
      path : '/students',
      name: 'stutents',
      component: stulist
    },
    {
      path: '/student/courses',
      name: "studentCourses",
      component: studentCourses
    },
    {
      path: '/student/enroll',
      name: 'courseEnroll',
      component: courseEnroll
    },
    {
      path: '/student/:studentID',
      name: 'studentDetail',
      component: studentDetail
    },
    {
      path: '/professors',
      name: 'professors',
      component: professors
    },
    {
      path: '/course/:courseID',
      name: 'courseDetail',
      component: courseDetail
    },
    {
      path: '/professor/:professorID',
      name: 'professorDetail',
      component: professorDetail
    },
    {
      path: '/professor/courses/',
      name: 'professorCourses',
      component: professorCourses
    },
    {
      path: '/professor/protests',
      name: 'protests',
      component: protests
    }
  ]
})

export default router
