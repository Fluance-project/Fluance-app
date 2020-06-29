<template>
<div :style="{padding: '32px 24px'}">

  <a-card class="datablock">
      <a-row>
      <a-col :span="8">
        <p>Équipements</p>
         <h2>{{equipments.length}}</h2>
         
      </a-col>
      <a-col :span="8">
          <p>Immobilisations</p>
          <h2>{{immobilised}}</h2> 
      </a-col>
      <a-col :span="8">
         <p>Taux de disponibilité</p>
          <h2>{{getAvailability()}}%</h2>
      </a-col>
    </a-row>
  </a-card>
  <a-row class="equipement-list" :gutter="16" style="margin-top: 8px">
      <a-col :span="8" style="margin-top: 12px">
          <a-card class="add-action" @click="showModal">
              <p> <a-icon type="plus" /> Ajouter</p>
          </a-card>
      </a-col>
          <router-link v-for="i in equipments"  :key="i.index" :to="{path: 'equipments/'+ i._id.$oid}" >
            <a-col :span="8" style="margin-top: 12px">
              <EquipementCard :title="i.name" :lastIntervention="i.lastInter" :status="i.status"/>
            </a-col>
          </router-link>
  </a-row>

    <a-modal v-model="visible" title="Ajouter un équipement" @ok="handleOk">
     <a-form>
      <a-form-item label="Nom de l'équipement">
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
     </a-form>
    </a-modal>

</div>


</template>

<script>

import { mapState } from 'vuex'
import EquipementCard from './EquipementCard'
export default {
  name: "equipement",
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
      visible: false,
      newValue: '',
    };
  },
  computed: {
    ...mapState({
    snapShot: state => state.app.snapShot,
    equipments: state => state.equipment.equipments,
    immobilised (state) {
      let ret = 0;
      state.equipment.equipments.forEach(element => {
        if(element.status !== true) {
          ret += 1;
        }
      });
      return ret;
    }
  })
  },
   beforeMount() {
    this.$store.dispatch('equipment/loadEquipments', this.$store.getters['account/accountId']);
    this.$store.dispatch('app/loadRoute', this.$router.currentRoute.name);
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.$store.dispatch('equipment/addEquipments', 
        {
          account_id: this.$store.getters['account/accountId'],
          name: this.newValue,
          status: true,
        });
      this.$store.dispatch('equipment/loadEquipments', this.$store.getters['account/accountId']);
      this.visible = false;
    },
    getAvailability(){
      return parseFloat(100 - (this.immobilised*100/this.equipments.length)).toFixed(2)
    }
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
