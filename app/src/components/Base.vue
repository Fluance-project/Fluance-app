<template>
    <a-layout id="demo-site" style="min-height: 100vh">
      <a-layout-sider collapsible v-model="collapsed">
        <router-link :to="{name:'Tableau-de-bord'}">
          <Logo :collapsed="collapsed" />
        </router-link>
        <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline" v-if="isLoggedOn()">
          <a-menu-item key="0">
            <router-link :to="{name:'Tableau-de-bord'}">
              <a-icon type="dashboard" />
              <span v-if="!collapsed">Tableau de bord</span>
            </router-link>
          </a-menu-item>
          <a-sub-menu key="1">
            <span slot="title">
              <a-icon type="form" />
              <span v-if="!collapsed">Tâches</span>
            </span>
          </a-sub-menu>
          <a-sub-menu key="2">
            <span slot="title">
              <a-icon type="calendar" />
              <span v-if="!collapsed">Plannification</span>
            </span>
            <a-menu-item key="2.1">
              <router-link
                :to="{name : 'Plannification / Planning d\'intervention',
                  path: 'planning'
                }"
              >
                  Planning
              </router-link>
            </a-menu-item>
            <a-menu-item key="2.2">
              <router-link
                :to="{name : 'Plannification / Plannifier une intervention',
                  path: 'make-planning'
                }"
              >
                Plannifier
              </router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="3">
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
          <a-menu-item key="4">
            <router-link :to="{path : '/settings'}">
              <a-icon type="team" />
              <span v-if="!collapsed">Membres</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="5">
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
              <!-- <router-link :to="{path : '/profile'}"> -->
                <a-dropdown>
                  <a-avatar icon="user"/>
                  <a-menu slot="overlay" v-if="isLoggedOn()">
                    <a-menu-item> View Profile</a-menu-item>
                    <a-menu-item  @click="logOut"> Logout </a-menu-item>
                  </a-menu>
                </a-dropdown>
              <!-- </router-link> -->
            </span>
          </a-row>
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '24px 16px', background: 'transparent', minHeight: '280px' }"
        >
          <router-view />
          <!-- <router-view name='Plan' /> -->
        </a-layout-content>
        <a-layout-footer style="text-align: center">Fluance | 2020</a-layout-footer>
      </a-layout>
    </a-layout>
</template>

<script>

import Logo from './Logo.vue'
import { mapState } from 'vuex'

export default {
    name: 'Base',
    components: {
        Logo
    },
    data () {
        return {
            collapsed: null,
            // route: this.$router.currentRoute.name,
        }
    },
    computed: mapState({
      route: state => state.home.route
    }),
    created: function() {
        if (!this.isLoggedOn()) {
        this.collapsed = true;
        } else {
        this.collapsed = false;
        }
    },
    methods: {
        isLoggedOn() {
          if (localStorage.getItem('fluance-data')) {
            return true
          } else {
            return false
          }
        },
        logOut() {
          this.$service.account.logout()
          this.$router.push({ path: '/login'})
        }
    }
}
</script>

<style scoped>
#app {
  min-height: 100vh;
}
#demo-site {
  height: 100vh;
}
</style>