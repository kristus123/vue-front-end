<template>
  <b-container>
    <h1>Add contact</h1>
      <b-row class="justify-content-center">
        <b-col cols="12">
          <flexible-form
            :image="image"
            :showBtns="onShowBtns"
            :inputs="inputs"
            @clicked="submitForm"
          >

          <template v-slot:firstDropdown>
            <b-form-row class="justify-content-center">
              <b-col cols="8">
                <b-form-group class="text-black" label="Pick a person" style="text-align: left;">
                    <b-input-group>
                        <b-input-group-prepend>
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                        </b-input-group-prepend>
                    <form-select :options="personOptions" :preselect="personPreselect" v-on:DropDownValue="onSelectPerson"/>
                    </b-input-group>
                </b-form-group>
              </b-col>
            </b-form-row>
          </template>

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
              <b-alert variant="success" show>You have successfully added a contact.</b-alert>
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
import FlexibleForm from "@/components/forms/FlexibleForm";
import FormSelect from "@/components/forms/FormSelect";

import contactService from '@/services/contact/ContactService.js';
import personService from "@/services/person/PersonService";
import animateService from '@/services/AnimateService'

export default {
  name: "AddContact",
  components: {
    FlexibleForm,
    FormSelect
  },

  async beforeMount(){

    await this.getPeople();

  },
  mounted: function() {
    document.getElementById('showSuccessMsg').setAttribute("hidden", "");
    document.getElementById('showErrorMsg').setAttribute("hidden", "");
  },

  methods: {
      async submitForm(value) {
        const contactObject = {
          personId: this.personPreselect,
          contactType: this.contactTypePreselect,
          contactDetail: this.inputs[0].value
        }

        let response = await contactService.create(contactObject);

        if(response.status === 201) {
          this.printMsg('showSuccessMsg', true)
        } else {
          this.printMsg('showErrorMsg');
        }
    },

    onSelectPerson(value) {
      this.personPreselect = value;

    },

    onSelectContactType(value) {
      this.contactTypePreselect = value;

    },

    async getPeople() {

      let people = await personService.getPerson();
      await this.filterPeople(people);

    },

    async filterPeople(people) {
      let contacts = await contactService.findAll();
      let filterPeople = [];
      let options = [];

      for(var i = 0; i < people._embedded.personModelList.length; i++) {
        if(!contacts.some(item => item.person.personId === people._embedded.personModelList[i].personId)) {
          filterPeople.push(people._embedded.personModelList[i]);
        }
      }

      for(var i = 0; i < filterPeople.length; i++) {
        if(i === 0) {
          options[i] = {
            value: null,
            text: 'Please pick a person',
            disabled: true
          }
        }
        options[i+1] = {
          value: filterPeople[i].personId,
          text: filterPeople[i].firstName + " " + filterPeople[i].lastName,
          disabled: false
        }
      }

      this.personOptions = options;

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
      textColor: "text-black",
      image: require(`@/assets/blank-composition-data-373076.jpg`),
      onShowBtns: true,
      personOptions: [],
      personPreselect: null,
      contactTypePreselect: null,
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
    };
  }
};
</script>

<style>
</style>