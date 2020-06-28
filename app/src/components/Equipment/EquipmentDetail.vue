<template>
<div>
<div class="detail-head">
<h1>{{title}}
<span class="detail-actions">   <a-button type="secondary">Modifier l'équipement</a-button> <a-button type="primary">Mettre à jour l'état</a-button></span>
</h1>
  <a-row class="detail-bloc" gutter="46">
      <a-col :span="5" style="border-right: solid 1px #E8E8E8">
         <p>Dernière intervention: <span>{{}}</span><br/>
        Suivi automatique: <span>{{}}</span></p>
      </a-col>
         <a-col :span="6">
            <p>Prochaine intervention: <span>{{}}</span><br/>
        Etat: <span>{{}}</span></p>
      </a-col>
  </a-row>

  
</div>
<div class="detail-content">
 <a-tabs default-active-key="1" @change="callback">
      <a-tab-pane key="1" tab="Aperçu">
        <Preview/>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Historique d'interventions">
          <History/>
      </a-tab-pane>
      <a-tab-pane key="3" tab="Suivi prévisionnel">
        <Following/>
      </a-tab-pane>
    </a-tabs>
</div>
</div>


</template>

<script>

import { mapState } from 'vuex'
import Preview from './EquipementDetail/Preview'
import History from './EquipementDetail/History'
import Following from './EquipementDetail/Following'
export default {
  name: "equipement-detail",
  props: {
  },
  components: {
    Preview,
    Following,
    History,
  },
  data() {
    return {
      title: "Toto"
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
.detail-head {
padding: 32px 32px 52px;
background-color: #fff;
}
.detail-head h1 {
  font-size: 1.6em;
}

.detail-content {
  margin-top: -42px;
padding: 0 32px;
}

.detail-bloc{
  color: #8C8C8C;
  line-height: 24px;
}
.detail-actions {
  float: right;
}
</style>
