<template>

  <a-card class="equipment-card">
    <a-row>
      <a-col :span="2">
         <span :class="statusCalc">
            <a-icon v-if="status" type="check" />
            <a-icon v-else type="pause" />
          </span>
      </a-col>
      <a-col  :span="22">
        <h3>{{title}}</h3>
        <p>Dernière intervention: <span>{{lastIntervention}}</span><br/>
        Suivi automatique: <span>non configuré</span></p>
      </a-col>
    </a-row>
   
  
  </a-card>

</template>

<script>

export default {
  name: "equipement-card",
  props: {
    lastIntervention: String,
    title: String,
    status: Boolean,
  },
  computed: {
    statusCalc: function () {
      console.log(this.status);
      if(this.status){
        return "status status-on"
      } else {
        return "status status-off"
      }
    }
  },
  data() {
    return {
     
    };
  },

};
</script>

<style scoped>
.equipment-card .status{
  display: block;
  height: 26px;
  width: 26px;
  border-radius: 50%;
}

.anticon{
 color: #fff;
 padding: 6px;
}

.status-on{
background-color: #52C41A;
}
.status-off{
background-color: #FAAD14;
}
.equipment-card p {
    color: #8C8C8C;
    margin-bottom: 6px;
}
.equipment-card p > span {
    color: #041627;
    display: inline;
}
</style>
