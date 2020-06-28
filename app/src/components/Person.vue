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
                            Ajouter
                        </a-button>
                    </template>
                    <a-form :form="form" layout="horizontal">
                        <a-form-item
                            label="Nom"
                            >
                            <a-input v-model="newUser.lastName" placeholder="Durant" />
                        </a-form-item>
                        <a-form-item
                            label="Prénom"
                            >
                            <a-input v-model="newUser.firstName" placeholder="Jean" />
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
                <a-table :columns="columns" :data-source="members">
                    <a slot="name" slot-scope="text">{{ text }}</a>
                    <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
                    <span slot="tags" slot-scope="tags">
                    <a-tag
                        v-for="tag in tags"
                        :key="tag"
                        :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
                    >
                        {{ tag.toUpperCase() }}
                    </a-tag>
                    </span>
                    <template slot="action" slot-scope="text, record">
                    <a-popconfirm
                    v-if="members.length"
                    title="Confirmer la suppression ?"
                    okText="Oui"
                    cancelText="Non"
                    @confirm="() => onDelete(record.user_id.$oid)"
                    >
                    <a href="javascript:;">Supprimer</a>
                    </a-popconfirm>
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
    {
        title: 'Prénom',
        dataIndex: 'fistName',
        key: 'fistName',
    },
       {
        title: 'Nom',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Intitulé',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Rôle',
        dataIndex: 'role',
        key: 'role',
    },
    {
        title: 'Operation',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action'},
    },
]


import { mapState } from 'vuex'
export default {
    name: "Person",
    data() {
        return {
            columns,
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
  computed: {
    ...mapState({
         members: state => state.member.members,
    }),
    },
    beforeMount() {
        this.$store.dispatch('app/loadRoute', this.$router.currentRoute.name);
        this.$store.dispatch('member/loadMembers', this.$store.getters['account/accountId']);
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
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        onDelete(data) {
            console.log(data);
             this.$store.dispatch('member/deleteMember',  { account_id: this.$store.getters['account/accountId'], data});
            const hide = this.$message.loading('Suppression...', 0);
            setTimeout(hide, 500);
            this.sleep(500).then(() => {
            this.$message.success('Membre supprimé', 4);
            this.$store.dispatch('member/loadMembers', this.$store.getters['account/accountId']);
        })
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
        handleSubmit() {
            let data = {
                firstName: this.newUser.firstName,
                lastName: this.newUser.lastName,
                intitule: this.newUser.intitule,
                role: this.newUser.role
            }
            this.$store.dispatch('member/addMember', { account_id: this.$store.getters['account/accountId'], ...data});
              this.$store.dispatch('member/loadMembers', this.$store.getters['account/accountId']);
            this.visible = false;
        },
    }
}
</script>

<style scoped>

</style>