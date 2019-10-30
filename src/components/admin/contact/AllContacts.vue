<template>
    <b-container>
        <h1>Contact</h1>
        <b-row class="justify-content-center">
            <b-col cols="12">
                <flexible-form
                :image="image"
                :showBtns="onShowBtns"
                >
                <template v-slot:dropdown>
                     <b-form-row class="justify-content-center">
                        <b-col cols="8">
                        <b-form-group class="text-black" label="Pick a person" style="text-align: left;">
                            <b-input-group>
                                <b-input-group-prepend>
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                                </b-input-group-prepend>
                            <form-select :options="personOptions" :preselect="personPreselect" v-on:DropDownValue="onSelectPerson"/>
                            <b-input-group-append>
                                <b-btn variant="primary" @click="$router.push('/admin/add/contact')">Create new</b-btn>
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

import FlexibleForm from "@/components/forms/FlexibleForm";
import FormSelect from "@/components/forms/FormSelect";

import personService from "@/services/person/PersonService";
import contactService from "@/services/contact/ContactService";

export default {

    components: {
        FlexibleForm,
        FormSelect
    },

    async beforeMount() {
        await this.getPeople();        
    },

    methods: {
        onSelectPerson(value) {
            this.$router.push(`/admin/update/contact/${value}`);
        },

        async getPeople() {

            let people = await personService.getPerson();
            await this.filterPeople(people);

        },

        async filterPeople(people) {
            let contacts = await contactService.findAll();
            let filterOptions = [];
            let options = [];
            
            for(var i = 0; i < people._embedded.personModelList.length; i++) {
                if(contacts.some(item => item.person.personId === people._embedded.personModelList[i].personId)) {
                    filterOptions.push(people._embedded.personModelList[i]);
                }
            }

            for(var i = 0; i < filterOptions.length; i++) {
                if(i === 0) {
                    options[i] = {
                        value: null,
                        text: 'Please pick a person',
                        disabled: true
                    }
                }
                options[i+1] = {
                    value: filterOptions[i].personId,
                    text: filterOptions[i].firstName + " " + filterOptions[i].lastName,
                    disabled: false
                }
            }

            this.personOptions = options;
        }
    },

    data() {
        return {
            personPreselect: null,
            personOptions: [],

            image: require(`@/assets/blank-composition-data-373076.jpg`),
            onShowBtns: false,
        }
    }
    
}
</script>

<style>

</style>