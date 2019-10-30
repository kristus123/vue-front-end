<template>
  <div>
    <b-card id="overlayDiv" v-if="missingData && loading">
      <h5>You need to create the following to be able to create a fully-fledged team</h5>
      <hr class="pretty" />
      <p>available coaches : {{coachOptions.length === 0 ? "❌": "✅"}}</p>
      <div v-if="coachOptions.length === 0">
        <router-link to="/admin/add/coach">
          <b-button style="margin-top:40px;" variant="outline-primary" size="sm">Create a new Coach</b-button>
        </router-link>
      </div>
      <hr class="pretty" />

      <p>available locations : {{locationOptions.length === 0 ? "❌": "✅"}}</p>

      <div v-if="locationOptions.length === 0">
        <router-link to="/admin/add/location">
          <b-button
            style="margin-top:40px;"
            variant="outline-primary"
            size="sm"
          >Create a new Location</b-button>
        </router-link>
      </div>

      <hr class="pretty" />

      <p>available owners : {{ownerOptions.length === 0 ? "❌": "✅"}}</p>

      <div v-if="ownerOptions.length === 0">
        <router-link to="/admin/add/owner">
          <b-button style="margin-top:40px;" variant="outline-primary" size="sm">Create a new owner</b-button>
        </router-link>
      </div>

      <hr class="pretty" />
    </b-card>

    <b-container>
      <h1>Add a team</h1>
      <b-spinner v-if="loading" variant="primary" label="Spinning"></b-spinner>
      <b-row class="justify-content-center">
        <b-col cols="12">
          <flexible-form
            :image="image"
            :color="textColor"
            :showBtns="onShowBtns"
            @clicked="submitForm"
          >
            <template v-slot:firstDropdown>
              <b-form-row class="justify-content-center">
                <b-col cols="8">
                  <b-form-group
                    class="text-white"
                    label="Pick an association"
                    style="text-align: left;"
                  >
                    <b-input-group>
                      <b-input-group-prepend>
                        <span class="input-group-text">
                          <i class="fas fa-arrows-alt"></i>
                        </span>
                      </b-input-group-prepend>
                      <form-select
                        :options="associationOptions"
                        :preselect="associationPreselect"
                        v-on:DropDownValue="onSelectAssociation"
                      />
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-form-row>
            </template>

            <template v-slot:personDropdown>
              <b-form-row class="justify-content-center">
                <b-col cols="8">
                  <b-form-group class="text-white" label="Pick a coach" style="text-align: left;">
                    <b-input-group>
                      <b-input-group-prepend>
                        <span class="input-group-text">
                          <i class="fas fa-user-shield"></i>
                        </span>
                      </b-input-group-prepend>
                      <form-select
                        :options="coachOptions"
                        :preselect="coachPreselect"
                        v-on:DropDownValue="onSelectCoach"
                      />
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-form-row>
            </template>

            <template v-slot:teamDropdown>
              <b-form-row class="justify-content-center">
                <b-col cols="8">
                  <b-form-group class="text-white" label="Pick an owner" style="text-align: left;">
                    <b-input-group>
                      <b-input-group-prepend>
                        <span class="input-group-text">
                          <i class="fas fa-user-tie"></i>
                        </span>
                      </b-input-group-prepend>
                      <form-select
                        :options="ownerOptions"
                        :preselect="ownerPreselect"
                        v-on:DropDownValue="onSelectOwner"
                      />
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-form-row>
            </template>

            <template v-slot:dropdown>
              <b-form-row class="justify-content-center">
                <b-col cols="8">
                  <b-form-group
                    class="text-white"
                    label="Pick a location"
                    style="text-align: left;"
                  >
                    <b-input-group>
                      <b-input-group-prepend>
                        <span class="input-group-text">
                          <i class="fas fa-map-marked-alt"></i>
                        </span>
                      </b-input-group-prepend>
                      <form-select
                        :options="locationOptions"
                        :preselect="locationPreselect"
                        v-on:DropDownValue="onSelectLocation"
                      />
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-form-row>
            </template>
          </flexible-form>

          <b-row id="showSuccessMsg" class="justify-content-center">
            <b-col cols="7">
              <b-alert variant="success" show>You have successfully added a team.</b-alert>
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
  </div>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import FormSelect from "@/components/forms/FormSelect";

import associationService from "@/services/association/AssociationService.js";
import locationService from "@/services/location/LocationService";
import ownerService from "@/services/owner/OwnerService.js";
import teamService from "@/services/team/TeamService";
import coachService from "@/services/coach/CoachService";

import animateService from "@/services/AnimateService";

