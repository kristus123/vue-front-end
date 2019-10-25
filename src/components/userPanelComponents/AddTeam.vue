<template>
  <div>
    <div id="overlay" @click="off">
      <div id="overlay-center">
        <div v-if="step === 1">
          <div v-for="association in associations" v-bind:key="association.associationId">
            <list-of-all-associations :association="association">
              <b-button
                variant="outline-primary"
                @click="() => selectAssociation(association)"
              >select this association</b-button>
            </list-of-all-associations>
          </div>
        </div>

        <div v-if="step === 2">
          <div v-for="coach in coaches" v-bind:key="coach.coachId">
            <coach-card :coach="coach">
              <hr />
              <b-button
                variant="outline-primary"
                @click="() => selectCoach(coach)"
              >select this coach</b-button>
            </coach-card>
          </div>
        </div>

        <div v-if="step === 3">
          <!-- OWNER -->
          <div v-for="owner in owners" v-bind:key="owner.ownerId">
            <owner-card :owner="owner">
              <b-button
                variant="outline-primary"
                @click="() => selectOwner(owner)"
              >select this owner</b-button>
            </owner-card>
          </div>
        </div>

        <div v-if="step === 4">
          <div v-for="location in locations" v-bind:key="location.locationId">
            <location-card :location="location">
              <b-button
                variant="outline-primary"
                @click="() => selectLocation(location)"
              >select this location</b-button>
            </location-card>
          </div>
        </div>
      </div>
    </div>

    <hr class="pretty" />
    <h1>create a new Team</h1>
    <hr class="pretty" />

    <h2>Step {{step}}</h2>
    <hr style="max-width:20%;" class="pretty" />

    <h1 v-if="$store.state.team.association">{{$store.state.team.association.name}}</h1>
    <h1 v-if="$store.state.team.coach">{{$store.state.team.coach.person.firstName}}</h1>
    <h1 v-if="$store.state.team.owner">{{$store.state.team.owner.person.firstName}}</h1>
    <h1 v-if="$store.state.team.location">{{$store.state.team.location.name}}</h1>

    <div v-if="step === 1">
      <b-button variant="outline-primary" @click="on">select an association</b-button>
      <hr style="max-width:20%;" class="pretty" />
    </div>

    <div v-if="step === 2">
      <hr style="max-width:20%;" class="pretty" />
      <b-button v-if="step === 2" variant="outline-primary" @click="on">select a coach for this team</b-button>
    </div>

    <div v-if="step === 3">
      <hr style="max-width:20%;" class="pretty" />
      <b-button
        v-if="step === 3"
        variant="outline-primary"
        @click="on"
      >select an owner for this team</b-button>
    </div>

    <div v-if="step === 4">
      <hr style="max-width:20%;" class="pretty" />
      <b-button
        v-if="step === 4"
        variant="outline-primary"
        @click="on"
      >select a location for this team</b-button>
    </div>

    <div v-if="step === 5">
      <hr class="pretty" />
      <b-button variant="outline-success" @click="submit">SUBMIT</b-button>
    </div>

  <div v-if="step === 6">
    <h1 v-if="response !== null">
    {{response}}

    </h1>

  </div>

  </div>
</template>

<script>
// import teamService from "@/services/team/TeamService.js";
// import coachService from "@/services/coach/CoachService.js";
// import ownerService from "@/services/owner/OwnerService.js";
// import FlexibleForm from "@/components/forms/FlexibleForm";
// import PlayerCard from "@/components/cards/player/PlayerCard";
// import playerService from "@/services/player/PlayerService.js";
// import AddCoach from "@/components/admin/coach/AddCoach";
// import AddCoachModal from "@/components/userPanelComponents/AddCoachModal";

import AddAssociation from "@/components/admin/association/AddAssociation";
import GenericCard from "@/components/cards/reusables/GenericCard";
import coachService from "@/services/coach/CoachService.js";
import CoachCard from "@/components/admin/coach/CoachCard";
import OwnerCard from "@/components/admin/owner/OwnerCard";
import LocationCard from "@/components/admin/location/LocationCard";

import associationService from "@/services/association/AssociationService.js";

// // import  SortTeamPosition from '@/components/userPanelComponents/SortTeamPosition';
import ListOfAllAssociations from "@/components/admin/association/ListOfAllAssociations";
import locationService from "@/services/location/LocationService";
import ownerService from "@/services/owner/OwnerService.js";
import teamService from "@/services/team/TeamService";
export default {
  async beforeMount() {
    this.coaches = await coachService.findAll();
    this.associations = await associationService.findAll();
    this.owners = await ownerService.findAll();
    this.locations = await locationService.findAll();
  },
  components: {
    AddAssociation,
    ListOfAllAssociations,
    CoachCard,
    OwnerCard,
    LocationCard
  },
  methods: {
    async submit() {
      const jsonObject = {
        ownerId: this.$store.state.team.owner.ownerId,
        locationId: this.$store.state.team.location.locationId,
        associationId: this.$store.state.team.association.associationId,
        coachId: this.$store.state.team.coach.coachId
      };
      console.log(jsonObject)
      this.response = await teamService.create(jsonObject);
      this.$store.state.team.owner = null;
      this.$store.state.team.location = null;
      this.$store.state.team.association = null;
      this.$store.state.team.coach = null;
      this.step++;

    },
    selectLocation(location) {
      this.$store.state.team.location = location;
      this.step++;
    },
    selectCoach(coach) {
      this.$store.state.team.coach = coach;
      this.step++;
    },
    selectOwner(owner) {
      this.$store.state.team.owner = owner;
      this.step++;
    },
    on() {
      document.getElementById("overlay").style.display = "block";
    },
    off() {
      document.getElementById("overlay").style.display = "none";
    },

    selectAssociation(association) {
      this.$store.state.team.association = association;
      this.step++;
    }
  },
  data() {
    return {
      step: 1,
      associations: [],
      coaches: [],
      owners: [],
      locations: [],
      response : null
    };
  }
};
</script>

<style>
.modal-input {
  max-width: 50%;
}
.input-group {
  margin: 20px;
}
.addTeam {
  max-width: 50%;
}

.form {
  margin: 15px;
}

a.blue {
  color: rgb(89, 89, 255);
}

.my-1 {
  /* padding-bottom: 20px; */
}
#overlay-center {
  position: absolute;
  top: 50%;
  left: 55%;
  width: 50%;
  /* font-size: 50px; */
  /* color: white; */
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}

#overlay {
  position: fixed; /* Sit on top of the page content */
  display: none; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
  cursor: pointer; /* Add a pointer on hover */
}
</style>