<template>
    <b-container>
        <h1>Result</h1>
        <b-row class="justify-content-center">
            <flexible-form :image="image">

                <template v-slot:firstDropdown>
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
        </b-row>
    </b-container>
    
</template>

<script>

import FlexibleForm from "@/components/forms/FlexibleForm"
import FormSelect from "@/components/forms/FormSelect"

import ResultService from "@/services/result/ResultService"
import MatchService from "@/services/match/MatchService"

export default {

    components: {
        FlexibleForm,
        FormSelect
    },

    beforeMount: async function () {
        let matches = await MatchService.findAll();

        let matchOption = [];

        for(var i = 0; i < matches._embedded.matchModelList.length; i++) {
            if(i === 0) {
                matchOption[i] = {
                    value: null,
                    text: 'Please pick a match'
                }
            }

            matchOption[i+1] = {
                value: matches._embedded.matchModelList[i],
                text: matches._embedded.matchModelList[i].homeTeam.association.name + " vs. " + matches._embedded.matchModelList[i].awayTeam.association.name
            }
        }

        this.matchOptions = matchOption;


        console.log(this.matchOptions);
    },

    methods: {
        onSelectMatch(value) {
            this.getResult(value.matchId);
        },

        async getResult(resultId) {
            let result = await ResultService.get(resultId);
            console.log(result);
        }
    },


    data() {
        return {
            image: require(`@/assets/brasil-championship-competition-41257.jpg`),
            textColor: 'text-white',
            matchOptions: [],
            matchPreselect: null,

        }
    }
    
}
</script>

<style>

</style>