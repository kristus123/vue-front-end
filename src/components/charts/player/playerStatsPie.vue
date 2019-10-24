<script>

import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins;
export default {
    extends: Pie,
    mixins: [reactiveProp],
    props: ["options"],
    mounted() {
        // chartData is created in mixin. No idea how it is fetched
        this.renderChart(this.chartData, this.options)
    },
    
}
</script>

<style>

</style>