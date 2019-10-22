<template>
  <b-container>
    <h1>Update a season</h1>
    <flexible-form
      :inputs="inputs"
      width="100%"
      :image="image"
      :color="textColor"
      :size="size"
      @clicked="submitForm"
    >
        <template v-slot:firstDropdown>
            <b-form-row class="justify-content-center">
                <b-col cols="8">
                    <b-form-group :class="textColor" label="Season" style="text-align:left;">
                        <b-input-group>
                            <form-select :options="options" :preselect="preselect" v-on:DropDownValue="onSelectedSeason"/>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-form-row>
        </template>
    </flexible-form>

    <b-row id="showSuccessMsgUpdate" class="justify-content-center">
        <b-col cols="10">
            <b-alert variant="success" show>You have successfully updated a season</b-alert>
        </b-col>
    </b-row>

    <b-row id="showErrorMsgUpdate" class="justify-content-center">
        <b-col cols="10">
            <b-alert variant="danger" show>Something went wrong. Please try again later.</b-alert>
        </b-col>
    </b-row>

  </b-container>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import FormSelect from "@/components/forms/FormSelect"
import seasonService from "@/services/season/SeasonService";
import animateService from '@/services/AnimateService'

export default {
  components: {
    FlexibleForm,
    FormSelect
  },

  mounted: function() {
    document.getElementById('showSuccessMsgUpdate').setAttribute("hidden", "");
    document.getElementById('showErrorMsgUpdate').setAttribute("hidden", "");
  },

  beforeMount: async function () {
      let seasons = await seasonService.findAll();
      let option = [];
      for(var i = 0; i < seasons._embedded.seasonModelList.length; i++) {
          if(i === 0) {
              option[i] = {
                  value: null,
                  text: "Please pick a season",
                  disabled: true
              }
          }
          option[i+1] = {
              value: seasons._embedded.seasonModelList[i],
              text: seasons._embedded.seasonModelList[i].name
          }
      }
      this.options = option;
  },


  methods: {
   async submitForm(value) {

      let response = await seasonService.update(value, this.seasonId);

      if(response.status === 201) {
        this.printMsg('showSuccessMsgUpdate');
        for(var i = 0; i < this.inputs.length; i++) {
            this.inputs[i].value = '';
        }
        this.updateDropdown();
      } else {
        this.printMsg('showErrorMsgUpdate');
      }

    },
    onSelectedSeason(value) {
        this.seasonId = value.seasonId;
        this.getSeasonData(this.seasonId);
    },

   async updateDropdown() {
       let newSeasons = await seasonService.findAll();
       let option = [];
        for(var i = 0; i < newSeasons._embedded.seasonModelList.length; i++) {
          if(i === 0) {
              option[i] = {
                  value: null,
                  text: "Please pick a season",
                  disabled: true
              }
          }
          option[i+1] = {
              value: newSeasons._embedded.seasonModelList[i],
              text: newSeasons._embedded.seasonModelList[i].name
          }
      }
      this.options = option;
      this.preselect = null;

    },


    async getSeasonData(id) {
        let seasonData = await seasonService.getSeason(id);

        this.inputs[0].value = seasonData.name;
        this.inputs[1].value = seasonData.description;
        this.inputs[2].value = seasonData.startDate;
        this.inputs[3].value = seasonData.endDate;
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
      image: require(`@/assets/action-adult-athletes-1657332.jpg`),
      size: 12,
      options: [],
      seasonId : '',
      preselect : null,

      inputs: [
        {
          title: "Season",
          placeholder: "Season name",
          type: "text",
          required: true,
          value: '',
          icon: "fas fa-running"
        },
        {
          title: "Description",
          placeholder: "Enter a description",
          type: "text",
          required: true,
          icon: "fas fa-user"
        },
        {
          title: "Start date",
          placeholder: "Enter startDate",
          type: "date",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        },
        {
          title: "End date",
          placeholder: "Enter endDate",
          type: "date",
          required: true,
          disabled: false,
          icon: "fas fa-layer-group"
        }
      ]
    };
  }
};
</script>

<style>
</style>