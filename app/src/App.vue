<template>
  <div id="app">
    <a-layout id="demo-site" style="min-height: 100vh">
      <a-layout-sider collapsible v-model="collapsed">
        <router-link :to="{path : '/'}">
          <Logo :collapsed="collapsed" />
        </router-link>
        <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline" v-if="isLoggedOn()">
          <a-menu-item key="1">
            <router-link :to="{path : '/'}">
              <a-icon type="dashboard" />
              <span v-if="!collapsed">Tableau de bord</span>
            </router-link>
          </a-menu-item>
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="form" />
              <span v-if="!collapsed">Tâches</span>
            </span>
            <!-- <a-menu-item key="6">
              <router-link :to="{path : '/liveboards'}">Tâches à venir</router-link>
            </a-menu-item>
            <a-menu-item key="7">
              <router-link :to="{path : '/new-liveboards'}">Registre</router-link>
            </a-menu-item>
            <a-menu-item key="8">
              <router-link :to="{path : '/new-source'}">Alertes</router-link> -->
            <!-- </a-menu-item> -->
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="calendar" />
              <span v-if="!collapsed">Plannification</span>
            </span>
            <!-- <a-menu-item key="6">
              <router-link :to="{path : '/liveboards'}">Liste du materiel</router-link>
            </a-menu-item>
            <a-menu-item key="7">
              <router-link :to="{path : '/new-liveboards'}">Ajouter un materiel</router-link>
            </a-menu-item>
            <a-menu-item key="8">
              <router-link :to="{path : '/new-source'}">Catégories</router-link>
            </a-menu-item> -->
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <span slot="title">
              <a-icon type="hdd" />
              <span v-if="!collapsed">Équipements</span>
            </span>
            <!-- <a-menu-item key="3">
              <router-link :to="{path : '/datastories'}">Mes rapports</router-link>
            </a-menu-item>
            <a-menu-item key="4">
              <router-link :to="{path : '/new-datastory'}">Créer un rapports</router-link>
            </a-menu-item>
            <a-menu-item key="5">
              <router-link :to="{path : '/new-analysis'}">Importer & analyser</router-link>
            </a-menu-item> -->
          </a-sub-menu>
          <a-menu-item key="sub4">
            <router-link :to="{path : '/settings'}">
              <a-icon type="team" />
              <span v-if="!collapsed">Membres</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="sub5">
            <router-link :to="{path : '/settings2'}">
              <a-icon type="setting" />
              <span v-if="!collapsed">Paramètres</span>
            </router-link>
          </a-menu-item>
          <a-row
            style="position: absolute; width: 100%; bottom: 70px;"
            type="flex"
            justify="center"
          ></a-row>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header v-if="isLoggedOn()" style="background: #fff; padding: 0 16px">
          <a-row type="flex" justify="space-between">
            <a-breadcrumb style="margin: 22px 0 0 0">
              <a-breadcrumb-item>
                <a-icon type="home" />
              </a-breadcrumb-item>
              <a-breadcrumb-item>{{ route }}</a-breadcrumb-item>
            </a-breadcrumb>
            <span>
              <router-link :to="{path : '/activities'}">
                <a-badge dot style="margin-right: 16px">
                  <a-icon type="bell" />
                </a-badge>
              </router-link>
              <router-link :to="{path : '/profile'}">
                <a-avatar icon="user" />
              </router-link>
            </span>
          </a-row>
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '24px 16px', background: 'transparent', minHeight: '280px' }"
        >
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">Ritmic | 2019</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>


<script>
import Logo from "./components/logo";
import store from "./store/store";

export default {
  name: "app",
  components: {
    Logo
  },
  data() {
    return {
      collapsed: null,
      route: this.$router.currentRoute.name,
      user: store.getters.auth.userData,
    };
  },
  created: function() {
    if (!this.isLoggedOn()) {
      this.collapsed = true;
    } else {
      this.collapsed = false;
    }
  },
  watch: {
    $route() {
      this.route = this.$router.currentRoute.name;
      if (this.$router.currentRoute.name === "Profile") {
        document
          .getElementsByClassName("ant-menu-item-selected")[0]
          .classList.remove("ant-menu-item-selected");
      }
    },
    store() {
      this.user = store.getters.auth.userData;
    }
  },
  methods: {
    isLoggedOn() {
      return store.getters.auth.loggedIn;
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
