<template>
    <b-container>
        <h1>Goal type</h1>
        <b-row class="justify-content-center">
            <b-col cols="12">
                <flexible-form :image="image" :showBtns="onShowBtns" @clicked="submitForm" @reset="resetForm">

                     <template v-slot:firstDropdown v-if="showDropdown">
                        <b-form-row class="justify-content-center">
                            <b-col cols="9">
                                <b-form-group class="text-white" label="Pick a goal type" style="text-align: left;">
                                    <b-input-group>
                                            <b-input-group-prepend>
                                                <span class="input-group-text"><i class="fas fa-crosshairs"></i></span>
                                            </b-input-group-prepend>
                                        <form-select :options="goalTypeOptions" :preselect="goalTypePreselect" v-on:DropDownValue="onSelectGoalType"/>
                                        <b-input-group-append>
                                            <b-btn variant="primary" v-on:click="newGoalType">Create new</b-btn>
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group>
                            </b-col>
                        </b-form-row>
                     </template>

                     <template v-slot:newForm v-if="showInput">
                         <flexible-inputs :inputs="inputs" :color="color"/>
                     </template>
                </flexible-form>

                <b-row id="showSuccessMsg" class="justify-content-center">
                    <b-col cols="7">
                        <b-alert variant="success" show>You have successfully created a goal type</b-alert>
                    </b-col>
                </b-row>

                <b-row id="showSuccessMsgUpdate" class="justify-content-center">
                    <b-col cols="7">
                        <b-alert variant="success" show>You have successfully updated a goal type</b-alert>
                    </b-col>
                </b-row>

                <b-row id="showErrorMsg" class="justify-content-center">
                    <b-col cols="7">
                        <b-alert variant="danger" show>Something went wrong. Please try again later.</b-alert>
                    </b-col>
                </b-row>

            </b-col>
        </b-row>
    </b-container>
</template>

<script>

import FlexibleForm from "@/components/forms/FlexibleForm"
import FormSelect from "@/components/forms/FormSelect"
import FlexibleInputs from "@/components/forms/inputs/FlexibleInputs"

import GoalTypeService from "@/services/goalType/GoalTypeService"
import animateService from '@/services/AnimateService'

export default {
    components: {
        FlexibleForm,
        FormSelect,
        FlexibleInputs
    },

    beforeMount: function () {
        this.getGoalTypes();

    },

    mounted: function() {
        document.getElementById('showSuccessMsg').setAttribute("hidden", "");
        document.getElementById('showSuccessMsgUpdate').setAttribute("hidden", "");
        document.getElementById('showErrorMsg').setAttribute("hidden", "");
    },

    methods: {
        async submitForm() {
            let goalTypeObject = {
                typeName: this.inputs[0].value
            }
            if(this.update) {
                let response = await GoalTypeService.update(goalTypeObject,this.goalTypePreselect.goalTypeId);
                if(response.status === 201) {
                    this.resetForm();
                    this.getGoalTypes();
                    this.printMsg('showSuccessMsgUpdate');

                } else {
                    this.printMsg('showErrorMsg');
                }
            } else {
                let response = await GoalTypeService.create(goalTypeObject);
                if(response.status === 201) {
                    this.resetForm();
                    this.getGoalTypes();
                    this.showDropdown = true;
                    this.printMsg('showSuccessMsg');
                    
                } else {
                    this.printMsg('showErrorMsg');
                }
            }
        },

        resetForm() {
            this.inputs[0].value = '';
            this.goalTypePreselect = null;
            this.onShowBtns = false;
            this.showInput = false;
            this.showDropdown = true;
            this.update = false;
        },

        onSelectGoalType(value) {
            this.update = true;
            this.showDropdown = false;
            this.showInput = true;
            this.onShowBtns = true;
            this.goalTypePreselect = value;
            this.inputs[0].value = value.typeName;
        },

        newGoalType() {
            this.showDropdown = false;
            this.showInput = true;
            this.onShowBtns = true;
        },

        async getGoalTypes() {
            let types = await GoalTypeService.findAll();
            let option = [];
            for(var i = 0; i < types._embedded.goalTypeModelList.length; i++) {
                delete types._embedded.goalTypeModelList[i]._links;
                if(i === 0) {
                    option[i] = {
                        value: null,
                        text: 'Please pick a goal type',
                        disabled: true
                    }
                }

                option[i+1] = {
                    value: types._embedded.goalTypeModelList[i],
                    text: types._embedded.goalTypeModelList[i].typeName,
                    disabled: false
                }
            }
            this.goalTypeOptions = option;
        },

        printMsg(element) {
            document.getElementById(element).removeAttribute("hidden");
                animateService.animate(element, 'fadeInDown', null, () => {
                    animateService.animate(element, 'fadeOutUp', 'delay-2s', () => {
                        document.getElementById(element).setAttribute("hidden", "");
                    });
                });
        }
    },

    data() {
        return {
            image: require(`@/assets/ball-blur-championship-209841.jpg`),
            onShowBtns: false,
            showInput: false,
            showDropdown: true,
            update: false,
            
            color: 'text-white',
            goalTypePreselect: null,

            goalTypeOptions: [],
            inputs: [
                {
                    title: "Goal type",
                    placeholder: "Type in a goal type",
                    type: "text",
                    value: '',
                    required: true,
                    disabled: false,
                    icon: "fas fa-crosshairs"
                },
            ]
        }
    }
}
</script>

<style>

</style>