<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <Base/>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import Base from './components/Base.vue'

export default {
  name: 'App',
  components: {
    Base
  }
}
</script>

<style>
.ant-card-head-title {
  font-size: 16px;
  color: #595959;
  font-weight: 300;
}

.ant-table-tbody > tr.ant-table-row-level-0:hover > td  {
  background-color: #F3F6FC!important;
}
</style>
