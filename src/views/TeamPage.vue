<template>
    <b-container>
        This is a page for a singel team.
        id: {{id}}
        <img :src="allTeams[id-1].img">
    </b-container>
</template>

<script>
export default {
    name: "teamPage",
    props: ['teamId', 'teams'],
    data() {
        return {
            id : "some id",
            allTeams : []
        }
    },

    mounted() {
        if(this.teamId) {
            this.id = this.teamId;
        }
        if(this.teams) {
            this.allTeams = this.teams;
        }
    }

}
</script>

<style>

</style>