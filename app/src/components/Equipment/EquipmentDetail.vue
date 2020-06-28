<template>
<div>
<div class="detail-head">
<h1>{{machine.name}}
<span class="detail-actions">   <a-button type="secondary" @click="showModalEdit">Modifier l'équipement</a-button> <a-button type="primary" @click="showModal">Mettre à jour l'état</a-button></span>
</h1>
  <a-row class="detail-bloc" :gutter="46">
      <a-col :span="5" style="border-right: solid 1px #E8E8E8">
         <p>Dernière intervention: <span>{{}}</span><br/>
        Suivi automatique: <span>{{}}</span></p>
      </a-col>
         <a-col :span="6">
            <p>Prochaine intervention: <span>{{}}</span><br/>
            Etat: <span>
          <span v-if="machine.status" class="status status-on" >
            <a-icon type="check" />
          </span>
          <span v-else class="status status-off">
            <a-icon type="pause" />
          </span>
          <span v-if="machine.status">
            Nominal
          </span>
          <span v-else>
            Inactif
          </span>
          </span></p>
      </a-col>
  </a-row>

  
</div>
<div class="detail-content">
 <a-tabs default-active-key="1" >
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
    <a-modal v-model="visible" title="Mettre à jour le status" @ok="handleStatus">
     <a-form>
       <p>Selectionnez un status pour l'appareil</p>
      <a-select
        label-in-value
        style="width: 220px"
        @change="handleChange"
      >
        <a-select-option value="true">
          Nominal
        </a-select-option>
        <a-select-option value="false">
          Inactif
        </a-select-option>
      </a-select>
     </a-form>
    </a-modal>

      <a-modal v-model="visibleEdit" title="Mettre à jour le status" @ok="handleUpdate">
     <a-form>
      <a-form-item label="Nouveau nom de l'équipement">
        <a-input
          placeholder="Saisissez un nom d'équipement"
          v-model="newValue"
          v-decorator="[
            'nom',
            {
              rules: [{ required: true, message: 'Le nom est requis' }],
            },
          ]"
        />
      </a-form-item>
      <a-divider/>
       <a-button type="danger" @click="deleteEquipement">Supprimer l'équipement</a-button>
     </a-form>
    </a-modal>
</div>


</template>

<script>

import { mapState } from 'vuex'
import Preview from './EquipementDetail/Preview'
import History from './EquipementDetail/History'
import Following from './EquipementDetail/Following'
export default {
  name: "equipement-detail",
  components: {
    Preview,
    Following,
    History,
  },
  data() {
    return {
      title: "Toto",
      newStatus: '',
      visible: false,
      visibleEdit: false,
      newValue: '',
    };
  },
  computed:{
    ...mapState({
    machine: state => state.equipment.current,
  })},
  beforeMount() {
    this.$store.dispatch('app/loadRoute', this.$router.currentRoute.name)
    this.$store.dispatch('equipment/loadCurrent', this.$router.currentRoute.params.id);
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    showModalEdit() {
      this.visibleEdit = true;
    },
    handleChange(status){
      this.newStatus = JSON.parse(status.key);
    },
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
    handleStatus() {
      this.$store.dispatch('equipment/editEquipments', 
        {
          id: this.$router.currentRoute.params.id,
          status: this.newStatus,
        });
         const hide = this.$message.loading('Mise à jour ...', 0);
        setTimeout(hide, 500);
        this.sleep(500).then(() => {
        this.$message.success('Mis à jour', 4);
        this.$store.dispatch('equipment/loadCurrent', this.$router.currentRoute.params.id);
      })
      this.visible = false;
    },
     handleUpdate() {
      this.visibleEdit = false;
      this.$store.dispatch('equipment/editEquipments', 
        {
          id: this.$router.currentRoute.params.id,
          name: this.newValue,
        });
      const hide = this.$message.loading('Mise à jour ...', 0);
      setTimeout(hide, 500);
      this.sleep(500).then(() => {
        this.$message.success('Mis à jour', 4);
        this.$store.dispatch('equipment/loadCurrent', this.$router.currentRoute.params.id);
      })
    },
     deleteEquipement() {
      this.visibleEdit = false;
      this.$store.dispatch('equipment/deleteEquipment', this.$router.currentRoute.params.id);
      const hide = this.$message.loading('Suppression ...', 0);
      setTimeout(hide, 500);
      this.sleep(500).then(() => {
        this.$message.success('Équipement supprimé', 4);
        this.$store.dispatch('equipment/loadEquipments', this.$store.getters['account/accountId']);
        this.$router.push({ path: '/equipments'})
      })
    },
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

.status-on{
background-color: #52C41A;
}
.status-off{
background-color: #FAAD14;
}
.status{
  display: inline-block;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  color: #fff;
  padding: 0 3px;
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
