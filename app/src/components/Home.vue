<template>
  <!-- <a-layout-content style="margin: 0 0px"> -->
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
          <a-card title="Dernières Interventions" :bordered="false" style="margin-top: 24px">
            <a-table :columns="columns.history" :data-source="data.history" :pagination=false>
              <span slot="status" slot-scope="status">
                <a-tag
                  v-for="s in status"
                  :key="s"
                  :color="s === 'Impossibe' ? 'volcano' : s === 'Annulé' ? 'orange' : 'green'"
                >
                  {{ s.toUpperCase() }}
                </a-tag>
              </span>
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

import { mapState } from 'vuex'

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
      hour: new Date().getHours(),
      date: new Date().toDateString(),
      data,
      columns,
    };
  },
  computed: mapState({
    snapShot: state => state.app.snapShot,
    // route: state => state.app.route
  }),
  beforeMount() {

  },
  created: function() {
    // console.log(this.$router.currentRoute.name)
    // this.route = this.$router.currentRoute.name
    this.$store.dispatch('app/loadRoute', this.$router.currentRoute.name);
    // let modalSession = localStorage.getItem("welcomeModal");
    // if (modalSession === null || modalSession === true) {
    //   this.showModal();
    // } else {
    //   this.handleOk();
    // }
    //  let usrData = JSON.parse(localStorage.getItem('fluance-data'));
    //  this.$store.commit("SET_USER", {
    //   loggedIn: true,
      // userData: usrData.usr,
    //   token: usrData.token
    // });
    // setInterval(this.getTime, 1000);
  },
  methods: {
    // showModal() {
    //   this.visible = true;
    // },
    // handleOk() {
    //   this.visible = false;
    // },
    // closeModal() {
    //   localStorage.getItem("welcomeModal", false);
    //   this.handleOk();
    // },
    // getTime() {
    //   let date = new Date();
    //   let h = date.getHours();
    //   let m = date.getMinutes();
    //   let s = date.getSeconds();

    //   if (h < 10) {
    //     h = "0" + h;
    //   }
    //   if (m < 10) {
    //     m = "0" + m;
    //   }
    //   if (s < 10) {
    //     s = "0" + s;
    //   }
    //   this.hour = h + ":" + m + ":" + s;
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.ant-progress-circle,
div.ant-progress-line {
  margin: 8px;
}
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
</style>
