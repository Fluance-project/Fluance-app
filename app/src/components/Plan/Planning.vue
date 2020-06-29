<template>
  <a-layout-content style="margin: 0 0px">
      <a-row :gutter="10">
          <a-col :span="24">
            <a-card title="Interventions à venir" :bordered="false" style="margin-top: 24px; margin-bottom: 24px">
                <!-- <a slot="extra" href="/plannification/make-planning"> -->
                <router-link slot="extra" :to="{name : 'Plannification / Plannifier une intervention'}">
                    <a-tag color="#052068">
                        Plannifier une intervention
                    </a-tag>
                </router-link>
                <!-- </a> -->
                <a-table :columns="columns" :data-source="data" :pagination=true>
                <span slot="type" slot-scope="type">
                    <a-tag
                    v-for="t in type"
                    :key="t"
                    :color="t === 'préventive' ? '#052068' : t === 'corrective' ? '#041627' : t === 'prévisonnelle' ? '#1449C6' : '#595959'"
                    >
                    <a-icon v-for="t in type" :key="t" :type="t === 'préventive' ? 'carry-out' : t === 'corrective' ? 'warning' : t === 'prévisonnelle' ? 'bulb' : 'clock-circle'" />
                    {{ t }}
                    </a-tag>
                </span>
                <span slot="status" slot-scope="status">
                    <a-tag
                    v-for="s in status"
                    :key="s"
                    :color="s === 'Impossibe' ? 'volcano' : s === 'Annulé' ? 'orange' : s === 'Terminé' ? 'green' : '#595959'"
                    >
                    {{ s.toUpperCase() }}
                    </a-tag>
                </span>
                <template slot="status" slot-scope="text, record">
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
                </template>
                </a-table>
            </a-card>
            </a-col>
      </a-row>
  </a-layout-content>
</template>

<script>
const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Equipement',
      dataIndex: 'equipement',
      key: 'equipement',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      scopedSlots: { customRender: 'type' },
    },
    {
      title: 'Date de l\'intervention',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Assigné',
      dataIndex: 'assigne',
      key: 'assigne',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      scopedSlots: { customRender: 'status' },
    },
]

const data = [
    {
      id: '#136',
      equipement: 'Fraiseuse Siements AD45[...]',
      type: ['préventive'],
      date: '2017-10-03 19:23:12',
      assigne: '-',
      status: ['Annulé']
    },
    {
      id: '#137',
      equipement: 'Fraiseuse Siements AD45[...]',
      type: ['corrective'],
      date: '2017-10-03 19:23:12',
      assigne: 'D. Mirvieux',
      status: ['En cours']
    },
    {
      id: '#138',
      equipement: 'Fraiseuse Siements AD45[...]',
      type: ['prévisonnelle'],
      date: '2017-10-03 19:23:12',
      assigne: '-',
      status: ['En cours']
    },
    {
      id: '#139',
      equipement: 'Fraiseuse Siements AD45[...]',
      type: ['périodique'],
      date: '2017-10-03 19:23:12',
      assigne: 'D. Mirvieux',
      status: ['Terminé']
    },
    {
      id: '#140',
      equipement: 'Fraiseuse Siements AD45[...]',
      type: ['conditionelle'],
      date: '2017-10-03 19:23:12',
      assigne: 'D. Mirvieux',
      status: ['Terminé']
    },
]
export default {
    name: "Planning d'intervention",
    data() {
      this.cacheData = data.map(item => ({ ...item }));
      return {
          data,
          columns,
          editingKey: '',
      }
    },
    created() {
      this.$store.dispatch('app/loadRoute', this.$router.currentRoute.name);
    },
    methods: {
      edit(key) {
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        this.editingKey = key;
        if (target) {
          target.editable = true;
          this.data = newData;
        }
      },
      save(key) {
        const newData = [...this.data];
        const newCacheData = [...this.cacheData];
        const target = newData.filter(item => key === item.key)[0];
        const targetCache = newCacheData.filter(item => key === item.key)[0];
        if (target && targetCache) {
          delete target.editable;
          this.data = newData;
          Object.assign(targetCache, target);
          this.cacheData = newCacheData;
        }
        this.editingKey = '';
      },
      cancel(key) {
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        this.editingKey = '';
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
          delete target.editable;
          this.data = newData;
        }
      },
    }
}
</script>

<style scoped>
.editable-row-status a {
  margin-right: 8px;
}
</style>