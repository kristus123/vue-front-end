<template>
    <b-container>
    <h1>Update contact</h1>
        <b-row class="justify-content-center">
            <b-col cols="12">
            <flexible-form
                :image="image"
                :showBtns="onShowBtns"
                :inputs="inputs"
                @clicked="submitForm"
            >

            <template v-slot:personDropdown>
                <b-form-row class="justify-content-center">
                <b-col cols="8">
                    <b-form-group class="text-black" label="Pick a contact type" style="text-align: left;">
                        <b-input-group>
                            <b-input-group-prepend>
                            <span class="input-group-text"><i class="fas fa-address-book"></i></span>
                            </b-input-group-prepend>
                        <form-select :options="contactTypeOptions" :preselect="contactTypePreselect" v-on:DropDownValue="onSelectContactType"/>
                        </b-input-group>
                    </b-form-group>
                </b-col>
                </b-form-row>
            </template>

            </flexible-form>

            <b-row id="showSuccessMsg" class="justify-content-center">
            <b-col cols="7">
                <b-alert variant="success" show>You have successfully updated a contact.</b-alert>
            </b-col>
            </b-row>

            <b-row id="showErrorMsg" class="justify-content-center">
            <b-col cols="7">
                <b-alert variant="danger" show>Something went wrong. Please try again later.</b-alert>
            </b-col>
            </b-row>

        </b-col>
        </b-row>
    </b-container>
    
</template>

<script>

import contactService from "@/services/contact/ContactService";

import FlexibleForm from "@/components/forms/FlexibleForm";
import FormSelect from "@/components/forms/FormSelect";

import animateService from '@/services/AnimateService'

export default {

    components: {
        FlexibleForm,
        FormSelect
    },

    async beforeMount() {
        await this.getContact();
    },

    mounted: function() {
        document.getElementById('showSuccessMsg').setAttribute("hidden", "");
        document.getElementById('showErrorMsg').setAttribute("hidden", "");
    },

    methods: {

        async submitForm() {

            const contactObject = {
                personId: this.personId,
                contactType: this.contactTypePreselect,
                contactDetail: this.inputs[0].value
            }

            let response = await contactService.update(contactObject, this.$route.params.contactId);

            if(response.status === 201) {
                this.printMsg('showSuccessMsg', true);
            } else {
                this.printMsg('showErrorMsg');
            }

        },
        onSelectContactType(value) {
            this.contactTypePreselect = value;
        },

        async getContact() {
            let contact = await contactService.findById(this.$route.params.contactId);
            console.log(contact);
            this.contactTypePreselect = contact.contactType;
            this.inputs[0].value = contact.contactDetail;
            this.personId = contact.person.personId;
        },

        printMsg(element, success) {
            document.getElementById(element).removeAttribute("hidden");
                animateService.animate(element, 'fadeInDown', null, () => {
                    animateService.animate(element, 'fadeOutUp', 'delay-2s', () => {
                        if(success) {
                        document.getElementById(element).setAttribute("hidden", "");
                        this.$router.go(-1);
                        } else {
                        document.getElementById(element).setAttribute("hidden", "");
                        }
                    });
                });
        }
    },

    data() {
        return {
            contactTypePreselect: null,
            personId: null,
            image: require(`@/assets/blank-composition-data-373076.jpg`),
            contactTypeOptions: [
                {
                    value: null,
                    text: 'Please pic a contact type',
                    disabled: true
                },
                {
                    value: 'EMAIL',
                    text: 'Email',
                    diabled: false
                },
                {
                    value: 'PHONE',
                    text: 'Phone',
                    disabled: false
                }
            ],
            inputs: [
                {
                    title: "Details",
                    placeholder: "Enter details",
                    type: "text"      ,
                    value: '',
                    required: true    ,
                    disabled: false   ,
                    icon: "fas fa-info-circle"
                },
            ]
        }
    }
    
}
</script>