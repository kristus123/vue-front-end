<template>
    <b-container>
        <h1>Update a person</h1>
        <b-container>
            <b-row class="justify-content-center">
                <b-col cols="8">
                    <div class="flexDropdown" :style="{backgroundImage: 'url(' + image + ')'}">
                        <b-form class="customDropdownForm" v-on:submit.prevent="submitForm">
                            <b-form-row class="justify-content-center">
                                <b-col cols="8">
                                    <b-form-group class="text-white" label="Person" style="text-align: left;">
                                        <b-input-group>
                                            <form-select :options="options" :preselect="preselectPerson" v-on:DropDownValue="onSelectedPerson"/>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                            </b-form-row>

                            <flexible-inputs v-if="onShowInputs" :inputs="inputs"/>

                            <b-form-row v-if="onShowAddressDropdown" class="justify-content-center">
                                <b-col cols="8">
                                    <b-form-group class="text-white" label="Address" style="text-align:left;">
                                        <b-input-group>
                                            <form-select :options="addressOptions" :preselect="preselect" v-on:DropDownValue="onSelectedAddress"/>
                                            <b-input-group-append>
                                            <b-btn variant="primary" v-on:click="editAddress">Edit</b-btn>
                                            </b-input-group-append>
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                            </b-form-row>

                            <flexible-inputs v-if="onShowAddressInputs" :inputs="addressInputs" />

                            <b-form-row id="buttons" class="justify-content-center" align-h="between" v-if="onShowInputs">
                                <b-col cols="3">
                                    <b-btn pill variant="outline-success" size="lg" type="submit" value="submit">Update</b-btn>
                                </b-col>
                                <b-col cols="3">
                                    <b-btn pill variant="outline-secondary" size="lg" v-on:click="resetForm">Cancel</b-btn>
                                </b-col>
                            </b-form-row>

                        </b-form>
                    </div>
                        <b-row id="showSuccessMsg" class="justify-content-center">
                            <b-col cols="10">
                                <b-alert variant="success" show>You have successfully updated a person</b-alert>
                            </b-col>
                        </b-row>

                        <b-row id="showErrorMsg" class="justify-content-center">
                            <b-col cols="10">
                                <b-alert variant="danger" show>Something went wrong. Please try again later.</b-alert>
                            </b-col>
                        </b-row>
                </b-col>
            </b-row>
        </b-container>
    </b-container>
</template>

<script>

import FormSelect from '@/components/forms/FormSelect'
import FlexibleInputs from '@/components/forms/inputs/FlexibleInputs'

import personService from '@/services/person/PersonService'
import addressService from '@/services/address/AddressService'
import animateService from '@/services/AnimateService'


export default {
    name:'UpdatePerson',
    components: {
        FormSelect,
        FlexibleInputs
    },

    data() {
        return {
            options: [],
            image: require(`@/assets/adult-dark-fashion-53754.jpg`),
            onShowInputs: false,
            onShowAddressDropdown: false,
            onShowAddressInputs: false,
            preselect: null,
            inputs: [],
            addressOptions: [],
            addressInputs: '',
            address: '',
            personID: '',
            preselectPerson: null
        }
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

        async submitForm() {
            let personObject = [];
            let addressObject = [];

            if(this.onShowAddressInputs) {

                addressObject = {
                    addresses: [
                        this.addressInputs[0].value
                    ],
                    postalCode: this.addressInputs[1].value,
                    city: this.addressInputs[2].value,
                    country: this.addressInputs[3].value
                }

            } else {
                if(this.address === '') {
                    addressObject = this.preselect;
                } else {
                    addressObject = this.address;
                }
            }

            personObject = {
                firstName: this.inputs[0].value,
                lastName: this.inputs[1].value,
                dateOfBirth: this.inputs[2].value,
                address: addressObject
            }

            console.log(personObject);
            let response = await personService.updatePerson(this.personID, personObject);

            if(response.status === 200) {
                this.resetForm();
                this.printMsg('showSuccessMsg');
            } else {
                this.printMsg('showErrorMsg');
            }
            
        },

        onSelectedPerson(value) {
            this.preselectPerson = value;
            this.personID = value.personId;
            this.getAddress();
            this.formatInputs(value);
            this.onShowInputs = true;
            this.onShowAddressDropdown = true;
        },
        onSelectedAddress(value) {
            
            this.address = value;
        },

        editAddress() {

            this.onShowAddressDropdown = false;
            this.onShowAddressInputs = true;

            this.addressInputs = [
                {
                    title: "Address",
                    placeholder: "what is the address ?",
                    type: "text",
                    value: this.preselect.addresses[0],
                    required: true,
                    disabled: false,
                    icon: "fas fa-users"
                },
                {
                    title: "Postal code",
                    placeholder: "Eg. 5059",
                    type: "number",
                    value: this.preselect.postalCode,
                    required: true,
                    disabled: false,
                    icon: "fas fa-users"
                },
                {
                    title: "City",
                    placeholder: "Eg. Oslo",
                    type: "text",
                    value: this.preselect.city,
                    required: true,
                    disabled: false,
                    icon: "fas fa-users"
                },
                {
                    title: "Country",
                    placeholder: "Eg. Norway",
                    type: "text",
                    value: this.preselect.country,
                    required: true,
                    disabled: false,
                    icon: "fas fa-users"
                },
            ]
        },

        async getAddress() {
            let addresses = await addressService.getAll();
            let address = [];
            for(var i = 0; i < addresses.length; i++) {
                address[i] = {
                        value: addresses[i],
                        text: addresses[i].addresses[0] + " - " + addresses[i].city + " - " + addresses[i].country
                    }
            }
            this.addressOptions = address;
        },

        formatInputs(value) {
            this.preselect = value.address;
            this.inputs = [
                {
                    title: "First name",
                    placeholder: "Enter a first name",
                    type: "text",
                    value: value.firstName,
                    required: true,
                    disabled: false,
                    icon: "fas fa-users"
                },
                {
                    title: "Last name",
                    placeholder: "Enter a last name",
                    type: "text",
                    value: value.lastName,
                    required: true,
                    disabled: false,
                    icon: "fas fa-users"
                },
                {
                    title: "Date of birth",
                    placeholder: "Enter a date",
                    type: "date",
                    value: value.dateOfBirth,
                    required: true,
                    disabled: false,
                    icon: "fas fa-users"
                }
            ]
        },
        async resetForm() {
            this.onShowInputs = false;
            this.onShowAddressDropdown = false;
            this.onShowAddressInputs = false;
            this.preselect = null;
            this.preselectPerson = null;
        },

        printMsg(element) {
            document.getElementById(element).removeAttribute("hidden");
                animateService.animate(element, 'fadeInDown', null, () => {
                    animateService.animate(element, 'fadeOutUp', 'delay-2s', () => {
                        document.getElementById(element).setAttribute("hidden", "");
                    });
                });
        }
    }

    
}
</script>

<style>

</style>