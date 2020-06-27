<template>
<div>

</div>


</template>

<script>

import { mapState } from 'vuex'
export default {
  name: "Historique Intervention",
  props: {
  },
  components: {
    
  },
  data() {
    return {
    };
  },
  computed: mapState({
    snapShot: state => state.home.snapShot,
  }),
  beforeMount() {
      this.$store.dispatch('home/loadSnapShot')
  },
  created: function() {
    this.$store.dispatch('home/loadRoute', this.$router.currentRoute.name);
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
