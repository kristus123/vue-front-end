<template>
  <b-container class="bv-example-row" :class="opt" style="max-width: 370px;">
    <b-row>
      <!-- {{matchGoals}} -->
      <b-col class="description" :class="eventOpt + ' div-box'">
        <h5>
          <b>{{matchGoals.player.team.association.name}} scored a goal!</b>
        </h5>
        <br />
        <b>
          Goal:
          <span v-bind:id="hooverId">{{matchGoals.player.playername}}</span>
          {{matchGoals.goalType.typeName.replace("_", " ").toLowerCase()}}
        </b>
        <br />
        <br />
        {{matchGoals.description}}
        <b-popover
          v-bind:target="hooverId"
          triggers="hover"
          placement="right"
          boundary-padding="0"
          boundary="viewport"
        >
          <player-card :playerAttr="matchGoals.player" />
        </b-popover>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import PlayerCard from "@/components/cards/player/PlayerCard";
export default {
  props: ["matchGoals"],
  components: { PlayerCard },
  data() {
    return {
      eventOpt: "",
      opt: "",
      hooverId: "yupp"
    };
  },
  beforeMount() {
    if (
      this.matchGoals.player.team.teamId ==
      this.matchGoals.match.homeTeam.teamId
    ) {
      this.eventOpt = "eventLeft";
      this.opt = "floatleft";
    } else {
      
      this.opt = "floatright";
      this.eventOpt = "eventRight";
    }
    this.hooverId = this.matchGoals.goalId.toString(10);
  }
};
</script>

<style>
.div-box {
  padding: 1em;
  margin: 1em;
  text-align: left;
  border-radius: 30px;
  padding: 20px;
  text-align: left;
}
.eventRight {
  background: rgba(18, 74, 255, 0.8);
  color: white;
}

.eventLeft {
  background: rgba(237, 162, 0, 0.849);
  text-align: left;

}

.floatleft {
  float: left;
}

.floatright {
  float: right;
}

.b-popover {
  max-width: 100%;
}
</style>