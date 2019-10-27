<template>
    <div>
        <a-card>
            <h3>Ajouter une source</h3>
            <div style="margin-bottom: 16px; margin-top: 16px">
                <a-input placeholder="https://domain.com/get">
                    <a-select defaultValue=".com" slot="addonAfter" style="width: 220px">
                        <a-select-option value=".com">.com</a-select-option>
                        <a-select-option value=".jp">.jp</a-select-option>
                        <a-select-option value=".cn">.cn</a-select-option>
                        <a-select-option value=".org">.org</a-select-option>
                    </a-select>
                </a-input>
            </div>
            <a-row justify="end" type="flex">
                <a-col :span="3">
                    <a-button style="width: 100%" type="primary">Ajouter</a-button>
                </a-col>
            </a-row>
        </a-card>
        <a-card style="margin-top: 16px">
           <h3 >Sources enregistrés</h3>
           <a-table class="margin-top: 16px" :columns="columns" :dataSource="data">
              <a slot="action">Delete</a>
              <p slot="expandedRowRender" slot-scope="record" style="margin: 0">{{record.description}}</p>
           </a-table>
        </a-card>
    </div>
</template>

<script>
   const columns = [
      { title: 'Domaine', dataIndex: 'name', key: 'name' },
      { title: 'Path', dataIndex: 'age', key: 'age' },
      { title: 'Protocole', dataIndex: 'address', key: 'address' },
      { title: 'Action', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } },
   ];

   const data = [
      {
         key: 1,
         name: 'John Brown',
         age: 32,
         address: 'New York No. 1 Lake Park',
         description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      },
      {
         key: 2,
         name: 'Jim Green',
         age: 42,
         address: 'London No. 1 Lake Park',
         description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
      },
      {
         key: 3,
         name: 'Joe Black',
         age: 32,
         address: 'Sidney No. 1 Lake Park',
         description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
      },
   ];

    export default {
        name: "New Source",
        props: {
            msg: String
        },
       data () {
           return {
              data,
              columns,
           }
       }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
