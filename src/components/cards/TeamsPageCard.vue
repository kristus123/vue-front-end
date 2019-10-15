<template>
    <b-container id="container">
        <b-row>
            <b-col id="cards" cols="3" v-for="team in teams" :key="team.id">
                <router-link class="router" :to="{ name: 'teamPage', params: {teamId, teams} }">
                <div id="background-card" v-on:click="onClickCard(team.id)">
                    <h5 id="teamTitle" class="text-white"><img id="teamLogo" :src="team.img"/>{{team.name}}</h5>
                    <b-card id="cardTeam">
                        <div id="info">
                            <b-row><p><strong>Stadium: </strong>{{team.stadium}}</p></b-row>
                            <b-row><p><strong>Year formed: </strong>{{team.formed}}</p></b-row>
                            <b-row><p><strong>Coach: </strong>{{team.coach}}</p></b-row>
                            <b-row><p id="description"><strong>Description: </strong>{{team.description}}</p></b-row>
                        </div>
                    </b-card>
                </div>
                </router-link>
            </b-col>
        </b-row>
    </b-container>
    
</template>

<script>

export default {
    name : "teamCard",
    props : ["teams"],
    data() {
        return {
            teamId : 'some id'
        }
    },

    methods: {
        onClickCard(id) {
            this.teamId = id;
        }
    }
    
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

#teamLogo{
    max-width: 20%;
    margin-right: 5px;
}

#background-card {
    background-color: #3d1d6e;
    border-radius: 10px;
    padding-bottom: 10px;
    padding-top: 10px;
    margin-bottom: 10px;
}

#description {
    line-height: 1.5em;
    height: 3em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
}

#info {
    text-align: left;
}

#cards:hover{
    transform: rotateZ(2deg);
    transition-duration: .3s;


}

#cards:active {
    transform: scale(1.1, 1.1);
    transition-duration: .1s;
}


</style>