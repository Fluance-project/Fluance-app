<template>
<div>


</div>


</template>

<script>

import { mapState } from 'vuex'
export default {
  name: "Module",
  props: {
  },
  components: {
  },
  data() {
    return {
    };
  },
  computed: mapState({
  }),
  beforeMount() {
  },
  created: function() {
    this.$store.dispatch('app/loadRoute', this.$router.currentRoute.name);
  },
};
</script>

<style scoped>
.datablock .ant-col{
     text-align: center;
}
.datablock .ant-col:nth-child(2){
  border-left: solid 1px #E8E8E8;
  border-right: solid 1px #E8E8E8;
}
.datablock p{
  color: #8C8C8C
}
.datablock h2{
  color: #041627;
  font-weight: 300;
  font-size: 1.7em;
}

.equipement-list {
  margin-top: 36px;
}
.add-action{
  border-style: dashed;
  text-align: center;
  color: #8C8C8C;
  padding: 28px 0;
  line-height: 24px;
  cursor: pointer;
}
.add-action p {
  margin: 0;
}

.add-action:hover {
  background-color: #fafafa;
}
</style>
