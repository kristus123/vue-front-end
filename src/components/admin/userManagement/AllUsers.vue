<template>
  <div>
    <h1>list of all users</h1>

    <router-link v-if="users.length !== 0" to="/admin/create/user">
      <b-button variant="primary">create new user</b-button>
    </router-link>
    <br />
    <br />
    <br />
    <table class="table" v-if="users.length !== 0">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">username</th>
          <th scope="col">access-rights</th>
          <th scope="col">Manage</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" v-bind:key="user.id">
          <th scope="row">
            <!-- <b-button>delete</b-button> -->
          </th>
          <td>{{user.username}}</td>
          <td>{{user.roles[0]}}</td>
          <td>
            <b-button
              v-if="user.roles[0] === 'STANDARD' "
              :id="'user-' + user.id"
              @click="() => {elevateUserToAdmin(user); user.roles[0] = 'ADMINISTRATOR'}"
            >elevate To administrator</b-button>

            <b-button
              v-else-if="user.roles[0] === 'ADMINISTRATOR'"
              :id="'user-' + user.id"
              @click="() => {elevateUserToStandard(user); user.roles[0] = 'STANDARD'}"
            >Turn into normal user</b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <hr class="pretty" />
      <div v-if="loading">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
      </div>
      <!-- <h1>No users created</h1> -->
      <hr class="pretty" />
      <router-link v-if="users.length === 0" to="/admin/create/user">
        <b-button variant="primary">create your first user!</b-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import userManagementService from "@/services/userManagement/UserManagementService.js";
export default {
  async beforeMount() {
    //this.users = await userManagementService.findAll();
    this.updateSite();
    console.log(this.users);
  },

  methods: {
    async deleteUser(id) {
      await userManagementService.deleteUser(id);
      await this.updateSite();
      // location.reload();
    },

    async updateSite() {
      this.loading = true;
      this.users = await userManagementService.findAll();
      this.loading = false;
    },

    async elevateUserToAdmin(user) {
      user.roles[0] = "ADMINISTRATOR";
      this.response = await userManagementService.elevateUserToAdmin(user.id);
      this.updateSite();
      //location.reload();
    },

    async elevateUserToStandard(user) {
      user.roles[0] = "STANDARD";
      console.log(user.roles[0]);
      this.response = await userManagementService.elevateUserToStandard(
        user.id
      );
      this.updateSite();
      //location.reload();
    }
  },
  data() {
    return {
      loading: true,
      users: [],
      response: null
    };
  }
};
</script>