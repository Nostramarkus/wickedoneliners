import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import CreateAccount from './views/CreateAccount.vue'
import MyAccount from './views/MyAccount.vue'
import ActivateAccount from './views/ActivateAccount.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/get-wicked',
      name: 'CreateAccount',
      component: CreateAccount
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/activate-account',
      name: 'ActivateAccount',
      component: ActivateAccount
    },
    {
      path: '/my-wicked-account',
      name: 'MyAccount',
      component: MyAccount
    }
  ]
})
