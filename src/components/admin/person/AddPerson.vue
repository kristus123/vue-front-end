<template>
<b-container>
    <h1>Add a person</h1>
    <div>
    <flexible-form :inputs="inputs" width="100%" :image="image" :color="textColor" @clicked="submitForm" @reset="resetForm">


        <template v-slot:date>
            <b-form-row class="justify-content-center">
            <b-col cols="8">
              <b-form-group class="text-white" label="Date of birth" style="text-align: left;">
                  
                <v-date-picker style="width: 90%;" v-model="date" mode="single" :input-props='{
                  placeholder: "Please enter a date",
                  readonly: true
                }'/>
                
              </b-form-group>
            </b-col>
          </b-form-row>
        </template>

        <template v-if="onShowDropdown" v-slot:dropdown>
            <b-form-row class="justify-content-center">
                <b-col cols="8">
                    <b-form-group class="text-white" label="Address" style="text-align:left;">
                        <b-input-group>
                            <b-input-group-prepend>
                                <span class="input-group-text"><i class="fas fa-address-card"></i></span>
                            </b-input-group-prepend>
                            <form-select :options="addressOptions" :preselect="addressPreselect" v-on:DropDownValue="onSelected"/>
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

var dateFormat = require('dateformat');

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
        this.getAddresses();
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
                addressObject = this.addressPreselect;
                console.log(addressObject);
                addressId = addressObject.addressId;
                
            }
            let date = dateFormat(this.date, "yyyy-mm-dd");
            let response = await personService.create(value, date, addressId);
            if(response.status === 201) {
                this.resetForm();
                this.printMsg('showSuccessMsg');
                this.getAddresses();
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
            this.date = null;
            this.onShowDropdown = true;
            this.onShowAddressForm = false;
            this.addressPreselect = null;
            

        },
        
        newAddress() {
            this.onShowDropdown = false;
            this.onShowAddressForm = true;
        },
        onSelected(value) {
            this.addressPreselect = value;
        },

        async getAddresses() {

            let addresses = await addressService.getAll();
            let options = [];

            for(var i = 0; i < addresses.length; i++) {
                delete addresses[i]._links;
                if(i === 0) {
                    options[i] = {
                        value: null,
                        text: 'Please pick an address',
                        disabled: true
                    }
                }

                options[i+1] = {
                    value: addresses[i],
                    text: addresses[i].addresses[0] + " - " + addresses[i].city + " - " + addresses[i].country,
                    disabled: false
                }
            }

            this.addressOptions = options;

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
            addressOptions: [],
            onShowAddressForm: false,
            onShowMsg: false,
            onShowDropdown: true,
            addressPreselect: null,
            date: null,

            addressInputs: [
                {
                    title: "Address",
                    placeholder: "Enter an address",
                    type: "text",
                    value: '',
                    required: true,
                    disabled: false,
                    icon: "fas fa-address-card"
                },
                {
                    title: "Postal code",
                    placeholder: "Eg. 5059",
                    type: "number",
                    required: true,
                    disabled: false,
                    icon: "fas fa-map-pin"
                },
                {
                    title: "City",
                    placeholder: "Eg. Oslo",
                    type: "text",
                    required: true,
                    disabled: false,
                    icon: "fas fa-map-marked-alt"
                },
                {
                    title: "Country",
                    placeholder: "Eg. Norway",
                    type: "text",
                    required: true,
                    disabled: false,
                    icon: "fas fa-map"
                },
            ],
            inputs: [
                {
                    title: "First name",
                    placeholder: "Enter first name",
                    type: "text",
                    value:'',
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
            ]
        }
    }      
}
</script>

<style>

</style>