<template>
  <div>
    <a-card style="width:100%" title="Mes informations">
      <a href="#" slot="extra">Modifier mes informations</a>
         <a-row type="flex" justify="start">
      <a-col :span="2">
      <a-avatar :size="64" icon="user" /> 
      </a-col>
      <a-col :span="22"><h2>{{ user.firstname + ' ' + user.lastname }}</h2>
      <p>Email: {{ user.email }}</p>
      <p>ID: {{ user.id }}</p>
      </a-col>
    </a-row>

  </a-card>
  </div>
</template>

<script>
import store from '../store/store'

export default {
  name: "Profile",
  props: {},
  data() {
    return {
      user: store.getters.auth.userData
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
