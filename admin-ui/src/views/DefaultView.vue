<template>
  <v-container fluid class="ma-0 pa-0">
    <v-main app>
      <Navigation />
      <router-view />
    </v-main>
  </v-container>
</template>

<script>
import Navigation from './includes/Navigation.vue';

export default {
  name: 'DefaultView',
  components: {
    Navigation,
  },
};
</script>
