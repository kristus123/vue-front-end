<template>
  <div>
    

        <hr class="pretty" />
      <p style="color:grey;">the best owner who ever lived</p>
        <!-- <p>owner:</p> -->
        <h3 v-if="owner !== null">{{owner.person.firstName + " " + owner.person.lastName }}</h3>
        <p>🏅🏅🏅</p>
        <!-- <router-link to = "/admin/update/person" >
          <b-button variant="outline" >update</b-button>
        </router-link> -->
        <hr class="pretty" />
  <hr>
        <!-- <hr style="margin:40px;"> -->


    <b-row>
      <b-col cols="8">
        <b-container>
          <!-- <h3>Teams that has no owner </h3> -->
          <!-- {{teamOptions}} -->
         <h3 style="padding-bottom:20px;" > teams for sale </h3>
          <div v-for="team in teamOptions" v-bind:key="team.teamId">
            <b-card style="margin-bottom:20px;" v-if="!team.sold">
              <h3>{{team.name}}</h3>
              <p style="color:grey;">$500.000</p>
              <hr class="pretty" />
              <b-button
                @click="() => sellTeamTo(team, owner.ownerId)"
                variant="primary"
              >Assign team
                <i class="fas fa-shopping-cart"></i>
              </b-button>
            </b-card>
            <!-- <hr class="pretty" > -->
          </div>

          <!-- <flexible-form
            :inputs="inputs"
            width="100%"
            :image="image"
            :color="textColor"
            @clicked="submitForm"
          >
            <template v-slot:personDropdown>
              <b-form-row class="justify-content-center">
                <b-col cols="8">
                  <b-form-group class="text-black" label="Pick a team" style="text-align: left;">
                    <b-input-group>
                      <form-select
                        :options="teamOptions"
                        :preselect="selectedTeam"
                        v-on:DropDownValue="onSelectedTeam"
                      />
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-form-row>
            </template>
          </flexible-form>-->
        </b-container>
      </b-col>
      <b-col cols="4">
          <hr style="padding-bottom:30px;">
        <b-card>
          <h3>Owned teams</h3>
          <hr class="pretty" />
          <!-- {{ownerOf}} -->
          <ul v-for="team in ownerOf" v-bind:key="team.teamId">
            <DeleteOwner :team="team" @update="updateLists" />
          </ul>
        </b-card>

        <!-- <b-card v-if="owner !== null">
          <h3>Updating {{owner.person.firstName}}</h3>
          <ul>
            <li>{{owner.person.address.addresses[0]}}</li>
            <li>{{owner.person.address.postalCode}}</li>
            <li>{{owner.person.address.city}}</li>
            <li>{{owner.person.address.country}}</li>
          </ul>
        </b-card>-->
      </b-col>
    </b-row>
    <!-- <hr style="margin-top:60px;" class="pretty" > -->
    <!-- <b-button @click="updateLists" variant="danger">Something messy happened ?</b-button> -->
  </div>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import ownerService from "@/services/owner/OwnerService.js";
import DeleteOwner from "@/components/admin/owner/DeleteOwner";
import teamService from "@/services/team/TeamService";
import FormSelect from "@/components/forms/FormSelect";

export default {
  components: { FlexibleForm, DeleteOwner, FormSelect },

  async beforeMount() {
    this.owner = await ownerService.findById(this.$route.params.id);
    this.ownerOf = await ownerService.findAllOwnedTeams(this.$route.params.id);
    Array.from(await teamService.findTeamsWithNoOwner()).forEach(team => {
      console.log(team);
      this.teamOptions.push({
        id: team.teamId,
        name: team.association.name,
        sold: false
      });
    });
  },

  methods: {

    async updateLists() {
      // setInterval( () => {
      //   console.log("hello")
      // }, 1000 )
      this.ownerOf = await ownerService.findAllOwnedTeams(this.$route.params.id);

      this.teamOptions = [];

      Array.from(await teamService.findTeamsWithNoOwner()).forEach(team => {
        console.log(team);
        this.teamOptions.push({
          id: team.teamId,
          name: team.association.name,
          sold: false
        });
      })
    },



    async sellTeamTo(team, ownerId) {
      team.sold = true;
      await ownerService.makeOwnerOwnerOf(ownerId, team.id);
      this.updateLists();
    },
    async submitForm(value) {
      //ownerService.create(value);
      console.log(this.selectedTeam);
      console.log(this.$route.params.id);

      console.log(
        await ownerService.makeOwnerOwnerOf(
          this.$route.params.id,
          this.selectedTeam
        )
      );

      // ownerService.create(this.$route.params.id, this.selectedTeam);
      // location.reload();
    },
    onSelectedTeam(value) {
      console.log(value);
      this.selectedTeam = value;
    }
  },

  data() {
    return {
      teamOptions: [],
      owner: null,
      ownerOf: [],
      selectedTeam: null,
      textColor: "text-black",
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),
      inputs: []
    };
  }
};
</script>

<style scoped>
</style>