<template>
  <b-container>
    <h1>Update a season</h1>
    <b-row class="justify-content-center">
      <b-col cols="12">
        <flexible-form
          :image="image"
          :color="textColor"
          :inputs="inputs"
          @clicked="submitForm"
        >
          <template v-slot:newForm>
            <b-form-row class="justify-content-center">
              <b-col cols="8">
                <b-form-group class="text-white" label="Date" style="text-align: left;">
                  <v-date-picker v-model="dateRange" mode="range" :columns="2" :input-props='{
                    placeholder: "Please enter a range",
                    readonly: true
                  }'/>
                </b-form-group>
              </b-col>
            </b-form-row>
          </template>

        </flexible-form>
        <b-row id="showSuccessMsg" class="justify-content-center">
            <b-col cols="7">
                <b-alert variant="success" show>You have successfully added a season.</b-alert>
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
import FormSelect from "@/components/forms/FormSelect"
import seasonService from "@/services/season/SeasonService";
import animateService from '@/services/AnimateService'

var dateFormat = require('dateformat');

export default {
  components: {
    FlexibleForm,
    FormSelect
  },

  mounted: function() {
    document.getElementById('showSuccessMsg').setAttribute("hidden", "");
    document.getElementById('showErrorMsg').setAttribute("hidden", "");
  },

  beforeMount: async function () {
     await this.getSeason();
  },


  methods: {
   async submitForm() {

     const seasonObject = {
       name: this.inputs[0].value,
       description: this.inputs[1].value,
       startDate: dateFormat(this.dateRange.start, "yyyy-mm-dd"),
       endDate: dateFormat(this.dateRange.end, "yyyy-mm-dd")
     }

      let response = await seasonService.updateWithoutConvert(seasonObject, this.$route.params.seasonId);

      if(response.status === 201) {
        this.printMsg('showSuccessMsg', true);
      } else {
        this.printMsg('showErrorMsg');
      }

    },


    async getSeason() {
        let seasonData = await seasonService.getSeason(this.$route.params.seasonId);

        this.inputs[0].value = seasonData.name;
        this.inputs[1].value = seasonData.description;
        this.dateRange = {
          start: new Date(seasonData.startDate),
          end: new Date(seasonData.endDate)
        }
    },

    printMsg(element, success) {
        document.getElementById(element).removeAttribute("hidden");
            animateService.animate(element, 'fadeInDown', 'delay-1s', () => {
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
      textColor: "text-white",
      image: require(`@/assets/action-adult-athletes-1657332.jpg`),
      size: 12,
      options: [],
      seasonId : '',
      preselect : null,
      dateRange: {
        start: null,
        end: null
      },

      inputs: [
        {
          title: "Season",
          placeholder: "Season name",
          type: "text",
          required: true,
          value: '',
          icon: "fas fa-file-signature"
        },
        {
          title: "Description",
          placeholder: "Enter a description",
          type: "text",
          required: true,
          icon: "fas fa-align-left"
        },
      ]
    };
  }
};
</script>

<style>
</style>