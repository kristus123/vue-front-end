<template>
<div>
    <b-form-row class="justify-content-center" v-for="input in inputs" :key="input.key">
        <b-col cols="8">
            <b-form-group class="text-white" :label="input.title" style="text-align:left;">
                <b-input-group>
                    <b-input-group-prepend>
                      <span class="input-group-text"><i :class="input.icon"></i></span>
                    </b-input-group-prepend>
                    <b-form-input :type="input.type" v-model="input.value" :placeholder="input.placeholder" :required="input.required" :disabled="input.disabled"></b-form-input>
                </b-input-group>
            </b-form-group>
        </b-col>
    </b-form-row>
</div>
</template>

<script>
export default {
    name:'FlexibleInputs',
    props:["inputs"]
    
}
</script>

<style>

</style>