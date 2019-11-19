import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Question from '../views/Question.vue'
import DisplayResult from '../views/DisplayResult.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/questionnaire/:id',
    name: 'question',
    props: true,
    component: Question
  },
  {
    path: '/resultat/:score',
    name: 'DisplayResult',
    props: true,
    component: DisplayResult
  }
]

const router = new VueRouter({
  routes
})

export default router
