<template>
    <v-container fluid>
        <v-row class="ma-0 px-4">
            <v-col :cols="12">
                <v-card class="d-flex justify-center align-center" min-height="400">
                    <DoughnutVue />
                </v-card>
            </v-col>
            <v-col class="px-8 py-5" :cols="12">
                <v-card>
                    <Bar />
                </v-card>
            </v-col>
            <v-col class="px-8 py-5" :cols="12">
                <v-card>
                    <Line />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Bar from '../common/charts/Bar.vue';
import DoughnutVue from '../common/charts/Doughnut.vue';
import Line from '../common/charts/Line.vue';

export default {
  name: 'AnalyticsPage',
  mounted() {
    if (!this.$cookies.get('userEmail')) {
      this.$router.push('/authorize');
    }
  },
  components: {
    Bar,
    DoughnutVue,
    Line,
  },
  data() {
    return {

    };
  },
};

</script>
