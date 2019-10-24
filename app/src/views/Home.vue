<template>
  <a-layout-content style="margin: 0 16px">
    <div :style="{ padding: '24px', background: '#fff' }">
      <h1>Bienvenue sur Datahouse</h1>
      <a-row :gutter="16">
        <a-col :span="12">
          <h3>Temps réel, analyse, rapports</h3>
          <p>Datahouse est votre outil de statistiques analytiques en ligne qui aide à obtenir de nouvelles idées à partir des diverses données de l'entreprise. Il vous permet de créer et de partager facilement des rapports et des tableaux de bord puissants et ad hoc en quelques minutes, sans aide informatique. Les données peuvent être importées à partir de fichiers, de flux web, d'applications commerciales populaires, de bases de données cloud et locales, de stockage en ligne, etc.</p>
  
         <a-button type="primary" v-if="!collapsed" @click="showModal">Débuter sur Datahouse</a-button>
          <a-modal
            title="Débuter sur Datahouse"
            cancelText="Ne plus me rappeler"
            okText="Commencer une analyse"
            v-model="visible"
            @ok="handleOk"
            :okButtonProps="{ on: {click: () => {this.$router.push({ path: '/new-analysis'}); this.closeModal() }} }"
            :cancelButtonProps="{ on: {click: () => { this.closeModal() }} }"
          >
            <h3>Qu'es-ce que datahouse ?</h3>
            <p>Data house est votre outil de statistiques analytiques en ligne qui aide à obtenir de nouvelles idées à partir des diverses données de l'entreprise. Il vous permet de créer et de partager facilement des rapports et des tableaux de bord puissants et ad hoc en quelques minutes, sans aide informatique. Les données peuvent être importées à partir de fichiers, de flux web, d'applications commerciales populaires, de bases de données cloud et locales, de stockage en ligne, etc.</p>
            <h3>En quoi c'est pratique ?</h3>
            <p>Construisez vous même des moniteurs en temps réel pertinents pour vos dashboard d'entreprise. Explorez vos données à partir de vos propres sources parmis nos nombreux connecteurs (excel, SQL). Appliquez vous même des algorithmes et visualisez les resultats et générez en un clic des rapports.</p>
            <h3>Par où commencer ?</h3>
            <p>Vous pouvez pourquoi pas commencer par analyser votre premier moniteur temps réel ! Rendez-vous dans l'onglet Temps réel > Sources Pour ajouter une source de donnée temps réel (API).</p>
          </a-modal>
        </a-col>
        <a-col :span="12">
          <img
            style="margin: 0 auto; display: block;   padding: 12px 0; max-height: 180px "
            src="../assets/stats.png"
          />
        </a-col>
      </a-row>
    </div>
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card title="Dernières activités" :bordered="false" style="margin-top: 24px">
          <a-empty />
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="Notifications" :bordered="false" style="margin-top: 24px">
          <a-empty />
        </a-card>
      </a-col>
    </a-row>
  </a-layout-content>
</template>

<script>
export default {
  name: "Home",
  props: {
    msg: String
  },
  data() {
    return {
      collapsed: null,
      visible: null,
      hour: "00:00"
    };
  },
  created: function() {
    let modalSession = this.$localStorage.get("welcomeModal");
    if (modalSession === null || modalSession === true) {
      this.showModal();
    } else {
      this.handleOk();
    }
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
