<template>
    <div>
      <a-card  :bordered="false" style="">
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      
      <StepOne v-if=" current === 0" />
      <StepOne v-if=" current === 1" />
      <StepOne v-if=" current === 2" />

    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">
        Suivant
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="$message.success('Processing complete!')"
      >
        Terminer
      </a-button>
      <a-button v-if="current>0" style="margin-left: 8px" @click="prev">
        Précédent
      </a-button>
    </div>
      </a-card>
  </div>
</template>

<script>
import StepOne from './NewAnalysis/stepOne'
export default {
  name: "NewAnalysis",
  props: {
    msg: String
  },
  components: {
    StepOne
  },
  data() {
      return {
        current: 0,
        steps: [
          {
            title: 'Importer vos données'
          },
          {
            title: 'Analyser'
          },
          {
            title: 'Sauvegarder & exporter'
          },
        ],
      };
    },
    methods: {
      next() {
        this.current++;
      },
      prev() {
        this.current--;
      },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .steps-content {
    margin: 42px 0;
    text-align: center;
  }
</style>
