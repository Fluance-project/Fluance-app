<template>
<div>
<div class="detail-head">
<h1>{{task.description}}
<span class="detail-actions">
  <a-button type="secondary" @click="showModalEdit">Modifier l'intervention</a-button>
  <a-button type="primary" @click="showModal">Editer état</a-button>
</span>
</h1>
  <a-row class="detail-bloc" :gutter="46">
      <a-col :span="5" style="border-right: solid 1px #E8E8E8">
        <p>Equipement: 
          <span>
            {{machine.name}}
          </span>
          <br/>
          Superviser: 
            <a-avatar>
              <a-icon slot="icon" type="user" />
            </a-avatar>
          <span>
            {{(supe.fistName || supe.firstName) + ' ' + supe.lastName}}
          </span>
          <br/>
          Assigné: 
            <a-avatar>
              <a-icon slot="icon" type="user" />
            </a-avatar>
          <span>
            {{(assigne.fistName || assigne.firstName) + ' ' + assigne.lastName}}
          </span>
        </p>
      </a-col>
         <a-col :span="6">
            <p>Date plannifié: <span>{{new Date(task.start_date*1000).toISOString().replace(/T/, ' ').replace(/\..+/, '')}}</span>
            <br/>
            Type: 
            <span>
              <a-tag :color="
                task.type === typeIntervention.PREVENTIVE.TYPE ? '#052068'
              : task.type === typeIntervention.CORRECTIVE.TYPE ? '#041627'
              : task.type === typeIntervention.PREVISIONELLE.TYPE ? '#1449C6'
              : '#595959'
              ">
                {{
                  task.type === typeIntervention.PREVENTIVE.TYPE ?  typeIntervention.PREVENTIVE.NAME
                : task.type === typeIntervention.CORRECTIVE.TYPE ?  typeIntervention.CORRECTIVE.NAME
                : task.type === typeIntervention.PREVISIONELLE.TYPE ?  typeIntervention.PREVISIONELLE.NAME
                : task.type === typeIntervention.PERIODIQUE.TYPE ?  typeIntervention.PERIODIQUE.NAME
                : typeIntervention.CONDITIONELLE.NAME
                }}
              </a-tag>
            </span>
            <br/>
            Status: 
            <span>
              <a-tag :color="
                task.isClosed === false ? '#BCC5D1' : 'blue'
              ">
                {{task.isClosed === false ? "à faire" : "Done"}}
              </a-tag>
            </span>
            </p>
      </a-col>
  </a-row>
  </div>
  <div :style="{padding: '0px 24px'}">
    <a-row :gutter="10" type="flex" align="middle">
        <a-col :span="24">
          <a-card title="Details" :bordered="false" style="margin-top: 24px">
            <!-- <a slot="extra" href="#">modifier</a> -->
            <!-- <a-row type="flex" justify="space-around"> -->
            <a-row>
              <p>
                <b>Immobilisation</b>
                {{task.immobilised}}
              </p>
            </a-row>
          </a-card>
        </a-col>
    </a-row>
  </div>
  <div :style="{padding: '0px 24px'}">
    <a-row :gutter="10" type="flex" align="middle">
        <a-col :span="24">
          <a-card title="Note d'intervention" :bordered="false" style="margin-top: 24px">
            <!-- <a slot="extra" href="#">modifier</a> -->
            <!-- <a-row type="flex" justify="space-around"> -->
            <a-row>
              <p>
                <!-- <b>Immobilisation</b>
                {{task.immobilised}} -->
              </p>
            </a-row>
          </a-card>
        </a-col>
    </a-row>
  </div>
    <a-modal v-model="visible" title="Modifier l'état de l'intervention" @ok="handleStatus">
     <a-form>
       <p>Status</p>
      <a-select
        label-in-value
        style="width: 220px"
        @change="handleChange"
      >
        <a-select-option value="true">
          En cours
        </a-select-option>
        <a-select-option value="false">
          Done
        </a-select-option>
      </a-select>
      <a-divider/>
      <p>Note d'intervention</p>
      <a-textarea placeholder="Note" :rows="4" />
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
// import Preview from './TaskDetail/Preview'
// import History from './TaskDetail/History'
// import Following from './TaskDetail/Following'

const typeIntervention = {
    PREVISIONELLE: {
        NAME: "Prévisionelle",
        TYPE: 0
    },
    PERIODIQUE: {
        NAME: "Périodique",
        TYPE: 1
    },
    CORRECTIVE: {
        NAME: "Corrective",
        TYPE: 2
    },
    PREVENTIVE: {
        NAME: "Préventive",
        TYPE: 3
    },
    CONDITIONELLE: {
        NAME: "Conditionelle",
        TYPE: 4
    },
}

export default {
  name: "task-detail",
  // components: {
  //   Preview,
  //   Following,
  //   History,
  // },
  data() {
    return {
      title: "Toto",
      newStatus: '',
      visible: false,
      visibleEdit: false,
      newValue: '',
      supe: {},
      assigne: {},
      typeIntervention
    };
  },
  computed:{
    ...mapState({
    task: state => state.task.currentTask,
    machine: state => state.equipment.current,
    // member: state => state.member.current,
  })},
  beforeMount() {
    this.$store.dispatch('app/loadRoute', this.$router.currentRoute.name)
    this.fetchData();
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    fetchData() {
      this.$store.dispatch('task/getTask', this.$router.currentRoute.params.id);
      this.$store.dispatch('equipment/loadCurrent', this.task.machine_id.$oid);
      // this.$store.dispatch('member/loadCurrent', {
      //     account_id: this.$store.getters['account/accountId'],
      //     user_id: this.task.supervisor
      //   });
      this.$service.member.getMemberById(
        this.$store.getters['account/accountId'],
        this.task.supervisor
      ).then((res) => {
        this.supe = res.user[0]
      })
      this.$service.member.getMemberById(
        this.$store.getters['account/accountId'],
        this.task.assigned
      ).then((res) => {
        this.assigne = res.user[0]
      })
    },
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