export default {
  async beforeMount() {
    await this.getAssociations();
    await this.getCoaches();
    await this.getOwners();
    await this.getLocations();
    this.loading = false;
  },

  mounted: function() {
    document.getElementById("showSuccessMsg").setAttribute("hidden", "");
    document.getElementById("showErrorMsg").setAttribute("hidden", "");
  },

  components: {
    FlexibleForm,
    FormSelect
  },
  methods: {
    missingData() {
      if (
        coachOptions.length === 0 ||
        locationOptions.length === 0 ||
        ownerOptions.length === 0
      ) {
        return true;
      }
      
      return false;
    },
    async submitForm() {
      const teamObject = {
        associationId: this.associationPreselect,
        coachId: this.coachPreselect,
        ownerId: this.ownerPreselect,
        locationId: this.locationPreselect
      };

      let response = await teamService.create(teamObject);
      if (response.status === 201) {
        this.printMsg("showSuccessMsg", true);
      } else {
        this.printMsg("showErrorMsg");
      }
    },

    async getAssociations() {
      let associations = await associationService.findAll();
      await this.filterAssociations(associations);
    },

    async filterAssociations(associations) {
      let teams = await teamService.findAll();
      let filterOptions = [];
      let options = [];
      for (var i = 0; i < associations.length; i++) {
        if (
          !teams.some(
            item =>
              item.association.associationId === associations[i].associationId
          )
        ) {
          filterOptions.push(associations[i]);
        }
      }

      for (var i = 0; i < filterOptions.length; i++) {
        if (i === 0) {
          options[i] = {
            value: null,
            text: "Please pick an association",
            disabled: true
          };
        }
        options[i + 1] = {
          value: filterOptions[i].associationId,
          text: filterOptions[i].name,
          disabled: false
        };

        this.associationOptions = options;
      }
    },

    async getCoaches() {
      let coaches = await coachService.findAll();
      await this.filterCoaches(coaches);
    },

    async filterCoaches(coaches) {
      let teams = await teamService.findAll();
      let filterOptions = [];
      let options = [];

      for (var i = 0; i < coaches.length; i++) {
        if (!teams.some(item => item.coach.coachId === coaches[i].coachId)) {
          filterOptions.push(coaches[i]);
        }
      }

      for (var i = 0; i < filterOptions.length; i++) {
        if (i === 0) {
          options[i] = {
            value: null,
            text: "Please pick a coach",
            disabled: true
          };
        }

        options[i + 1] = {
          value: filterOptions[i].coachId,
          text:
            filterOptions[i].person.firstName +
            " " +
            filterOptions[i].person.lastName,
          disabled: false
        };
      }

      this.coachOptions = options;
    },

    async getOwners() {
      let owners = await ownerService.findAll();
      let options = [];

      for (var i = 0; i < owners.length; i++) {
        if (i === 0) {
          options[i] = {
            value: null,
            text: "Please pick an owner",
            disabled: true
          };
        }

        options[i + 1] = {
          value: owners[i].ownerId,
          text: owners[i].person.firstName + " " + owners[i].person.lastName,
          disabled: false
        };
      }

      this.ownerOptions = options;
    },

    async getLocations() {
      let locations = await locationService.findAll();
      await this.filterLocations(locations);
    },

    async filterLocations(locations) {
      let teams = await teamService.findAll();
      let filterOptions = [];
      let options = [];

      for (var i = 0; i < locations.length; i++) {
        if (
          !teams.some(
            item => item.location.locationId === locations[i].locationId
          )
        ) {
          filterOptions.push(locations[i]);
        }
      }

      for (var i = 0; i < filterOptions.length; i++) {
        if (i === 0) {
          options[i] = {
            value: null,
            text: "Please pick a location",
            disabled: true
          };
        }

        options[i + 1] = {
          value: filterOptions[i].locationId,
          text: filterOptions[i].name,
          disabled: false
        };
      }

      this.locationOptions = options;
    },

    printMsg(element, success) {
      document.getElementById(element).removeAttribute("hidden");
      animateService.animate(element, "fadeInDown", null, () => {
        animateService.animate(element, "fadeOutUp", "delay-2s", () => {
          if (success) {
            document.getElementById(element).setAttribute("hidden", "");
            this.$router.go(-1);
          } else {
            document.getElementById(element).setAttribute("hidden", "");
          }
        });
      });
    },

    onSelectAssociation(value) {
      this.associationPreselect = value;
    },

    onSelectCoach(value) {
      this.coachPreselect = value;
    },

    onSelectOwner(value) {
      this.ownerPreselect = value;
    },

    onSelectLocation(value) {
      this.locationPreselect = value;
    }
  },
  data() {
    return {
      loading: true,
      onShowBtns: true,
      textColor: "text-white",
      image: require(`@/assets/activity-athletes-blue-262524.jpg`),

      associationOptions: [],
      associationPreselect: null,

      coachOptions: [],
      coachPreselect: null,

      ownerOptions: [],
      ownerPreselect: null,

      locationOptions: [],
      locationPreselect: null
    };
  }
};
</script>

<style>
#overlayDiv {
  position: fixed;
  width: 80%;
  top: 20px;
  left: 150px;
  height: 80%;
  z-index: 99;
}
</style>