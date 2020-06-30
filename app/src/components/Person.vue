<template>
    <a-layout-content style="margin: 0 0px">
      <a-row :gutter="10">
          <a-col :span="24">
            <a-card title="Membres de l'équipe" :bordered="false" style="margin-top: 24px; margin-bottom: 24px">
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
                    <template
                        v-for="col in ['fistName', 'lastName', 'intitule', 'role']"
                        :slot="col"
                        slot-scope="text, record"
                        >
                        <div :key="col">
                            <a-input
                            v-if="editable"
                            style="margin: -5px 0"
                            :value="text"
                            @change="e => handleChange(e.target.value, record.user_id.$oid, col)"
                            />
                            <template v-else>
                            {{ text }}
                            </template>
                        </div>
                    </template>
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
                        <a-divider type="vertical" />
                        <span class="editable-row-operations">
                            <span v-if="editable">
                            <a @click="() => save(record.user_id.$oid)">Save</a> <a-divider type="vertical" />
                            <a-popconfirm
                                title="Confirmer la suppression ?"
                                okText="Oui"
                                cancelText="Non"
                                @confirm="() => cancel()">
                                <a>Cancel</a>
                            </a-popconfirm>
                            </span>
                            <span v-else>
                            <a :disabled="editingKey !== ''" @click="() => edit(record.user_id.$oid)">
                                <a-icon href="javascript:;" type="edit" />
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
    {
        title: 'Prénom',
        dataIndex: 'fistName',
        key: 'fistName',
        scopedSlots: { customRender: 'fistName' },
    },
       {
        title: 'Nom',
        dataIndex: 'lastName',
        key: 'lastName',
        scopedSlots: { customRender: 'lastName' },
    },
    {
        title: 'Intitulé',
        dataIndex: 'title',
        key: 'title',
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
            editable: false,
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
            this.newUser[column] = value
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
            this.editingKey = key;
            this.editable = true;
        },
        save(key) {
            this.$store.dispatch('member/editEMember', {
                account_id: this.$store.getters['account/accountId'],
                member_id: key,
                member_data: this.newUser
            });
            this.editable = false;
            this.editingKey = '';

            const hide = this.$message.loading('Updating...', 0);
            setTimeout(hide, 500);
            this.sleep(500).then(() => {
            this.$message.success('Membre updated', 4);
            this.$store.dispatch('member/loadMembers', this.$store.getters['account/accountId']);
            })
            this.initNewUser();
        },
        cancel() {
            this.editable = false;
            this.editingKey = '';
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
            this.initNewUser();
        },
        initNewUser() {
            // initial form
            this.newUser = {
                nom: '',
                prenom: '',
                intitule: '',
                role: ''
            }
        }
    }
}
</script>

<style scoped>

</style>