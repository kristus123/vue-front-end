<template>
  <b-container>
    <b-row>
      <b-col cols="6">
        <h1>UPDATE COACH</h1>
        {{coach}}
        <flexible-form
          :inputs="inputs"
          width="100%"
          :image="image"
          :color="textColor"
          @clicked="submitForm"
        />
      </b-col>
      <b-col>
        <b-card>
          <h3>This coach is also coaching</h3>
          <hr class="pretty">
          <ul>
            <div v-for="team in teamsThatHeCoaches" v-bind:key="team.teamId">
              <delete-coach :team="team" />
            </div>
          </ul>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FlexibleForm from "@/components/forms/FlexibleForm";
import coachService from "@/services/coach/CoachService.js";
import DeleteCoach from '@/components/admin/coach/DeleteCoach'
export default {
  components: {
    FlexibleForm, DeleteCoach
  },

  async beforeMount() {
    this.coach = await coachService.findById(this.$route.params.coachId);
    this.teamsThatHeCoaches = await coachService.findAllTeamsThatHasCoach(
      this.$route.params.coachId
    );

    this.inputs[0].value = this.coach.coachId;
  },

  methods: {
    submitForm(value) {
      console.log("____________");
      coachService.update(value);
      console.log(value); // someValue
    }
  },

  data() {
    return {
      teamsThatHeCoaches: [],
      textColor: "text-black",
      image: require(`@/assets/action-adult-athlete-1311619.jpg`),

      inputs: [
        {
          title: "coachId",
          value: 0,
          placeholder: "Select a team",
          type: "number",
          required: true,
          disabled: true,
          icon: "fas fa-users"
        },
        {
          title: "Which team should the person coach ?",
          placeholder: "Select a team",
          type: "number",
          required: true,
          disabled: false,
          icon: "fas fa-users"
        }
      ],
      coach: null
    };
  }
};
</script>

<style scoped>
</style>