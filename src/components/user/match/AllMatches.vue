<template>
    <b-container>
        <b-row class="justify-content-center">
            <b-col cols="12">
                <flexible-form :showBtns="onShowBtns" :image="image">
                    <template v-slot:dropwdown>
                        <form-select :options="matchOptions" :preselect="matchPreselect" v-on:DropDownValue="onSelectMatch"/>
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
        let matches = await matchService.findAll();
        console.log(matches);
    },

    methods: {
        onSelectMatch() {

        }
    },

    data() {
        return {
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