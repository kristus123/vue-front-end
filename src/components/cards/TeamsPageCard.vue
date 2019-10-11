<template>
    <b-container id="container">
        <div v-if="showTeam">
            You cliked!
            {{this.someId}}
        </div>
        <b-row>
            <b-col id="cards" cols="3" v-for="team in teams" :key="team.id">
                <div id="background-card" v-on:click="onCardClick(team.id)">
                    <h5 id="teamTitle" class="text-white"><img id="teamLogo" :src="team.img"/>{{team.name}}</h5>
                    <b-card id="cardTeam">
                        <div id="info">
                            <p><strong>Stadium: </strong>{{team.stadium}}</p>
                            <p><strong>Year formed: </strong>{{team.formed}}</p>
                            <p><strong>Coach: </strong>{{team.coach}}</p>
                            <p id="description"><strong>Description: </strong>{{team.description}}</p>
                        </div>
                    </b-card>
                </div>
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
            showTeam: false,
            someId : ''
        }
    },

    methods: {
        onCardClick(id) {
            this.showTeam = true;
            this.someId = id;

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
    transform: rotateZ(4deg);
    transition-duration: .3s;

}


</style>