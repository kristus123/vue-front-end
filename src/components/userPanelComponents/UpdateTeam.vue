<template>
  <div>
      <h1>Update team</h1>
        <flexible-form :image="image" :inputs="inputs" :color="textColor" @clicked="submitForm" >
            <template v-slot:newForm >
                <b-form-row class="justify-content-center">
                    <b-col cols="8">

                        <b-form-group class="text-black" label="Pick location" style="text-align: left;">
                            <b-input-group> 
                                <b-input-group-prepend>
                                    <span class="input-group-text"><i class="fas fa-users"></i></span>
                                </b-input-group-prepend>
                            <form-select :options="locationOptions" :preselect="locationPreselect" v-on:DropDownValue="onSelectLocation"/>
                            </b-input-group>
                        </b-form-group>

                        <b-form-group class="text-black" label="Pick owner" style="text-align: left;">
                            <b-input-group> 
                                <b-input-group-prepend>
                                    <span class="input-group-text"><i class="fas fa-users"></i></span>
                                </b-input-group-prepend>
                            <form-select :options="ownerOptions" :preselect="ownerPreselect" v-on:DropDownValue="onSelectOwner"/>
                            </b-input-group>
                        </b-form-group>

                        <b-form-group class="text-black" label="Pick owner" style="text-align: left;">
                            <b-input-group> 
                                <b-input-group-prepend>
                                    <span class="input-group-text"><i class="fas fa-users"></i></span>
                                </b-input-group-prepend>
                            <form-select :options="coachOptions" :preselect="coachPreselect" v-on:DropDownValue="onSelectCoach"/>
                            </b-input-group>
                        </b-form-group>

                    </b-col>
                </b-form-row>
            </template>
        </flexible-form>
  </div>
</template>

<script>
import teamService from '@/services/team/TeamService'
import LocationService from "@/services/location/LocationService"
import CoachService from "@/services/coach/CoachService"
import OwnerService from "@/services/owner/OwnerService"
import AssociationService from "@/services/association/AssociationService"

import FlexibleForm from '@/components/forms/FlexibleForm'
import FormSelect from '@/components/forms/FormSelect'
export default {
    components: {
        FlexibleForm,
        FormSelect,
        OwnerService,
        CoachService,
        LocationService,
        AssociationService
    },
    
    async beforeMount() {
        this.team = await teamService.findById(this.$route.params.teamId);
        this.getLocations();
        this.getOwners();
        this.getCoaches();
        this.setOnLoadValues();
    },
    methods: {
        async submitForm(value) {

            let associationObject = {
                name: this.inputs[0].value,
                description: this.inputs[1].value
            }
            
            let assocStatus = await AssociationService._update(associationObject, this.team.association.associationId);
            
            let teamObject = {
                associationId: this.team.association.associationId,
                coachId: this.coachPreselect.coachId,
                ownerId: this.ownerPreselect.ownerId,
                locationId: this.locationPreselect.locationId
            };
            console.log(teamObject);
            console.log(this.team.teamId);

            let teamStatus = await teamService.update(teamObject, this.team.teamId);

            console.log(this.inputs[0].value);
        },
        async getCoaches() {
            let coaches = await CoachService.findAll();
            let coachOptions = [];
            for(var i = 0; i < coaches.length; i++) {
                delete coaches[i]._links;

                if(i === 0) {
                    coachOptions[i] = {
                        value: null,
                        text: 'Please pick a owner',
                        disabled: true
                    }
                }

                coachOptions[i+1] = {
                    value: coaches[i],
                    text: coaches[i].person.firstName + " " + coaches[i].person.firstName
                }
            }
            this.coachOptions = coachOptions;
        },
        async getOwners() {
            let owners = await OwnerService.findAll();
            let ownerOptions = [];
            for(var i = 0; i < owners.length; i++) {
                delete owners[i]._links;

                if(i === 0) {
                    ownerOptions[i] = {
                        value: null,
                        text: 'Please pick a owner',
                        disabled: true
                    }
                }

                ownerOptions[i+1] = {
                    value: owners[i],
                    text: owners[i].person.firstName + " " + owners[i].person.firstName
                }
            }
            this.ownerOptions = ownerOptions;
        },
        async getLocations() {
            let locations = await LocationService.findAll();
            let locationOption = [];

            for(var i = 0; i < locations.length; i++) {

                delete locations[i]._links;

                if(i === 0) {
                    locationOption[i] = {
                        value: null,
                        text: 'Please pick a location',
                        disabled: true
                    }
                }

                locationOption[i+1] = {
                    value: locations[i],
                    text: locations[i].name
                }
            }

            this.locationOptions = locationOption;
        },
        onSelectLocation(value) {
            this.locationPreselect = value;
        },
        onSelectOwner(value) {
            this.ownerPreselect = value;
        },
        onSelectCoach(value) {
            this.coachPreselect = value;
        },
        /* Set initial values into the input forms */
        setOnLoadValues() {
            this.locationPreselect = this.team.location;
            this.ownerPreselect = this.team.owner;
            this.coachPreselect = this.team.coach;
            this.inputs[0].value = this.team.association.name;
            this.inputs[1].value = this.team.association.description;
        }
    },
    
    data() {
        return {
            locationOptions: [],
            locationPreselect: null,
            ownerOptions: [],
            ownerPreselect: null,
            coachOptions: [],
            coachPreselect: null,

            team : null,
            
            image: require(`@/assets/action-adult-athlete-1311619.jpg`),
            textColor: 'text-black',
            inputs: [
                {
                title: "Team name",
                placeholder: "Enter team name",
                type: "text",
                required: true,
                value: '',
                disabled: false,
                icon: "fas fa-layer-group"
                },
                {
                title: "Team description",
                placeholder: "Enter a description",
                type: "text",
                required: true,
                value: '',
                disabled: false,
                icon: "fas fa-layer-group"
                }
            ],
        }
    }

}
</script>

<style>

</style>