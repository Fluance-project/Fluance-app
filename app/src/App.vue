<template>
  <div id="app">
    <a-layout id="demo-site" style="min-height: 100vh">
      <a-layout-sider collapsible v-model="collapsed">
        <Logo :collapsed="collapsed" />
        <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline" v-if="isLoggedOn()">
          <a-menu-item key="1">
            <router-link :to="{path : '/'}">
              <a-icon type="home" />
              <span v-if="!collapsed">Tableau de bord</span>
            </router-link>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="fund" />
              <span v-if="!collapsed">Datastories</span>
            </span>
            <a-menu-item key="3">
              <router-link :to="{path : '/datastories'}">Mes datastories</router-link>
            </a-menu-item>
            <a-menu-item key="4">
              <router-link :to="{path : '/new-datastory'}">Créer une story</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="sliders" />
              <span v-if="!collapsed">Analyses</span>
            </span>
            <a-menu-item key="6">
              <router-link :to="{path : '/analysis'}">Mes analyses</router-link>
            </a-menu-item>
            <a-menu-item key="8">
              <router-link :to="{path : '/new-analysis'}">Analyser</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="9">
            <router-link :to="{path : '/settings'}">
              <a-icon type="setting" />
              <span v-if="!collapsed">Paramètres</span>
            </router-link>
          </a-menu-item>
          <a-row
            style="position: absolute; width: 100%; bottom: 70px;"
            type="flex"
            justify="center"
          >
            <a-button type="primary" v-if="!collapsed" @click="showModal">Tutoriel</a-button>
            <a-modal
              title="Bienvenue sur Datahourse"
              cancelText="Ne plus me rappeler"
              okText="Créer une data story"
              v-model="visible"
              @ok="handleOk"
              :okButtonProps="{ on: {click: () => {this.$router.push({ path: '/new-datastory'})}} }"
              :cancelButtonProps="{ on: {click: () => { this.closeModal() }} }"
            >
              <h3>Qu'es-ce que datahouse ?</h3>
              <p>Data house est votre outil de statistiques analytiques en ligne qui aide à obtenir de nouvelles idées à partir des diverses données de l'entreprise. Il vous permet de créer et de partager facilement des rapports et des tableaux de bord puissants et ad hoc en quelques minutes, sans aide informatique. Les données peuvent être importées à partir de fichiers, de flux web, d'applications commerciales populaires, de bases de données cloud et locales, de stockage en ligne, etc.</p>
              <h3>En quoi c'est pratique ?</h3>
              <p>Construisez vous même des data stories pertinentes pour vos dashboard d'entreprise. Explorées vos données à partir de vos propres sources parmis nos nombreux connecteurs (excel, SQL). Appliquez vous même des algorithmes et visualisez les resultats.</p>
              <h3>Par où commencer ?</h3>
              <p>Commencez par créer votre première Datastory en selectionnant sur "Datastories > Nouvelle datastory" dans le menu.</p>
            </a-modal>
          </a-row>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header v-if="isLoggedOn()"  style="background: #fff; padding: 0 16px">
          <a-row type="flex" justify="space-between">
            <h1>{{ route }}</h1>
            <router-link :to="{path : '/profile'}">
             <a-avatar icon="user" />
            </router-link>
          </a-row>
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '24px 16px', background: 'transparent', minHeight: '280px' }"
        >
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">Datahouse | 2019</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>


<script>
import Logo from "./components/logo";
import store from './store/store'

export default {
  name: "app",
  components: {
    Logo
  },
  data() {
    return {
      collapsed: null,
      visible: null,
      route: this.$router.currentRoute.name,
      user: store.getters.auth.userData
    };
  },
  created:  function() {
      let modalSession = this.$localStorage.get('welcomeModal')
      if(modalSession === null || modalSession === true) {
          this.showModal();
      }
      else {
         this.handleOk();
      }
      if(!this.isLoggedOn()){
        this.collapsed = true;
      }
      else{
        this.collapsed = false
      }
  },
  watch: {
    $route() {
      this.route = this.$router.currentRoute.name;
      if(this.$router.currentRoute.name === 'Profile'){
        document.getElementsByClassName('ant-menu-item-selected')[0].classList.remove('ant-menu-item-selected');
     }
    },
    store(){
      this.user = store.getters.auth.userData
    }
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk() {
      this.visible = false;
    },
    closeModal(){
      this.$localStorage.set('welcomeModal', false );
      this.handleOk();
    },
    isLoggedOn(){
      return store.getters.auth.loggedIn
    }
  }
};
</script>

<style>
#app {
  min-height: 100vh;
}
#demo-site {
  height: 100vh;
}
</style>
