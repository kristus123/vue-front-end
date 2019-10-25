<template>
  <b-container :style="{width: width}">
    <b-row class="justify-content-center">
      <b-col :cols="cols">
        <div class="flexForm" :style="{backgroundImage: 'url(' + image + ')'}">
          <b-form class="customForm" v-on:submit.prevent="submitForm">
            
            <slot name="firstDropdown"></slot>
            <slot name="personDropdown"></slot>
            <slot name="teamDropdown"></slot>

            <flexible-inputs :inputs="inputs" :color="color"/>

            <slot name="dropdown"></slot>
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

            <b-form-row class="justify-content-center" align-h="between" v-if="onShowBtns">
              <b-col cols="3">
                <b-btn pill id="subBtn" type="submit" variant="success" value="submit" size="lg">Submit</b-btn>
              </b-col>
              <b-col cols="3">
                <b-btn pill id="resetBtn" type="reset" variant="danger" size="lg" v-on:click="resetForm">Reset</b-btn>
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
    },
    resetForm() {
      this.$emit("reset", true);

    }
  },
  props: ["inputs", "width", "color", "image", "size", "showBtns"],

  components: {
    FlexibleInputs
  },

  watch: {
    showBtns: function () {
      this.onShowBtns = this.showBtns;
    }
  },

  data: function() {
    return {
      info: this.inputs,
      errorMsg: "Something went wrong!",
      showErrorMsg : false,
      showSuccessMsg: false,
      successMsg: "Successful!",
      cols: this.size === undefined ? 8 : this.size,
      onShowBtns: this.showBtns === undefined ? true : this.showBtns
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

div.input-group {
  margin: 0px !important;
}
</style>