<template>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Introduction</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff' }">
          <h3>Résumé</h3>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-statistic title="Feedback" :value="1128" style="margin-right: 50px">
                <template v-slot:suffix>
                  <a-icon type="like" />
                </template>
              </a-statistic>
            </a-col>
            <a-col :span="12">
              <a-statistic title="Unmerged" :value="93" valueClass="demo-class">
                <template v-slot:suffix>
                  <span>/ 100</span>
                </template>
              </a-statistic>
            </a-col>
          </a-row>
        </div>
      </a-layout-content>
</template>

<script>
export default {
  name: "Home",
  props: {
    msg: String
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
