<template>
    <v-navigation-drawer
        permanent
        light
        app
        dark
        color="#3474eb"
    >
        <template v-slot:prepend>
            <v-list-item two-line>
                <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/women/16.jpg" alt="">
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>Кращий Співробітник</v-list-item-title>
                    <v-list-item-subtitle>Увійшов</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </template>

        <v-divider />

        <v-list dense>
            <router-link
                v-for="item in menu"
                :key="item.title"
                :to="item.url"
            >
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </router-link>
        </v-list>

        <template v-slot:append>
            <v-divider />

            <v-container fluid class="d-flex justify-center">
                <v-btn @click="logout" width="95%" text>
                    Вийти
                </v-btn>
            </v-container>
        </template>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationPanel',
  data() {
    return {
      menu: [
        { title: 'Облік продажів', icon: 'mdi-currency-usd', url: '/carSalesHistory' },
        { title: 'Склад авто', icon: 'mdi-sitemap-outline', url: '/autoWarhouse' },
        { title: 'Клієнти', icon: 'mdi-account-heart-outline', url: '/clients' },
        { title: 'Співробітники', icon: 'mdi-account-group', url: '/admins' },
        { title: 'Авто послуги', icon: 'mdi-calendar-check-outline', url: '/orders' },
        { title: 'Запчастини', icon: 'mdi-cog-box', url: '/parts' },
        { title: 'Аксесуари', icon: 'mdi-shape-plus-outline', url: '/accessories' },
        { title: 'Налаштунки', icon: 'mdi-car-settings', url: '/carSettings' },
        { title: 'Аналітика', icon: 'mdi-chart-areaspline', url: '/' },
      ],
    };
  },
  methods: {
    logout() {
      this.$cookies.remove('userEmail');
      this.$router.push('/authorize');
    },
  },
};
</script>

<style lang="sass">

</style>
