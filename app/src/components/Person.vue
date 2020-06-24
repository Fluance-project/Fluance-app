<template>
    <a-layout-content style="margin: 0 0px">
      <a-row :gutter="10">
          <a-col :span="24">
            <a-card title="Membres de l'équipe" :bordered="false" style="margin-top: 24px; margin-bottom: 24px">
                <!-- <a slot="extra" href="/plannification/make-planning"> -->
                <router-link slot="extra" :to="{name : 'Plannification / Plannifier une intervention'}">
                    <a-tag color="#052068">
                        Ajouter un membre d'équipe
                    </a-tag>
                </router-link>
                <!-- </a> -->
                <a-table :columns="columns" :data-source="dataUser" :pagination=true>
                    <template
                        v-for="col in ['nom', 'intitule', 'role']"
                        :slot="col"
                        slot-scope="text, record"
                        >
                        <div :key="col">
                            <a-input
                            v-if="record.editable"
                            style="margin: -5px 0"
                            :value="text"
                            @change="e => handleChange(e.target.value, record.key, col)"
                            />
                            <template v-else>
                            {{ text }}
                            </template>
                        </div>
                    </template>
                    <!-- delete event -->
                    <template slot="operation" slot-scope="text, record">
                        <a-popconfirm
                        v-if="dataUser.length"
                        title="Sure to delete?"
                        @confirm="() => onDelete(record.key)"
                        >
                        <a href="javascript:;">
                            <a-icon type="delete" />
                        </a>
                        </a-popconfirm>
                        <a-divider type="vertical" />
                        <span class="editable-row-operations">
                            <span v-if="record.editable">
                            <a @click="() => save(record.key)">Save</a> <a-divider type="vertical" />
                            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
                                <a>Cancel</a>
                            </a-popconfirm>
                            </span>
                            <span v-else>
                            <a :disabled="editingKey !== ''" @click="() => edit(record.key)">
                                <a-icon type="edit" />
                            </a>
                            </span>
                        </span>
                    </template>
                </a-table>
            </a-card>
            </a-col>
      </a-row>
  </a-layout-content>    
</template>

<script>
const columns = [
    // {
    //   title: 'Id',
    //   dataIndex: 'id',
    //   key: 'id',
    // },
    {
        title: 'Nom',
        dataIndex: 'nom',
        key: 'nom',
        scopedSlots: { customRender: 'nom' },
    },
    {
        title: 'Intitulé',
        dataIndex: 'intitule',
        key: 'intitule',
        scopedSlots: { customRender: 'intitule' },
    },
    {
        title: 'Rôle',
        dataIndex: 'role',
        key: 'role',
        scopedSlots: { customRender: 'role' },
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation'},
    },
]

const dataUser = [
    {
        key: 1,
        nom: "Nguyen Khac Bao Anh",
        intitule: "Software Engineer",
        role: "Developper"
    },
    {
        key: 2,
        nom: "Tayeb SAIDI",
        intitule: "Software Engineer",
        role: "Developper"
    },
    {
        key: 3,
        nom: "Lucille FRANCO",
        intitule: "Marketing Lead",
        role: "blabla"
    },
    {
        key: 4,
        nom: "Myriam MASMOUDI",
        intitule: "Customer Manager",
        role: "blabla"
    },
    {
        key: 5,
        nom: "Wladimir DELENCLOS",
        intitule: "Product Owner",
        role: "blabla"
    },
]

export default {
    name: "Person",

    data() {
        this.cacheData = dataUser.map(item => ({ ...item }));
        return {
            columns,
            dataUser,
            editingKey: '',
        }
    },

    created() {
        this.$store.dispatch('home/loadRoute', this.$router.currentRoute.name);
    },
    methods: {
        handleChange(value, key, column) {
            const newDataUser = [...this.dataUser];
            const target = newDataUser.filter(item => key === item.key)[0];
            if (target) {
                target[column] = value;
                this.dataUser = newDataUser;
            }
        },
        onDelete(key) {
            const dataUser = [...this.dataUser];
            this.dataUser = dataUser.filter(item => item.key !== key);
        },
        edit(key) {
            const newDataUser = [...this.dataUser];
            const target = newDataUser.filter(item => key === item.key)[0];
            this.editingKey = key;
            if (target) {
                target.editable = true;
                this.dataUser = newDataUser;
            }
        },
        save(key) {
            const newDataUser = [...this.dataUser];
            const newCacheData = [...this.cacheData];
            const target = newDataUser.filter(item => key === item.key)[0];
            const targetCache = newCacheData.filter(item => key === item.key)[0];
            if (target && targetCache) {
                delete target.editable;
                this.dataUser = newDataUser;
                Object.assign(targetCache, target);
                this.cacheData = newCacheData;
            }
            this.editingKey = '';
        },
        cancel(key) {
            const newDataUser = [...this.dataUser];
            const target = newDataUser.filter(item => key === item.key)[0];
            this.editingKey = '';
            if (target) {
                Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
                delete target.editable;
                this.dataUser = newDataUser;
            }
        },
    }
}
</script>

<style scoped>

</style>