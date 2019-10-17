<template>
<b-container>
    <h1>Add a perosn</h1>
    <div v-if="onShowForm">
    <flexible-form :inputs="inputs" width="100%" :image="image" :color="textColor" :slotTitle="slotTitle" @clicked="submitForm">
    
        <template v-slot:dropdown>
            <form-select :options="options" v-on:DropDownValue="onSelected"/>
        </template>

        <template v-slot:button>
            <b-btn variant="primary" v-on:click="newAddress">New</b-btn>
        </template>

        <template v-slot:newForm v-if="onShowAddressForm">
            <flexible-inputs :inputs="addressInputs" />
        </template>

    </flexible-form>
    </div>
    <div v-if="onShowLoading">
        LOADING
    </div>
    
    
</b-container>

    
</template>

<script>

import FlexibleForm from '@/components/forms/FlexibleForm'
import FormSelect from '@/components/forms/FormSelect'
import FlexibleInputs from '@/components/forms/inputs/FlexibleInputs'

import personService from '@/services/person/PersonService'
import addressService from '@/services/address/AddressService'

export default {
    name: 'AddPerson',
    components: {
        FlexibleForm,
        FormSelect,
        FlexibleInputs
    },

    beforeMount: async function() {
        this.addresses = await addressService.getAll();
        let option = [];
        for(var i = 0; i < this.addresses.length; i++) {
            if(i === 0) {
                option[i] = {
                    value: null,
                    text: "Please pick an address",
                    disabled: true
                }
            }
            option[i+1] = {
                value: this.addresses[i],
                text: this.addresses[i].addresses[0] + " - " + this.addresses[i].city + " - " + this.addresses[i].country
            }
        }
        this.options = option;
        console.log(this.options);
    },

    methods: {
     async submitForm (value) {
            console.log(value);
            this.onShowForm = false;
            this.onShowLoading = true;
            let personObject = [];
            if(this.onShowAddressForm) {
                for(var i = 0; i < this.addressInputs.length; i++) {
                    value.push(this.addressInputs[i]);
                }

                personObject = {
                    firstName: value[0].value,
                    lastName: value[1].value,
                    dateOfBirth: value[2].value,
                    address: {
                        addresses: [
                            value[3].value
                        ],
                        postalCode: value[4].value,
                        city: value[5].value,
                        country: value[6].value
                    }
                }
            } else {
                value.address = this.selectedValueDropdown;
            }


        
            await personService.addPerson(personObject);
        
        },

        newAddress() {
            this.onShowAddressForm = true;
        },
        onSelected(value) {
            this.selectedValueDropdown = value;
            console.log(this.selectedValueDropdown);
        }
    },

    data() {
        return {
            textColor: "text-white",
            image: require(`@/assets/adult-dark-fashion-53754.jpg`),
            addresses: [],
            options: [],
            slotTitle: 'Address',
            onShowAddressForm: false,
            onShowForm: true,
            onShowLoading: false,
            selectedValueDropdown: null,
            addressInputs: [
                {
                    title: "address",
                    placeholder: "what is the address ?",
                    type: "text",
                    required: true,
                    disabled: false,
                    icon: "fas fa-users"
                },
                {
                    title: "postal code",
                    placeholder: "Eg. 5059",
                    type: "number",
                    required: true,
                    disabled: false,
                    icon: "fas fa-users"
                },
                {
                    title: "City",
                    placeholder: "Eg. Oslo",
                    type: "text",
                    required: true,
                    disabled: false,
                    icon: "fas fa-users"
                },
                {
                    title: "Country",
                    placeholder: "Eg. Sweden",
                    type: "text",
                    required: true,
                    disabled: false,
                    icon: "fas fa-users"
                },
            ],
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