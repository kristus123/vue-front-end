<template>

        <b-card v-if="info != null">
            <b-row class="justify-content-center">
                <b-col cols="12">
                    <h4>{{info.firstName}} {{info.lastName}}</h4>
                    <hr style="margin: 20px;"/>
                </b-col>
            </b-row>
            <b-row class="justify-content-center">
                <b-col cols="10" style="text-align: left;">
                    <p><strong>Person ID: </strong>{{info.personId}}</p>
                    <p v-for="address in info.address.addresses" :key="address.key"><strong>Address: </strong>{{address}}</p>
                    <p><strong>Postal code: </strong>{{info.address.postalCode}}</p>
                    <p><strong>City: </strong>{{info.address.city}}</p>
                    <p><strong>Country: </strong>{{info.address.country}}</p>
                    <p><strong>Date of birth: </strong>{{info.dateOfBirth}}</p>
                </b-col>
            </b-row>
        </b-card>

</template>

<script>
export default {
    name: 'PersonCard',

    props:['info'],

    data() {
        return {

            

        }
    },
    methods: {
        
    }
    
}
</script>

<style>

</style>