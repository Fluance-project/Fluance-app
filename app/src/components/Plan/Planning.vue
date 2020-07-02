<template>
  <a-layout-content style="margin: 0 0px">
      <a-row :gutter="10">
          <a-col :span="24">
            <a-card title="Interventions à venir" :bordered="false" style="margin-top: 24px; margin-bottom: 24px">
                <!-- <a slot="extra" href="/plannification/make-planning"> -->
                <router-link slot="extra" :to="{path : '/make-planning'}">
                    <a-tag color="#052068">
                        Plannifier une intervention
                    </a-tag>
                </router-link>
                <!-- </a> -->
                <a-table 
                  :columns="columns"
                  :data-source="tasksByAccount"
                  :pagination=true>
                  <!-- <span slot="id" slot-scope="text"> -->
                    <router-link slot="id" slot-scope="text,record" :to="{path : 'planning/' + record._id.$oid}">
                      {{text}}
                    </router-link>
                  <!-- </span> -->
                  <span slot="type" slot-scope="type">
                      <a-tag
                      v-for="t in [type]"
                      :key="t"
                      :color="t === typeIntervention.PREVENTIVE.TYPE ? '#052068'
                            : t === typeIntervention.CORRECTIVE.TYPE ? '#041627'
                            : t === typeIntervention.PREVISIONELLE.TYPE ? '#1449C6'
                            : '#595959'"
                      >
                      <a-icon v-for="t in type" :key="t" :type="t === 'préventive' ? 'carry-out' : t === 'corrective' ? 'warning' : t === 'prévisonnelle' ? 'bulb' : 'clock-circle'" />
                      {{ t === typeIntervention.PREVENTIVE.TYPE ?  typeIntervention.PREVENTIVE.NAME
                        : t === typeIntervention.CORRECTIVE.TYPE ?  typeIntervention.CORRECTIVE.NAME
                        : t === typeIntervention.PREVISIONELLE.TYPE ?  typeIntervention.PREVISIONELLE.NAME
                        : t === typeIntervention.PERIODIQUE.TYPE ?  typeIntervention.PERIODIQUE.NAME
                        : typeIntervention.CONDITIONELLE.NAME
                      }}
                      </a-tag>
                  </span>
                  <span slot="isClosed" slot-scope="isClosed">
                      <a-tag
                      v-for="s in [isClosed]"
                      :key="s"
                      :color="s === true ? 'green' : '#595959'"
                      >
                      {{ s === true ? 'Terminé'.toUpperCase() : 'En cours'.toUpperCase()}}
                      </a-tag>
                  </span>
                  <!-- <template slot="operation" slot-scope="text, record">
                    <div class="editable-row-status">
                      <span v-if="record.editable">
                        <a @click="() => save(record.key)">Save</a>
                        <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
                          <a>Cancel</a>
                        </a-popconfirm>
                      </span>
                      <span v-else>
                        <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
                      </span>
                    </div>
                  </template> -->
                </a-table>
            </a-card>
            </a-col>
      </a-row>
  </a-layout-content>
</template>

<script>
import { mapState } from 'vuex'
// import TaskDetail from './TaskDetail.vue'

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

const columns = [
    {
      title: 'Id',
      dataIndex: '_id.$oid',
      key: '_id.$oid',
      scopedSlots: { customRender: 'id' },
    },
    {
      title: 'Equipement',
      dataIndex: 'machine_name',
      key: 'machine_name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      scopedSlots: { customRender: 'type' },
    },
    {
      title: 'Date de l\'intervention',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'Assigné',
      dataIndex: 'assigne_name',
      key: 'assigne_name',
    },
    {
      title: 'Status',
      dataIndex: 'isClosed',
      key: 'isClosed',
      scopedSlots: { customRender: 'isClosed' },
    },
    // {
    //   title: 'Operation',
    //   dataIndex: 'operation',
    //   key: 'operation'
    // },
]
export default {
    name: "Planning d'intervention",
    data() {
      // this.cacheData = data.map(item => ({ ...item }));
      return {
          columns,
          editingKey: '',
          typeIntervention,
      }
    },
    beforeMount() {
      this.$store.dispatch('task/loadTasksByAccount', this.$store.getters['account/accountId'])
      this.$store.dispatch('app/loadRoute', this.$router.currentRoute.name);
      // this.changeData(this.tasks.tasksByAccount)
      // console.log(this.test)
      // this.$store.dispatch('task/addFieldTask', this.tasks.tasksByAccount)
      // console.log(this.$store.getters['task/tasksModified'])
    },
    // updated() {
      // this.$store.dispatch('task/loadTasksByAccount', this.$store.getters['account/accountId'])
    // },
    // create() {
    //   this.fetchData();
    // },
    watch: {
      '$router': 'fetchData'
    },
    computed: {
      ...mapState({
          tasksByAccount: state => state.task.tasksByAccount,
          // tasksModified: state => state.task.tasksModified,
          // tasks: state => state.task,
          member: state => state.member.members
      }),
    },
    methods: {
      fetchData() {
        this.$store.dispatch('task/loadTasksByAccount', this.$store.getters['account/accountId'])
      },
      // changeData(data) {
      //   let dataClone = []
      //   data.forEach(el => dataClone.push(Object.assign({}, el)));
      //   console.log(dataClone)
      //   dataClone.map(el => {
      //      this.$service.equipment.getMachineById(el.machine_id.$oid)
      //                       .then((res) => {
      //                         console.log(res.name)
      //                         el.machine_name = res.name
      //                       })
      //     this.$service.member.getMemberById(el.account_id.$oid, el.assigned)
      //                       .then((res) => {
      //                         console.log(res.user[0].fistName)
      //                        el.assigne_name = res.user[0].fistName
      //                       })
      //     el.start_date = new Date(el.start_date*1000).toISOString()
      //   })
      //   console.log(dataClone, data)
      //   this.$store.dispatch('task/addFieldTask', dataClone)
      // }
      // edit(key) {
      //   const newData = [...this.data];
      //   const target = newData.filter(item => key === item.key)[0];
      //   this.editingKey = key;
      //   if (target) {
      //     target.editable = true;
      //     this.data = newData;
      //   }
      // },
      // save(key) {
      //   const newData = [...this.data];
      //   const newCacheData = [...this.cacheData];
      //   const target = newData.filter(item => key === item.key)[0];
      //   const targetCache = newCacheData.filter(item => key === item.key)[0];
      //   if (target && targetCache) {
      //     delete target.editable;
      //     this.data = newData;
      //     Object.assign(targetCache, target);
      //     this.cacheData = newCacheData;
      //   }
      //   this.editingKey = '';
      // },
      // cancel(key) {
      //   const newData = [...this.data];
      //   const target = newData.filter(item => key === item.key)[0];
      //   this.editingKey = '';
      //   if (target) {
      //     Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      //     delete target.editable;
      //     this.data = newData;
      //   }
      // },
    }
}
</script>

<style scoped>
.editable-row-status a {
  margin-right: 8px;
}
</style>