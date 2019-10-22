<template>
  <b-container>
    <h1>Add a season</h1>
    <flexible-form
      :inputs="inputs"
      width="100%"
      :image="image"
      :color="textColor"
      :size="size"
      @clicked="submitForm"
    />
    
    <b-row id="showSuccessMsg" class="justify-content-center">
        <b-col cols="10">
            <b-alert variant="success" show>You have successfully added a season</b-alert>
        </b-col>
    </b-row>

    <b-row id="showErrorMsg" class="justify-content-center">
        <b-col cols="10">
            <b-alert variant="danger" show>Something went wrong. Please try again later.</b-alert>
        </b-col>
    </b-row>


  </b-container>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import seasonService from "@/services/season/SeasonService";

import animateService from '@/services/AnimateService'

export default {
  components: {
    FlexibleForm
  },

  mounted: function() {
    document.getElementById('showSuccessMsg').setAttribute("hidden", "");
    document.getElementById('showErrorMsg').setAttribute("hidden", "");
  },

  methods: {
    async submitForm(value) {
      let response = await seasonService.create(value);
      if(response.status === 201) {
        this.printMsg('showSuccessMsg');
      } else {
        this.printMsg('showErrorMsg');
      }
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
      inputs: [
        {
          title: "Season",
          placeholder: "Season name",
          type: "text",
          required: true,
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