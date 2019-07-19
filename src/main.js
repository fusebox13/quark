import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import BootstrapVue from 'bootstrap-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/styles/custom.scss'

library.add(faCog, faEllipsisV);

Vue.component('font-awesome', FontAwesomeIcon)



Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
