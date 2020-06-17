<template>
  <!-- <a-layout-content style="margin: 0 0px"> -->
    <div>
    <a-row :gutter="10">
      <a-col :span="8">
        <a-card title="Equipement" :bordered="false" style="margin-top: 24px" align="center">
          <a-statistic
            :value="18"
            :precision="0"
            :value-style="{ color: '#3f8600' }"
            style="margin-right: 50px"
          >
            <!-- <template #prefix>
              <a-icon type="arrow-up" />
            </template> -->
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Interventions plannifiées ce jour" :bordered="false" style="margin-top: 24px" align="center">
          <a-statistic
            :value="2"
            :precision="0"
            class="demo-class"
            :value-style="{ color: '#cf1322' }"
          >
            <!-- <template #prefix>
              <a-icon type="arrow-down"/>
            </template> -->
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Taux de disponibilité" :bordered="false" style="margin-top: 24px" align="center">
          <a-statistic
            :value="87.2"
            :precision="1"
            suffix="%"
            class="demo-class"
            :value-style="{ color: '#3f8600' }"
          >
            <!-- <template #prefix>
              <a-icon type="arrow-up" />
            </template> -->
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
      <a-row :gutter="10" type="flex" align="middle">
        <a-col :span="12">
          <a-card title="Indicateurs" :bordered="false" style="margin-top: 24px">
            <a slot="extra" href="#">modifier</a>
            <a-row type="flex" justify="space-around">
              <a-col :span="8" align="middle">
                <a-progress type="circle" :percent="`${35*100/150}`" :format="() => `MTBM \n 35h`" :width="250" :strokeWidth="10" status="success"/>
              </a-col>
              <a-col :span="8" align="middle">
                <a-progress type="circle" :percent="`${235*100/1500}`" :format="() => 'MTBM \n 235h'" :width="250" :strokeWidth="10"/>
              </a-col>
              <a-col :span="8" align="middle">
                <a-progress type="circle" :percent="`${32*100/100}`" :width="250" :format="() => 'MTTR \n 32h'" :strokeWidth="10" status="exception">
                </a-progress>
              </a-col>
              <p style="margin-top: 24px">Dernière mise à jour: {{ date }} à {{ hour }}</p>
            </a-row>
          <!-- <vue-plotly :data="data" :layout="layout" :options="options"/> -->
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card title="Dernières Interventions" :bordered="false" style="margin-top: 24px">
            <a-table :columns="columns.history" :data-source="data.history" :pagination=false>
              <!-- <a slot="id" slot-scope="text">{{ text }}</a> -->
              <!-- <span slot="customTitle"><a-icon type="smile-o" /> Id</span> -->
              <span slot="status" slot-scope="status">
                <a-tag
                  v-for="s in status"
                  :key="s"
                  :color="s === 'Impossibe' ? 'volcano' : s === 'Annulé' ? 'orange' : 'green'"
                >
                  {{ s.toUpperCase() }}
                </a-tag>
              </span>
              <!-- <span slot="assigne" slot-scope="text, record">
                <a>Invite 一 {{ record.name }}</a> -->
                <!-- <a-divider type="vertical" />
                <a>Delete</a>
                <a-divider type="vertical" />
                <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a> -->
              <!-- </span> -->
            </a-table>
          </a-card>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-card title="Interventions à venir" :bordered="false" style="margin-top: 24px; margin-bottom: 24px">
            <router-link slot="extra" :to="{name : 'Plannification / Planning d\'intervention'}">
              Voir le planning complet
            </router-link>
            <a-table :columns="columns.venir" :data-source="data.venir" :pagination=false>
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
            </a-table>
          </a-card>
        </a-col>
      </a-row>
  </div>
  <!-- </a-layout-content> -->
</template>

<script>
// import VuePlotly from '@statnett/vue-plotly';
import store from "../store/store";

const columns = {
  history: [
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
      title: 'Assigné',
      dataIndex: 'assigne',
      key: 'assigne',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' },
    }
  ],
  venir: [
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
  ]
};
  

const data = {
  history: [
    {
      id: '#135',
      equipement: 'Fraiseuse Siements AD45[...]',
      assigne: 'D. Mirvieux',
      status: ['Terminé']
    },
    {
      id: '#134',
      equipement: 'Fraiseuse AE45',
      assigne: 'D. Mirvieux',
      status: ['Annulé']
    },
    {
      id: '#132',
      equipement: 'Presse Hydro K300',
      assigne: 'D. Mirvieux',
      status: ['Impossibe']
    },
    {
      id: '#131',
      equipement: 'Injection Ordinale',
      assigne: 'D. Mirvieux',
      status: ['Terminé']
    },
    {
      id: '#130',
      equipement: 'Presse Plasto',
      assigne: 'D. Mirvieux',
      status: ['Terminé']
    },
    {
      id: '#129',
      equipement: 'Presse Plasto 2',
      assigne: 'D. Mirvieux',
      status: ['Terminé']
    },
    {
      id: '#128',
      equipement: 'Presse Plasto 3',
      assigne: 'D. Mirvieux',
      status: ['Terminé']
    },
  ],
  venir: [
    {
      id: '#136',
      equipement: 'Fraiseuse Siements AD45[...]',
      type: ['préventive'],
      date: '2017-10-03 19:23:12',
      assigne: '-',
    },
    {
      id: '#137',
      equipement: 'Fraiseuse Siements AD45[...]',
      type: ['corrective'],
      date: '2017-10-03 19:23:12',
      assigne: 'D. Mirvieux',
    },
    {
      id: '#138',
      equipement: 'Fraiseuse Siements AD45[...]',
      type: ['prévisonnelle'],
      date: '2017-10-03 19:23:12',
      assigne: '-',
    },
    {
      id: '#139',
      equipement: 'Fraiseuse Siements AD45[...]',
      type: ['périodique'],
      date: '2017-10-03 19:23:12',
      assigne: 'D. Mirvieux',
    },
  ]
};



export default {
  name: "Home",
  props: {
    msg: String
  },
  // components: {
  //   VuePlotly
  // },
  data() {
    return {
      collapsed: null,
      visible: null,
      hour: new Date().getHours(),
      layout: {},
      options: {},
      date: new Date().toDateString(),
      data,
      columns
    };
  },
  created: function() {
    let modalSession = this.$localStorage.get("welcomeModal");
    if (modalSession === null || modalSession === true) {
      this.showModal();
    } else {
      this.handleOk();
    }
     let usrData = JSON.parse(this.$localStorage.get('ritmic-data'));
     store.commit("SET_USER", {
      loggedIn: true,
      userData: usrData.usr,
      token: usrData.token
    });
    setInterval(this.getTime, 1000);
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    closeModal() {
      this.$localStorage.set("welcomeModal", false);
      this.handleOk();
    },
    getTime() {
      let date = new Date();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();

      if (h < 10) {
        h = "0" + h;
      }
      if (m < 10) {
        m = "0" + m;
      }
      if (s < 10) {
        s = "0" + s;
      }
      this.hour = h + ":" + m + ":" + s;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.ant-progress-circle,
div.ant-progress-line {
  margin: 8px;
}
</style>
