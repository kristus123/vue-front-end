<template>
    <b-form-select v-model="selected" :options="options" :preselect="preselect" v-on:change="sendSelected"></b-form-select>
</template>

<script>
export default {
    name: 'FormSelect',

    props: ["options", "preselect"],

    data() {
        return {
            selected: this.preselect === null ? null : this.preselect,
        }
    },

    methods: {
        sendSelected() {
            this.$emit('DropDownValue', this.selected);
        }
    }
    
}
</script>

<style>

</style>