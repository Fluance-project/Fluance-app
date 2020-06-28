<template>
<div>
 <a-row :gutter="10" type="flex" align="middle">
        <a-col :span="12">
          <a-card title="Indicateurs" :bordered="false" style="margin-top: 24px">
            <a slot="extra" href="#">modifier</a>
            <a-row type="flex" justify="space-around">
              <a-col :span="8" align="middle">
                <a-progress type="circle" :percent="25" :format="() => `MTBM \n 35h`" :width="130" :strokeWidth="7" status="success"/>
              </a-col>
              <a-col :span="8" align="middle">
                <a-progress type="circle" :percent="35" :format="() => 'MTBM \n 235h'" :width="130" :strokeWidth="7"/>
              </a-col>
              <a-col :span="8" align="middle">
                <a-progress type="circle" :percent="44" :width="130" :format="() => 'MTTR \n 32h'" :strokeWidth="7" status="exception">
                </a-progress>
              </a-col>
              <p style="margin-top: 24px">Dernière mise à jour: {{ date }} à {{ hour }}</p>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="Interventions prériodiques ou conditionelles" :bordered="false" style="margin-top: 24px">
           
          </a-card>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-card title="Interventions à venir" :bordered="false" style="margin-top: 24px; margin-bottom: 24px">
           
           
          </a-card>
        </a-col>
      </a-row>
</div>


</template>

<script>

import { mapState } from 'vuex'
export default {
  name: "apercu-detail",
  props: {
  },
  components: {
    
  },
  data() {
    return {
    };
  },
  computed: mapState({
    snapShot: state => state.app.snapShot,
  }),
  beforeMount() {
  },
  created: function() {
    this.$store.dispatch('app/loadRoute', this.$router.currentRoute.name);
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
