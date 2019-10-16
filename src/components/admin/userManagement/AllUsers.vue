<template>
  <div>
      <h1>list of all users</h1>
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
        <tr>
          <th scope="row">
              <b-button> + </b-button>
          </th>
          <td>Mark</td>
          <td>Standard</td>
          <td>
              <b-button>elevate To administrator</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>