<template>
    <b-container id="container">
        <b-row>
            <b-col cols="3" v-for="team in teams" :key="team.id">
                <b-card id="cardTeam">
                    <h3 id="teamTitle">{{team.name}}</h3>
                    <hr>
                    <p>{{infoTeams[0].teams[0].strTeamBadge}}</p>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
    
</template>

<script>

export default {
    name : "teamCard",
    props : ["teams", "infoTeams"]
    
}
</script>

<style>
#container {
    margin-top: 30px;
}

#cardTeam {
    margin: 10px;
}

#teamTitle {
    text-align: center;
}

</style>