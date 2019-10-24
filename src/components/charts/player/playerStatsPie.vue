<script>

import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,
    props: ["chartdata", "options"],
    mounted: function() {
        this.renderChart(this.chartdata, this.options)
    }
    
}
</script>

<style>

</style>