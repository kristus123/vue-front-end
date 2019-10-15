<template>
<b-container>
    <h1 style="color:black; padding-bottom: 10px;">Delete a person</h1>
    <flexible-dropdown-menu :options="options" :cardType="cardType" :image="image"/>
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

            //This need to change! HARDCODED!!!
            this.options = [
                {
                    value: null, 
                    text:'Please select a person', 
                    disabled:true
                },
                {
                    value: people[0],
                    text: people[0].firstName + " " + people[0].lastName
                },
                {
                    value: people[1],
                    text: people[1].firstName + " " + people[1].lastName
                },
                {
                    value: people[2],
                    text: people[2].firstName + " " + people[2].lastName
                }
            ];
            console.log(this.options);
    },

    methods: {
        updateOptions(people) {
            for(let i = 0; i < people.length; i++) {
                this.options[i+1] = {
                    value: people[i],
                    text: people[i].firstName + " " + people[i].lastName
                };
            }

            console.log(this.options);
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