import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueCookies from 'vue-cookies';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.use(VueCookies, { expires: '1d' });

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
