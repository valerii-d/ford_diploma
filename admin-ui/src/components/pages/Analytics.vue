<template>
    <v-container fluid>
        <v-row class="ma-0 px-4">
            <v-col :cols="4">
                <v-container>
                    <DoughnutVue :currentMonthSales="salesData" />
                </v-container>
            </v-col>
            <v-col :cols="8">
                <v-container>
                    <Bar :currentMonthSales="salesData" />
                </v-container>
            </v-col>
            <v-col :cols="12">
                <v-container>
                    <LineChart :currentMonthSales="salesData" />
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Bar from '../common/charts/Bar.vue';
import DoughnutVue from '../common/charts/Doughnut.vue';
import LineChart from '../common/charts/Line.vue';
import SalesHistory from '@/api/salesHistory';

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
      salesData: {},
    };
  },
  mounted() {
    this.getCurrentMonthSales();
  },
  methods: {
    async getCurrentMonthSales() {
      const currentDate = new Date();

      const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      const firstDayFormatted = this.formatDate(firstDay);
      const lastDayFormatted = this.formatDate(lastDay);

      this.salesData = (await SalesHistory.salesCount({
        firstDayFormatted,
        lastDayFormatted,
      }))[0];
    },
    formatDate(date) {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    }
  },
};

</script>
