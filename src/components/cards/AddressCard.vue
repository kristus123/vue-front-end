<template>
  <div>
    <center>
      <hr class="pretty" />

      <b-input style="max-width:40%" placeholder="Search for an address" />
      <hr class="pretty" />
    </center>

    <!-- overlay img-src="https://picsum.photos/900/250/?image=3" -->
    <b-card class="overflow-hidden" style="max-width: 300px;">
      <b-row no-gutters>
        <!-- <b-col md="6"> -->
        <b-card-body>
          <!-- <h1>hei</h1> -->
          <ul>
            <li>{{address}}</li>
            <li>5306</li>
            <li>erdal</li>
            <li>Norge</li>

            <hr />
            <router-link to="/admin/update/address/5">
              <b-button style="margin:10px;" variant="primary">Update</b-button>
            </router-link>
            <br />
            <b-button variant="danger">Delete</b-button>
          </ul>
        </b-card-body>
        <!-- </b-col> -->
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["address"]
};
</script>

<style>
</style>