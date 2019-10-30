<template>
  <div>
    <h1>List of all users</h1>
    <hr class="pretty">
    

    <router-link v-if="users.length !== 0" to="/admin/create/user">
      <b-button variant="primary">Create new user</b-button>
    </router-link>
    <br />
    <br />
    <br />
    <table class="table" v-if="users.length !== 0">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Username</th>
          <th scope="col">Role</th>
          <th scope="col">Administrate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" v-bind:key="user.id">
          <th>
            <b-button v-b-modal="'delete'" @click="selectedUser = user" variant="outline-danger" size="sm">Delete</b-button>
          </th>
          <td>{{user.username}}</td>
          <td>
            <div v-if="loading">
              <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
            </div>
            <div v-else>{{user.roles[0]}}</div>
          </td>
          <td>
            <b-button
              v-if="user.roles[0] === 'STANDARD' "
              :id="'user-' + user.id"
              @click="() => {elevateUserToAdmin(user); user.roles[0] = 'ADMINISTRATOR'; loading=true}"
            >Elevate To administrator</b-button>

            <b-button
              v-else-if="user.roles[0] === 'ADMINISTRATOR'"
              :id="'user-' + user.id"
              @click="() => {elevateUserToStandard(user); user.roles[0] = 'STANDARD'; loading = true}"
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
    <b-modal centered :hide-footer="true" :hide-header="true" size="lg" id="delete">
      <center v-if="selectedUser !== null">
        <hr class="pretty" />
        <h2>Are you sure you want to delete user {{selectedUser.username}}</h2>
        <b-button variant="outline-danger" @click="() => deleteUser(selectedUser.id)">Delete</b-button>
        <hr style="margin-top:50px;" class="pretty" />
      </center>
    </b-modal>
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
      this.$bvModal.hide('delete')
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
      selectedUser : null,
      loading: true,
      users: [],
      response: null
    };
  }
};
</script>