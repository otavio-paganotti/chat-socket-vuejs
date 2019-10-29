import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import login from './views/login.vue'
import chat from './views/chat.vue'

Vue.use( Router )

export default new Router( {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/chat',
      name: 'chat',
      component: chat,
      beforeEnter(to, from, next) {
        if (store.state.username && store.state.username.length > 0) {
          next()
        } else {
          next('/')
        }
      }
    },
  ],
} )
