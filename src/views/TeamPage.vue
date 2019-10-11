<template>
    
    <b-container id="teamContainer">
        <b-row class="justify-content-center">
            <h1><img id="logo" :src=allTeams[id].img>{{allTeams[id].name}}</h1>            
        </b-row>
        <b-card no-body>
            <b-tabs card justified>
                <b-tab title="Information" active>
                    <b-row>
                        <p><strong>Coach: </strong> {{allTeams[id].coach}}</p>
                    </b-row>
                    <b-row>
                        <p><strong>Stadium: </strong> {{allTeams[id].stadium}}</p>
                    </b-row>
                    <b-row>
                        <p><strong>Year formed: </strong> {{allTeams[id].formed}}</p>
                    </b-row>
                    <b-row>
                        <p><strong>Description: </strong> {{allTeams[id].description}}</p>
                    </b-row>
                </b-tab>
                <b-tab class="test" title="Players">
                    <b-row>
                        <b-col cols="3" v-for="count in counter" :key="count.id">
                            <player-card/>
                        </b-col>
                    </b-row>

                </b-tab>
                <b-tab title="Stats">
                    <p>Stats here!</p>
                </b-tab>
                <b-tab title="Recent Matches">
                    <p>Recent matches here!</p>
                </b-tab>
            </b-tabs>
        </b-card>
        
    </b-container>
</template>

<script>
import PlayerCard from '@/components/cards/player/PlayerCard';


export default {
    name: "teamPage",
    props: ['teamId', 'teams'],
    components: {
        PlayerCard
    },

    data() {
        return {
            id : "some id",
            allTeams : [],
            counter: [
                {"id" : 1},
                {"id" : 2},
                {"id" : 3},
                {"id" : 4},
                {"id" : 5}
            ]
        }
    },

    mounted() {
        if(this.teamId) {
            this.id = this.teamId-1;
        }
        if(this.teams) {
            this.allTeams = this.teams;
        }
    }

}
</script>

<style>
.nav-tabs .nav-link, .nav-tabs .nav-link {
    color:rgb(133, 133, 133);
    border: solid 1px #e9ecef;
}

.nav-link:hover {
    color: rgb(65, 65, 65);
}

#logo{
    width: 20%;
    align-content: left;
}

#teamContainer {
 background: url("../assets/ball-field-grass-46792.jpg");
 background-size: cover;
 background-repeat: no-repeat;
    
}

</style>