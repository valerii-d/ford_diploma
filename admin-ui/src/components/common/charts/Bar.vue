<template>
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { Bar } from 'vue-chartjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChart',
  components: { Bar },
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
        labels: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень'],
        datasets: [
          {
            label: 'Запчастини',
            data: [40, 39, 10, 40, 39, this.currentMonthSales.parts],
            backgroundColor: '#4CE475',
          },
          {
            label: 'Аксесуари',
            data: [5, 10, 7, 25, 50, this.currentMonthSales.accessories],
            backgroundColor: '#CE932E',
          },
          {
            label: 'Авто',
            data: [5, 12, 10, 21, 18, this.currentMonthSales.cars],
            backgroundColor: '#2E2ECE',
          },
        ],
      };
    },
  },
};
</script>
