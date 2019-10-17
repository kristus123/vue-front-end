<template>
<b-container>
    <h1>Add a perosn</h1>
    <flexible-form :inputs="inputs" width="100%" :image="image" :color="textColor" @clicked="submitForm"/>
</b-container>

    
</template>

<script>

import FlexibleForm from '@/components/forms/FlexibleForm'
import personService from '@/services/person/PersonService'

export default {
    name: 'AddPerson',
    components: {
        FlexibleForm
    },

    methods: {
        submitForm (value) {
        console.log("____________")
        console.log(value) // someValue

        var personObject = {
            personId: value[0].value,
            addressId: value[1].value,
            firstName: value[2].value,
            lastName: value[3].value,
            dateOfBirth: value[4].value
        }
        console.log(personObject);
        personService.addPerson(personObject);
        },
    },

    data() {
        return {
            textColor: "text-white",
            image: require(`@/assets/adult-dark-fashion-53754.jpg`),
            inputs: [
                {
                    title: "First name",
                    placeholder: "Enter first name",
                    type: "text",
                    required: true,
                    disabled: false,
                    icon: "fas fa-file-signature"
                },
                {
                    title: "Last name",
                    placeholder: "Enter last name",
                    type:"text",
                    required: true,
                    disabled: false,
                    icon: "fas fa-file-signature"
                },
                {
                    title: "Date of birth",
                    placeholder: "Enter a date",
                    type: "date",
                    required: "required",
                    disabled: false,
                    icon: "fas fa-calendar-alt"
                }
            ]
        }
    }      
}
</script>

<style>

</style>