<script>

import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,
        data () {
      return {
        datacollection: {
          //Data to be represented on x-axis
          labels: ['January', 'February', 'March'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#33ff41',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: [40, 20, 30]
            }
          ]
        },
        //Chart.js options that controls the appearance of the chart
        options: {
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted() {
        this.renderChart(this.datacollection, this.options)
    },
}
</script>

<style>

</style>