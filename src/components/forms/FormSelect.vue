<template>
    <b-form-select v-model="selected" :options="options" v-on:change="sendSelected"></b-form-select>
</template>

<script>
export default {
    name: 'FormSelect',

    props: ["options"],

    beforeMount: function() {
        console.log(this.options);

    },

    data() {
        return {
            selected: null,
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