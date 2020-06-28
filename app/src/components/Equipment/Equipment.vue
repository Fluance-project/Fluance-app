<template>
<div :style="{padding: '32px 24px'}">

  <a-card class="datablock">
      <a-row>
      <a-col :span="8">
        <p>Équipements</p>
    <h2>2</h2>
         
      </a-col>
      <a-col :span="8">
          <p>Immobilisations</p>
          <h2>2</h2> 
      </a-col>
      <a-col :span="8">
         <p>Taux de disponibilité</p>
          <h2>20%</h2>
      </a-col>
    </a-row>
  </a-card>
  <a-row class="equipement-list" :gutter="16">
      <a-col :span="8">
          <a-card class="add-action" @click="showModal">
              <p> <a-icon type="plus" /> Ajouter</p>
          </a-card>
      </a-col>
          <router-link v-for="i in  el"  :key="i.index" :to="{path: 'equipments/'+ i.id}" >
            <a-col :span="8">
              <EquipementCard :title="i.title" :lastIntervention="i.lastInter" :status="i.status"/>
            </a-col>
          </router-link>
  </a-row>

    <a-modal v-model="visible" title="Ajouter un équipement" @ok="handleOk">
     <a-form>
      <a-form-item label="Nom de l'équipement">
        <a-input
          placeholder="Saisissez un nom d'équipement"
          v-decorator="[
            'nom',
            {
              rules: [{ required: true, message: 'Le nom est requis' }],
            },
          ]"
        />
      </a-form-item>
     </a-form>
    </a-modal>

</div>


</template>

<script>

import { mapState } from 'vuex'
import EquipementCard from './EquipementCard'
export default {
  name: "Equipement",
  props: {
    msg: String
  },
  components: {
    EquipementCard
  },
  data() {
    return {
      hour: new Date().getHours(),
      date: new Date().toDateString(),
      el : [{
        title: "Test",
        lastInter: "18/05/1996",
        status: false,
        id: "67T8Y90"
      },
      {
        title: "Test2 ",
        lastInter: "18/05/1996",
        status: true,
        id: "77T8Y90"
      }],
      visible: false,
    };
  },
  computed: mapState({
    snapShot: state => state.app.snapShot,
    equipment: state => state.equipment.equipment
  }),
   beforeMount() {
  },
  created: function() {
    this.$store.dispatch('app/loadRoute', this.$router.currentRoute.name);
    this.$store.dispatch('equipment/loadEquipments', this.$router.currentRoute.name);
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
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
