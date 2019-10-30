<template>
    <b-container>
        <h1>All matches</h1>
        <div v-if="loading">
             <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
        </div>
        <b-row class="justify-content-center" v-else >
            <b-col cols="12">
                <flexible-form :showBtns="onShowBtns" :image="image">
                    <template v-slot:dropdown>
                        <b-form-row class="justify-content-center">
                            <b-col cols="8">
                                <b-form-group class="text-white" label="Pick a match" style="text-align: left;">
                                    <b-input-group>
                                        <form-select :options="matchOptions" :preselect="matchPreselect" v-on:DropDownValue="onSelectMatch"/>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                    </template>
                </flexible-form>
            </b-col>
        </b-row>
    </b-container>
    
</template>

<script>

import FlexibleForm from "@/components/forms/FlexibleForm"
import FormSelect from "@/components/forms/FormSelect"

import matchService from "@/services/match/MatchService"

export default {

    components: {
        FlexibleForm,
        FormSelect
    },

    async beforeMount() {
        await this.getMatches();
        this.loading = false;
    },

    methods: {
        onSelectMatch(value) {
            this.$router.push(`/user/match/${value}`);
        },

        async getMatches() {

            let matches = await matchService.findAll();
            let options = [];

            for(var i = 0; i < matches._embedded.matchModelList.length; i++) {
                if(i === 0) {
                    options[i] = {
                        value: null,
                        text: 'Please select a match',
                        disabled: true
                    }
                }

                options[i+1] = {
                    value: matches._embedded.matchModelList[i].matchId,
                    text: matches._embedded.matchModelList[i].homeTeam.association.name
                    + " vs. " + matches._embedded.matchModelList[i].awayTeam.association.name,
                    disabled: false
                }
            }

            this.matchOptions = options;
            console.log(matches);

        },


    },

    data() {
        return {
            loading : true,
            onShowBtns: false,
            image: require(`@/assets/athletes-competition-fans-9003.jpg`),
            matchOptions: [],
            matchPreselect: null
        }
    }
    
}
</script>

<style>

</style>