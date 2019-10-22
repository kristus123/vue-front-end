<template>
  <div>
    <form-select :options="options" :preselect="null" v-on:DropDownValue="addPlayerToTeam" />
  </div>
</template>

<script>
import FormSelect from "@/components/forms/FormSelect";
export default {
  props: ["position", 'options'],
  methods: {
    addPlayerToTeam(value) {
      console.log(value);
      value.normalPosition = this.position;
      //console.log(this.position);
      this.$emit("addPlayerToTeam", value);
      //   value.position = this.position;
      //this.$emit("addPlayerToTeam", value);
    }
  },
  data() {
    return {
    };
  },
  components: { FormSelect }
};
</script>

<style>
</style>