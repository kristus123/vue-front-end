<template>
  <b-container :style="{width: width}">
    <b-row class="justify-content-center">
      <b-col cols="8">
        <div class="flexForm" :style="{backgroundImage: 'url(' + image + ')'}">
          <b-form class="customForm" v-on:submit.prevent="submitForm">

            <flexible-inputs :inputs="inputs"/>

              <b-form-row class="justify-content-center">
                  <b-col cols="8">
                    <b-form-group :class="color" :label="slotTitle" style="text-align:left;">
                      <b-input-group>
                        <slot name="dropdown"></slot>
                        <b-input-group-append>
                          <slot name="button"></slot>
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </b-col>
              </b-form-row>

              <slot name="newForm"></slot>

              <b-form-row class="justify-content-center">
                <b-col cols="8">
                  <b-alert v-if="showErrorMsg" id="errMsg" show variant="danger">{{errorMsg}}</b-alert>
                </b-col>
              </b-form-row>

              <b-form-row class="justify-content-center">
                <b-col cols="8">
                  <b-alert v-if="showSuccessMsg" id="errMsg" show variant="success">{{successMsg}}</b-alert>
                </b-col>
              </b-form-row>

              <b-form-row class="justify-content-center" align-h="between">
                <b-col cols="3">
                  <b-btn pill id="subBtn" type="submit" variant="outline-success" value="submit" size="lg">Submit</b-btn>
                </b-col>
                <b-col cols="3">
                  <b-btn pill id="resetBtn" type="reset" variant="outline-danger" value="reset" size="lg" v-on:click="resetForm">Reset</b-btn>
                </b-col>
                </b-form-row>
            </b-form>
          </div>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>

import FlexibleInputs from '@/components/forms/inputs/FlexibleInputs'

export default {
  methods: {
    submitForm() {
      this.$emit("clicked", this.info);
      console.log(this.info);
    },
    resetForm() {
      document.querySelector('input').forEach(input => {
        console.log(input);
      });

    }
  },
  props: ["inputs", "width", "color", "image", "slotTitle"],

  components: {
    FlexibleInputs
  },

  data: function() {
    return {
      info: this.inputs,
      errorMsg: "Something went wrong!",
      showErrorMsg : false,
      showSuccessMsg: false,
      successMsg: "Successful!"
    };
  }
};
</script>

<style>

.flexForm {
  margin: 20px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
}

.customForm {
  padding-top: 20px;
  padding-bottom: 20px;
}


</style>