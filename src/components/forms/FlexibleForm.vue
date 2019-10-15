<template>
  <b-container :style="{width: width}">
    <b-row class="justify-content-center">
      <b-col cols="8">
        <div class="flexForm" :style="{backgroundImage: 'url(' + image + ')'}">
          <b-form class="addPlayerForm" v-on:submit.prevent="submitForm">
            <b-form-row class="justify-content-center" v-for="input in inputs" :key="input.key">
              <b-col cols="8">
                <b-form-group :class="color" :label="input.title" style="text-align:left;">
                  <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text"><i :class="input.icon"></i></span>
                    </b-input-group-prepend>
                    <b-form-input :type="input.type" v-model="input.value" :placeholder="input.placeholder" :required="input.required" :disabled="input.disabled"></b-form-input>
                  </b-input-group>
                  </b-form-group>
                </b-col>
              </b-form-row>

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

              <b-form-row class="justify-content-center">
                <b-col cols="12" md="auto" style="padding:20px;">
                  <b-btn id="subBtn" type="submit" variant="success" value="submit">Submit</b-btn>
                  <b-btn id="resetBtn" type="reset" variant="danger" value="reset" v-on:click="resetForm">Reset</b-btn>
                </b-col>
                </b-form-row>
            </b-form>
          </div>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
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
  props: ["inputs", "width", "color", "image"],
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

.addPlayerForm {
  padding-top: 20px;
  padding-bottom: 20px;
}


</style>