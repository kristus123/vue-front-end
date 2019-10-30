<template>
    <b-container>
        <h1>Database</h1>
        <b-row class="justify-content-center">
            <b-col cols="8">
                <b-card-header>
                    <h6 style="color:black">Rollback database to day '0'</h6>
                </b-card-header>
                <b-card>
                <b-card-body>
                    <b-btn v-b-modal="'dropDatabase'" variant="danger" size="lg">Remove <strong><u>ALL</u></strong> <i class="fas fa-undo-alt"></i></b-btn>
                </b-card-body>
                </b-card>
            </b-col>
        </b-row>
        <b-modal centered :hide-footer="true" :hide-header="true" size="lg" id="dropDatabase">
            <b-row class="justify-content-center">
                <b-col cols="6">
                    <h3 style="color:black">Are you absolutely sure you want to <u>delete everything</u>?</h3>
                </b-col>
            </b-row>
            <b-row align-h="center" v-if="!onShowInput">
                <b-col cols="3" >
                    <b-btn variant="danger" v-on:click="deleteDB">Delete <strong><u>EVERYTHING</u></strong></b-btn>
                </b-col>
            </b-row>

            <b-row align-h="center" v-if="onShowInput">
                <b-col cols="5" >
                    <p>Please enter 'CONFIRM' <b-input type="text" v-model="input"></b-input> </p>
                    
                </b-col>
            </b-row>
            <b-row align-h="center" v-if="inputState">
                <b-col cols="2" >
                    <b-btn variant="danger"><u>DELETE</u></b-btn>
                </b-col>
            </b-row>
        </b-modal>
    </b-container>
    
</template>

<script>

export default {

    methods : {
        deleteDB(){
            this.onShowInput = true;
        },
        validateInput() {
            return this.input === 'CONFIRM' ? true: false;
        }
    },

    watch: {
        input: function () {
            this.inputState = this.validateInput();
        }
    },

    data() {
        return {
            onShowInput: false,
            input: '',
            inputState: false,
        }
    }
    
}
</script>

<style>

div#dropDatabase.modal.fade.show {
    background-color: rgba(255,0,0,0.3);
}


</style>