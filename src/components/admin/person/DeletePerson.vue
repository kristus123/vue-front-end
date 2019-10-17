<template>
<b-container>
    <h1 style="color:black; padding-bottom: 10px;">Delete a person</h1>
    <b-row>
        <b-col>
            <flexible-dropdown-menu :options="options" :cardType="cardType" :image="image" @clicked="submitForm"/>
        </b-col>
    </b-row>
    <b-row id="showSuccessMsg" class="justify-content-center">
        <b-col cols="7">
            <b-alert variant="success" show>You have successfully deleted a person</b-alert>
        </b-col>
    </b-row>

    <b-row id="showErrorMsg" class="justify-content-center">
        <b-col cols="7">
            <b-alert variant="danger" show>Something went wrong. Please try again later.</b-alert>
        </b-col>
    </b-row>
</b-container>
    
</template>

<script>

import FlexibleDropdownMenu from '@/components/forms/FlexibleDropdownMenu'
import personService from '@/services/person/PersonService'
import animateService from '@/services/AnimateService'

export default {
    name: 'DeletePerson',
    components: {
        FlexibleDropdownMenu
    },

    mounted: function() {
        document.getElementById('showSuccessMsg').setAttribute("hidden", "");
        document.getElementById('showErrorMsg').setAttribute("hidden", "");
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

            if(person.status === 200) {
                let updatedOptions = this.updateOptions(this.options, person.data)
                this.options = updatedOptions;
                this.printMsg('showSuccessMsg');
            } else {
                this.printMsg('showErrorMsg');
            }
        },

        updateOptions(array, value) {
            return array.filter(function(element){

                if(element.value != null) {
                    return element.value.personId != value.personId;
                } else {
                    return element.value != value;
                }
                
            });
        },

        onSelected(show) {
            if(show === true) {
                this.showCard = true;
                this.showBtn = true;
            } else {
                this.showCard = false;
                this.showBtn = false;
            }

        },
        printMsg(element) {
            document.getElementById(element).removeAttribute("hidden");
                animateService.animate(element, 'fadeInDown', 'delay-1s', () => {
                    animateService.animate(element, 'fadeOutUp', 'delay-2s', () => {
                        document.getElementById(element).setAttribute("hidden", "");
                    });
                });
        }
    },

    data() {
        return {
            options: [],
            cardType: 'person',
            showCard: false,
            showBtn: false,
            hidden: false,
            image: require(`@/assets/adult-dark-fashion-53754.jpg`)
        }
    }
    
}
</script>

<style>

</style>