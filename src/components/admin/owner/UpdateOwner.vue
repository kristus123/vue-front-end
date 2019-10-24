<template>
  <div>
    <b-row>
      <b-col cols="8">
        <b-container>
          <h1>Update</h1>
          <flexible-form
            :inputs="inputs"
            width="100%"
            :image="image"
            :color="textColor"
            @clicked="submitForm"
          />
        </b-container>
      </b-col>
      <b-col cols="4">
        <b-card>
          <h3>Other owned teams</h3>
          <hr class="pretty" />
          <ul v-for="team in ownerOf" v-bind:key="team.teamId">
            <DeleteOwner :team="team" />
          </ul>
        </b-card>
        <hr />
        
        <b-card v-if="owner !== null">
          <h3>Updating {{owner.person.firstName}}</h3>
          <ul>
            <li>{{owner.person.address.addresses[0]}}</li>
            <li>{{owner.person.address.postalCode}}</li>
            <li>{{owner.person.address.city}}</li>
            <li>{{owner.person.address.country}}</li>
          </ul>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import ownerService from "@/services/owner/OwnerService.js";
import DeleteOwner from "@/components/admin/owner/DeleteOwner";

export default {
  components: { FlexibleForm, DeleteOwner },

  async beforeMount() {
    this.owner = await ownerService.findById(this.$route.params.id);
    this.ownerOf = await ownerService.findAllOwnedTeams(this.$route.params.id);
    
    this.inputs[0].value = this.owner.ownerId
 },

  methods: {
    submitForm(value) {
      ownerService.create(value);
      
      location.reload();
      //playerService.create(value);
    }
  },

  data() {
    return {
      owner: null,
      ownerOf: null,
      textColor: "text-black",
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),
      inputs: [
        {
          title: "Owner ID",
          placeholder: "Select a person",
          type: "number",
          value:0,
          required: true,
          disabled: true,
          icon: "fas fa-running"
        },
        {
          title: "Team ID",
          placeholder: "Enter a team ID",
          type: "number",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        }
      ]
    };
  }
};
</script>

<style>
</style>