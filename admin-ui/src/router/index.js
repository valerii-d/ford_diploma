import Vue from 'vue';
import VueRouter from 'vue-router';
import AnalyticsPage from '@/components/pages/Analytics.vue';
import AdminsPage from '@/components/pages/Admins.vue';
import ClientPage from '@/components/pages/ClientPage.vue';
import AutoWarhousePage from '@/components/pages/AutoWarhouse.vue';
import PartsPage from '@/components/pages/Parts.vue';
import AccessoriesPage from '@/components/pages/Accessories.vue';
import CarSettingsPage from '@/components/pages/CarSettings.vue';
import OrdersPage from '@/components/pages/Orders.vue';
import Authorization from '@/components/pages/Authorization.vue';
import DefaultView from '../views/DefaultView.vue';
import SignUpView from '../views/SignUpView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/authorize',
    name: '',
    component: SignUpView,
    children: [
      {
        path: '',
        name: 'authorize',
        component: Authorization,
      },
    ],
  },
  {
    path: '/',
    name: '',
    component: DefaultView,
    children: [
      {
        path: '',
        name: 'home',
        component: AnalyticsPage,
      },
      {
        path: '/clients',
        name: 'clients',
        component: ClientPage,
      },
      {
        path: '/admins',
        name: 'admins',
        component: AdminsPage,
      },
      {
        path: '/orders',
        name: 'orders',
        component: OrdersPage,
      },
      {
        path: '/autoWarhouse',
        name: 'autoWarhouse',
        component: AutoWarhousePage,
      },
      {
        path: '/parts',
        name: 'partsWarhouse',
        component: PartsPage,
      },
      {
        path: '/accessories',
        name: 'accessories',
        component: AccessoriesPage,
      },
      {
        path: '/carSettings',
        name: 'carSettings',
        component: CarSettingsPage,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
