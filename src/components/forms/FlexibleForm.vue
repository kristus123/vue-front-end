<template>
<form @submit.prevent="submitForm">
  <center>
    <div> <!-- style="padding:20px; margin-top:30px;" -->
      <b-card
        overlay
        :img-height="180 * inputs.length "
        
        img-src="https://images.pexels.com/photos/2799556/pexels-photo-2799556.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        text-variant="dark"
        :style="'max-width:' + width + ';'"
      >
        <div style="padding-top:40px;">
          <div style="margin-bottom:20px;" v-for="input in inputs" v-bind:key="input.key">
            <b-row class="my-1">
              <b-col sm="2">
                <label for="input-default" class="text-light">
                  <strong>
                    <h3 style="padding-bottom:5px;">{{input.title}}</h3>
                  </strong>
                </label>
              </b-col>
              <b-col sm="12">
                <b-form-input
                :type="input.type"
                  v-model="input.value"
                  :name="input.title"
                  :placeholder="input.placeholder"
                  required
                />
              </b-col>
            </b-row>
          </div>
        </div>

        <hr />
        <b-button type="submit" variant="primary">Search</b-button>
      </b-card>
    </div>
  </center>
</form>
</template>

<script>
export default {
  methods: {
    submitForm() {
      this.$emit("clicked", this.info);
      //e.preventDefault();
    }
  },
  props: ["inputs", "width"],
  data: function() {
    return {
      info: this.inputs
    };
  }
};
</script>

<style>
</style>