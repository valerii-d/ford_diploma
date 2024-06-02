<template>
    <Line
      id="my-line-chart-id"
      :options="options"
      :data="data"
    />
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { Line } from 'vue-chartjs';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);

export default {
  name: 'LineChart',
  components: { Line },
  data() {
    return {
      data: {
        labels: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень'],
        datasets: [
          {
            label: 'Запчастини',
            data: [40, 39, 10, 40, 39, 80],
            backgroundColor: '#4CE475',
          },
          {
            label: 'Аксесуари',
            data: [40, 39, 10, 40, 39, 80],
            backgroundColor: '#CE932E',
          },
          {
            label: 'Авто',
            data: [40, 39, 10, 40, 39, 80],
            backgroundColor: '#2E2ECE',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
