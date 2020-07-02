<template>
    <a-layout id="fluance" style="min-height: 100vh">
      <a-layout-sider collapsible v-model="collapsed" width="256">
        <router-link :to="{path:'/'}">
          <Logo :collapsed="collapsed" />
        </router-link>
        <a-menu theme="dark" :defaultSelectedKeys="['1']" mode="inline" v-if="isLoggedOn()">
          <a-menu-item key="0">
            <router-link :to="{path:'/'}">
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
              <span v-if="!collapsed">Planification</span>
            </span>
            <a-menu-item key="2.1">
              <router-link
                :to="{
                  path: '/planning'
                }"
              >
                  Planning d'intervention
              </router-link>
            </a-menu-item>
            <a-menu-item key="2.2">
              <router-link
                :to="{
                  path: '/make-planning'
                }"
              >
                Plannifier une intervention
              </router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="3">
            <span slot="title">
              <a-icon type="hdd" />
              <span v-if="!collapsed">Équipements</span>
            </span>
             <a-menu-item key="3">
              <router-link :to="{path : '/equipments'}">Vue d'ensemble</router-link>
            </a-menu-item>
            <a-menu-item key="4">
              <router-link :to="{path : '/module'}">Modules de suivi</router-link>
            </a-menu-item>
          </a-sub-menu>
          <a-menu-item key="5">
            <router-link :to="{path : '/membres'}">
              <a-icon type="team" />
              <span v-if="!collapsed">Membres</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="6">
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
        <a-layout-header v-if="isLoggedOn()" style="background: #fff; padding: 0 16px; box-shadow: 0px 2px 6px -1px rgba(148,148,148,0.15); z-index: 100">
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
          :style="{ background: 'transparent', minHeight: '280px' }"
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
        }
    },
    computed: mapState({
      route: state => state.app.route
    }),
    created: function() {
        if (this.isLoggedOn()) {
            // Restore session
            let session = JSON.parse(localStorage.getItem('fluance-data'));
            this.$store.dispatch('account/loadUser', session.token);
            this.$store.dispatch('app/loadJwt', session.token);
            this.getData();
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
        },
        getData() {
          this.$store.dispatch('equipment/loadEquipments', this.$store.getters['account/accountId']);
          this.$store.dispatch('member/loadMembers', this.$store.getters['account/accountId']);
        }
    }
}
</script>

<style scoped>
#app {
  min-height: 100vh;
}
#fluance {
  height: 100vh;
}
</style>