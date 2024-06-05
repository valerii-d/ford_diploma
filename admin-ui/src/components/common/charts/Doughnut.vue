<template>
    <Doughnut
      :options="chartOptions"
      :data="chartData"
      chart-id="chartId"
    />
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: 'DoughnutChart',
  components: {
    Doughnut,
  },
  props: {
    currentMonthSales: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
      },
    };
  },
  computed: {
    chartData() {
      return {
        labels: ['Авто', 'Аксесуари', 'Запчастини'],
        datasets: [
          {
            backgroundColor: ['#2E2ECE', '#CE932E', '#4CE475'],
            data: [
              this.currentMonthSales.cars,
              this.currentMonthSales.accessories,
              this.currentMonthSales.parts,
            ],
          },
        ],
      };
    },
  },
};
</script>

<style lang="sass">
canvas
    height: 85% !important
    width: 85% !important
</style>
