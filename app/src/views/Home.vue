<template>
  <a-layout-content style="margin: 0 16px">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card title="Dernières activités" :bordered="false" style="margin-top: 24px">
          <a-empty />
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="Alerte de maintenance" :bordered="false" style="margin-top: 24px">
          <a-empty />
        </a-card>
      </a-col>
    </a-row>
    <div>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-card title="Temps réel" :bordered="false" style="margin-top: 24px">
        <vue-plotly :data="data" :layout="layout" :options="options"/>
        </a-card>
        </a-col>
      </a-row>
    </div>
  </a-layout-content>
</template>

<script>
import VuePlotly from '@statnett/vue-plotly';
import store from "../store/store";
export default {
  name: "Home",
  props: {
    msg: String
  },
  components: {
    VuePlotly
  },
  data() {
    return {
      collapsed: null,
      visible: null,
      hour: "00:00",
      data: [{ x: [1, 3, 8, 8, 6, 7, 4, 2, 3], y: [2, 3, 3, 4,  4, 2, 3] }],
      layout: {},
      options: {}
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
     console.log(usrData)
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
</style>
