<template>
  <div class="generic-card">
    <div id="content">
      <b-card>
        <div style="float:left;">
          <slot name="left" />
        </div>

        <div style="float:right;">
          <router-link v-if="updateUrl" :to="updateUrl">
            <b-button variant="outline-warning" size="sm">Update</b-button>
          </router-link>
        </div>

        <slot />
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  props: ["updateUrl"],

};
</script>

<style>
#date {
  margin-right: 5px;
  position: relative;
  float: right;
}

.generic-card {
  padding: 20px;
  width: 80%;
}

#content {
  position: relative;
}
#upper-rigth img {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>