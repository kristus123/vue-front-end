<template>
  <div>
    <h1>list of all users</h1>

    <router-link to="/admin/create/user">
      <b-button>create new user</b-button>
    </router-link>
    <br />
    <br />
    <br />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">username</th>
          <th scope="col">access-rights</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users">
          <th scope="row">
            <b-button>+</b-button>
          </th>
          <td>{{user.username}}</td>
          <td>hei</td>
          <td>
            <b-button
              v-if="user.roles[0] === 'STANDARD' "
              :id="'user-' + user.id"
              @click="() => elevateUserToAdmin(user)"
            >elevate To administrator</b-button>

            <b-button
              v-else-if="user.roles[0] === 'ADMINISTRATOR'"
              :id="'user-' + user.id"
              @click="() => elevateUserToStandard(user)"
            >Turn into normal user</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import userManagementService from "@/services/userManagement/UserManagementService.js";
export default {
  async beforeMount() {
    this.users = await userManagementService.findAll();
  },

  methods: {
    async elevateUserToAdmin(user) {
      //user.roles[0] = "ADMINISTRATOR";
      this.response = await userManagementService.elevateUserToAdmin(user.id);
      location.reload();
    },

    async elevateUserToStandard(user) {
      user.roles[0] = "STANDARD";
      console.log(user.roles[0]);
      this.response = await userManagementService.elevateUserToStandard(user.id);
      location.reload();
    }
  },
  data() {
    return {
      users: [],
      response: null
    };
  }
};
</script>