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
                            <form-select :options="options" :preselect="addressPreselect" v-on:DropDownValue="onSelected"/>
                            <b-input-group-append>
                            <b-btn variant="primary" v-on:click="newAddress">New</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </template>

        <template v-slot:newForm v-if="onShowAddressForm">
            <flexible-inputs :inputs="addressInputs" :color="textColor"/>
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
        
        if(this.addresses._embedded.addressModelList.length > 0) {
            let option = [];
            for(var i = 0; i < this.addresses._embedded.addressModelList.length; i++) {
                if(i === 0) {
                    option[i] = {
                        value: null,
                        text: "Please pick an address",
                        disabled: true
                    }
                }
                option[i+1] = {
                    value: this.addresses._embedded.addressModelList[i],
                    text: this.addresses._embedded.addressModelList[i].addresses[0] + " - " + this.addresses._embedded.addressModelList[i].city + " - " + this.addresses._embedded.addressModelList[i].country
                }
            }
            this.options = option;
        } else {
            this.onShowDropdown = false;
            this.onShowAddressForm = true;
        }
    },

    methods: {
     async submitForm (value) {
         
            let addressObject = [];
            let addressId = null;
            if(this.onShowAddressForm) {
                addressObject = {
                    addresses: [
                        this.addressInputs[0].value,
                    ],
                    postalCode: this.addressInputs[1].value,
                    city: this.addressInputs[2].value,
                    country: this.addressInputs[3].value
                }
                
                let newAddress = await addressService.createWithoutConvert(addressObject);
                addressId = newAddress.addressId;

            } else {
                addressObject = this.selectedValueDropdown;
                addressId = addressObject.addressId;
                
            }

            let response = await personService.create(value, addressId);
            if(response.status === 201) {
                this.printMsg('showSuccessMsg');
                this.resetForm();
                this.addresses = await addressService.getAll();
            } else {
                this.printMsg('showErrorMsg')
            }
        },

        resetForm() {
            for(var i = 0; i < this.inputs.length; i++) {
                this.inputs[i].value = '';
            }
            
            for(var i = 0; i < this.addressInputs.length; i++) {
                this.addressInputs[i].value = '';
            }

            this.addressPreselect = null;
            this.onShowAddressForm = false;

        },
        
        newAddress() {
            this.onShowDropdown = false;
            this.onShowAddressForm = true;
        },
        onSelected(value) {
            this.addressPreselect = value;
            this.selectedValueDropdown = value;
        },
        printMsg(element) {
            document.getElementById(element).removeAttribute("hidden");
                animateService.animate(element, 'fadeInDown', null, () => {
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
            addressPreselect: null,
            selectedValueDropdown: null,
            addressInputs: [
                {
                    title: "Address",
                    placeholder: "what is the address ?",
                    type: "text",
                    value: '',
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