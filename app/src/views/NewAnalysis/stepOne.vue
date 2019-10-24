<template>
     <a-upload-dragger
    name="file"
    accept=".csv"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    @change="handleChange"
  >
    <p class="ant-upload-drag-icon" style="margin-top: 32px">
      <a-icon type="inbox" />
    </p>
    <p class="ant-upload-text">Importer vos données</p>
    <p class="ant-upload-hint" style="margin-bottom: 32px">
    .csv est le seul format supporté actuellement
    </p>
  </a-upload-dragger>
</template>

<script>
export default {
  name: "StepOne",
  props: {
    msg: String
  },
  methods: {
      handleChange(info) {
        const status = info.file.status;
        if(status === 'uploading'){
                //eslint-disable-next-line
             console.log(info.file.percent);
        }
        if (status === 'done') {
          this.$message.success(`${info.file.name} envoyé correctement.`);
        } else if (status === 'error') {
          this.$message.error(`${info.file.name} file upload failed.`);
        }
      },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
