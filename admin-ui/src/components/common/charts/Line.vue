<template>
    <LineChart
      id="my-line-chart-id"
      :options="options"
      :data="data"
    />
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { Line as LineChart } from 'vue-chartjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

export default {
  name: 'LineGraph',
  components: { LineChart },
  props: {
    currentMonthSales: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      options: {
        responsive: true,
      },
    };
  },
  computed: {
    data() {
      return {
        labels: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень'],
        datasets: [
          {
            label: 'Запчастини',
            data: [40, 39, 10, 40, 39, this.currentMonthSales.parts],
            borderColor: '#4CE475',
            backgroundColor: '#32BE36',
          },
          {
            label: 'Аксесуари',
            data: [5, 10, 7, 25, 50, this.currentMonthSales.accessories],
            borderColor: '#E8AC1F',
            backgroundColor: '#CE932E',
          },
          {
            label: 'Авто',
            data: [5, 12, 10, 21, 18, this.currentMonthSales.cars],
            borderColor: '#1F77E8',
            backgroundColor: '#2E2ECE',
          },
        ],
      };
    },
  },
};
</script>
