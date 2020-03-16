import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faThumbsUp as fasThumbsUp, faChevronLeft, faPowerOff, faUser, faLock, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as farThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueNoty from 'vuejs-noty'
import Loader from "@/components/Loader.vue"
import VueSession from 'vue-session'

var VueCookie = require('vue-cookie');
Vue.use(VueCookie);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuejs-noty/dist/vuejs-noty.css'
require("@/assets/css/main.scss");

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueNoty)
Vue.use(VueSession)
Vue.use(require('vue-moment'));

library.add(fasThumbsUp, farThumbsUp, faChevronLeft, faPowerOff, faUser, faLock, faTrashAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('wo-loader', Loader)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
