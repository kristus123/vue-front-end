<template>
<b-container>
    <h1 style="color:black; padding-bottom: 10px;">Delete a person</h1>
    <flexible-dropdown-menu :options="options" :cardType="cardType" :image="image" @clicked="submitForm"/>
</b-container>
    
</template>

<script>

import FlexibleDropdownMenu from '@/components/forms/FlexibleDropdownMenu'
import personService from '@/services/person/PersonService'

export default {
    name: 'DeletePerson',
    components: {
        FlexibleDropdownMenu
    },

    beforeMount: async function() {
        let people = await personService.getPerson();
        let option = [];
        for(let i = 0; i < people.length; i++) {
            if(i === 0) {
                option[i] = {
                    value: null,
                    text: 'Please select a person',
                    disabled: true
                }                
            }

            option[i+1] = {
                value: people[i],
                text: people[i].firstName + " " + people[i].lastName
            }
        }

        this.options = option;
    },

    methods: {

     async submitForm (value) {
            let person = await personService.deletePerson(value.personId);
            let updatedOptions = this.updateOptions(this.options, person)
            console.log(updatedOptions);
        },

        updateOptions(array, value) {
            return array.filter(function(element){
                return element != value;
            });
        }
    },

    data() {
        return {
            options: [],

            cardType: 'person',
            image: require(`@/assets/adult-dark-fashion-53754.jpg`)
        }
    }
    
}
</script>

<style>

</style>