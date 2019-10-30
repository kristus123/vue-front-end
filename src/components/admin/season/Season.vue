<template>
    <b-container>
        <h1>Season</h1>
        <hr class="pretty">
        <b-row class="justify-content-center">
            <b-col cols="12">
                <flexible-form
                :image="image"
                :showBtns="onShowBtns"
                >
                    <template v-slot:dropdown>
                    <b-form-row class="justify-content-center">
                        <b-col cols="8">
                        <b-form-group class="text-white" label="Pick a season" style="text-align: left;">
                            <b-input-group>
                            <b-input-group-prepend>
                                <span class="input-group-text"><i class="fas fa-calendar-alt"></i></span>
                            </b-input-group-prepend>
                            <form-select :options="seasonOptions" :preselect="seasonPreselect" v-on:DropDownValue="onSelectSeason"/>
                            <b-input-group-append>
                                <b-btn variant="primary" @click="$router.push('/admin/add/season')">Create new</b-btn>
                            </b-input-group-append>
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
import FormSelect from "@/components/forms/FormSelect";
import seasonService from "@/services/season/SeasonService";

export default {
    name: "Season",

    components: {
        FlexibleForm,
        FormSelect
    },

    async beforeMount() {
        await this.getSeasons();
    },

    methods: {
        async getSeasons() {
            let seasons = await seasonService.findAll()
            let options = [];

            for(var i = 0; i < seasons._embedded.seasonModelList.length; i++) {
                if(i == 0) {
                    options[i] = {
                        value: null,
                        text: 'Please pick a season',
                        disabled: true
                    }
                }
                options[i+1] = {
                    value: seasons._embedded.seasonModelList[i].seasonId,
                    text: seasons._embedded.seasonModelList[i].name,
                    disabled: false
                }
            }

            this.seasonOptions = options;
        },

        onSelectSeason(value) {
            this.seasonPreselect = value;
            this.$router.push(`/admin/update/season/${this.seasonPreselect}`);
        }

    },

  

    data() {
        return {
            image: require(`@/assets/action-adult-athletes-1657332.jpg`),
            onShowBtns: false,
            seasonOptions: [],
            seasonPreselect: null,
        }
    }
    
}
</script>

<style>

</style>