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
  data() {
    return {
      chartData: {
        labels: ['Продаж нових авто', 'Продаж аксесуарів', 'Виконано обслуговувань'],
        datasets: [
          {
            backgroundColor: ['green', 'blue', 'yellow'],
            data: [32, 40, 80],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>

<style lang="sass">
canvas
    height: 85% !important
    width: 85% !important
</style>
