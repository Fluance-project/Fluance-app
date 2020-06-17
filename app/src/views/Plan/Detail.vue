<template>
    <a-layout-content style="margin: 0 0px">
        <a-row>
          <a-col :span="24">
            <a-card title="Interventions à venir" :bordered="false">
                
            </a-card>
          </a-col>
        </a-row>
    </a-layout-content>
</template>

<script>

const dataDetail = {
    id: '#136',
    equipement: 'Fraiseuse Siemens AD45 [...]',
    type: 'corrective',
    date: new Date('2017-10-03  19:23:12').getDate("YYYY/MM/DD"),
    assign: 'Damien Rimiaux',
    superviser: 'Romain Gourmand',
    status: 'A faire'
}

export default {
    name: "Detail",
    data () {
        return {
            dataDetail
        }
    }
}
</script>

<style scoped>

</style>