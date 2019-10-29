import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'quasar/dist/quasar.css'
import 'quasar/dist/quasar.ie.polyfills'
import 'quasar/dist/quasar.umd'

Vue.config.productionTip = false

Vue.use( VueSocketio, 'http://localhost:3001' ) // Automaticly socket connect from url string

new Vue( {
  router,
  store,
  render: h => h( App ),
  beforeCreate () {
    store.commit( 'setSocket', this.$socket )
  },
} ).$mount( '#app' )
