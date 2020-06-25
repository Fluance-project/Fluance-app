<template>
    <a-layout-content style="margin: 0 0px">
      <a-row :gutter="10">
          <a-col :span="24">
            <a-card title="Membres de l'équipe" :bordered="false" style="margin-top: 24px; margin-bottom: 24px">
                <!-- <a slot="extra" href="/plannification/make-planning"> -->
                <!-- <router-link slot="extra" :to="{name : 'Plannification / Plannifier une intervention'}">
                    <a-tag color="#052068">
                        Ajouter un membre d'équipe
                    </a-tag>
                </router-link> -->
                <a-button slot="extra" color="#052068" type="primary" @click="showModal">
                    Ajouter un membre d'équipe
                </a-button>
                <a-modal v-model="visible" title="Ajouter un membre d'équipe">
                    <template slot="footer">
                        <a-button key="submit" type="primary" @click="handleSubmit">
                            Submit
                        </a-button>
                    </template>
                    <a-form :form="form" layout="horizontal">
                        <a-form-item
                            label="Nom"
                            >
                            <a-input v-model="newUser.nom" placeholder="Durant" />
                        </a-form-item>
                        <a-form-item
                            label="Prénom"
                            >
                            <a-input v-model="newUser.prenom" placeholder="Jean" />
                        </a-form-item>
                        <a-form-item
                            label="Intitulé"
                            >
                            <a-input v-model="newUser.intitule" placeholder="Intitulé du poste: Ex. Technicien" />
                        </a-form-item>
                        <a-form-item
                            label="Rôle"
                            >
                            <a-select
                                placeholder="Select a option and change input text above"
                                v-model="newUser.role"
                            >
                                <a-select-option v-for="r in role" v-bind:key=r.id :value="r.value">
                                {{ r.value }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-form>
                </a-modal>
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
const role = [
    {
        id: 1,
        value: "Opérateur"
    },
    {
        id: 2,
        value: "Responsable"
    },
    {
        id: 3,
        value: "Manager"
    },
]

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
            visible: false,
            form: this.$form.createForm(this, { name: 'coordinated' }),
            role,
            newUser: {
                nom: '',
                prenom: '',
                intitule: '',
                role: ''
            }
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
        showModal() {
            this.visible = true;
        },
        // handleOk(e) {
        //     console.log(e);
        //     this.visible = false;
        // },
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields(() => {
                this.dataUser.push({
                    key: this.dataUser.length + 1,
                    nom: this.newUser.nom,
                    intitule: this.newUser.intitule,
                    role: this.newUser.role
                })

            });
            console.log(this.dataUser)
            this.visible = false;
            this.newUser = {
                nom: '',
                prenom: '',
                intitule: '',
                role: ''
            }
        },
    }
}
</script>

<style scoped>

</style>