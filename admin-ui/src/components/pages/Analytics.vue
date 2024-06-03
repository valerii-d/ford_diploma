<template>
    <v-container fluid>
        <v-row class="ma-0 px-4">
            <v-col :cols="4">
                <v-container>
                    <DoughnutVue />
                </v-container>
            </v-col>
            <v-col :cols="8">
                <v-container>
                    <Bar />
                </v-container>
            </v-col>
            <v-col :cols="12">
                <v-container>
                    <LineChart />
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Bar from '../common/charts/Bar.vue';
import DoughnutVue from '../common/charts/Doughnut.vue';
import LineChart from '../common/charts/Line.vue';

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
    LineChart,
  },
  data() {
    return {

    };
  },
};

</script>
