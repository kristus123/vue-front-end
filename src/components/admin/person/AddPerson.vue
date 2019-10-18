<template>
<b-container>
    <h1>Add a person</h1>
    <div>
    <flexible-form :inputs="inputs" width="100%" :image="image" :color="textColor" @clicked="submitForm">
        <template v-if="onShowDropdown" v-slot:dropdown>
            <b-form-row class="justify-content-center">
                <b-col cols="8">
                    <b-form-group class="text-white" label="Address" style="text-align:left;">
                        <b-input-group>
                            <form-select :options="options" v-on:DropDownValue="onSelected"/>
                            <b-input-group-append>
                            <b-btn variant="primary" v-on:click="newAddress">New</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </template>

        <template v-slot:newForm v-if="onShowAddressForm">
            <flexible-inputs :inputs="addressInputs" />
        </template>

    </flexible-form>
    </div>
    <b-row id="showSuccessMsg" class="justify-content-center">
        <b-col cols="7">
            <b-alert variant="success" show>You have successfully added a person</b-alert>
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

import FlexibleForm from '@/components/forms/FlexibleForm'
import FormSelect from '@/components/forms/FormSelect'
import FlexibleInputs from '@/components/forms/inputs/FlexibleInputs'

import personService from '@/services/person/PersonService'
import addressService from '@/services/address/AddressService'

import animateService from '@/services/AnimateService'

export default {
    name: 'AddPerson',
    components: {
        FlexibleForm,
        FormSelect,
        FlexibleInputs
    },

    mounted: function() {
        document.getElementById('showSuccessMsg').setAttribute("hidden", "");
        document.getElementById('showErrorMsg').setAttribute("hidden", "");
    },

    beforeMount: async function() {
        this.addresses = await addressService.getAll();
        
        
        if(this.addresses.length > 0) {
            console.log(this.addresses.length);
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
        } else {
            this.onShowDropdown = false;
            this.onShowAddressForm = true;
        }
    },

    methods: {
     async submitForm (value) {
            console.log(value);
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
                console.log(this.selectedValueDropdown);
                personObject = {
                    firstName: value[0].value,
                    lastName: value[1].value,
                    dateOfBirth: value[2].value,
                    address: this.selectedValueDropdown
                }
            }

            let response = await personService.addPerson(personObject);
            if(response.status === 200) {
                this.printMsg('showSuccessMsg');
                this.addresses = await addressService.getAll();
            } else {
                this.printMsg('showErrorMsg')
            }
        },

        newAddress() {
            this.onShowDropdown = false;
            this.onShowAddressForm = true;
        },
        onSelected(value) {
            this.selectedValueDropdown = value;
            console.log(this.selectedValueDropdown);
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
            textColor: "text-white",
            image: require(`@/assets/adult-dark-fashion-53754.jpg`),
            addresses: [],
            options: [],
            onShowAddressForm: false,
            onShowMsg: false,
            onShowDropdown: true,
            selectedValueDropdown: null,
            addressInputs: [
                {
                    title: "Address",
                    placeholder: "what is the address ?",
                    type: "text",
                    required: true,
                    disabled: false,
                    icon: "fas fa-users"
                },
                {
                    title: "Postal code",
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
                    placeholder: "Eg. Norway",
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