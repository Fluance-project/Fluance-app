<template>
  <div>
    <a-card style="width:100%">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="Général" key="1">A venir</a-tab-pane>
        <a-tab-pane tab="Status" key="2">
         <a-row type="flex">
          <a-col :span="12" :order="1">
          <h2>Système :</h2>
          <p><strong>Host:</strong> {{ hostData.os }} </p> 
          <p><strong>Architecture:</strong> {{ hostData.arch }} </p> 
          <p><strong>Platforme:</strong> {{ hostData.platform }} </p> 
          <p><strong>Type:</strong> {{ hostData.type }} </p> 
          <p><strong>Uptime:</strong> {{ hostData.uptime }} </p> 
          <p><strong>Release:</strong> {{ hostData.release }} </p> 
          </a-col>
          <a-col :span="12" :order="2">
          <h2>Charge :</h2>
          <p v-for="(value, name, index) in hostData.loadavg" v-bind:key="index"><strong>Coeur {{ name }}: </strong> {{ value }} %</p>
          </a-col>
          <a-col :span="24" :order="3">
            <a-divider />
            <h2>Network Interfaces :</h2>
            <a-table :columns="columns" :dataSource="dataArr" key="1" bordered>
            </a-table>
          </a-col>
        </a-row>
        
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import {mapState} from "vuex";
const columns = [
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'netmask',
      dataIndex: 'netmask',
    },
    {
      title: 'family',
      dataIndex: 'family',
    },
    {
      title: 'mac',
      dataIndex: 'mac',
    },
    {
      title: 'internal',
      dataIndex: 'internal',
    },
    {
      title: 'cidr',
      dataIndex: 'cidr',
    },
    {
      title: 'scopeid',
      dataIndex: 'scopeid',
    },

  ];
export default {
  name: "Settings",
  computed: mapState({
    hostData: state => state.host.hostData,
    dataArr : state => {
      let data = [];
      let i = 0;
      for (const el in state.host.hostData.networkInterfaces) {
        state.host.hostData.networkInterfaces[el].forEach((el) => {
          data.push({
            key: i,
            address : el.address,
            cidr : el.cidr,
            family : el.family,
            internal : ''+el.internal,
            mac : el.mac,
            netmask : el.netmask,
            scopeid: el.scopeid,
          })
          i++;
        })
      }
      return data;
    }
  }),
  data() {
      return {
        columns, 
      };
    },
  created() {
   this.getHost();
  },
  methods: {
    getHost: function(){
      let vm = this
      this.$store.dispatch('setHost');
      setTimeout(function(){vm.getHost()}, 4000)
    }
  },
  mounted: () => {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
