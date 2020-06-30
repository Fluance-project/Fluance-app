<template>
    <a-layout-content style="margin: 0 0px">
        <a-row :gutter="10">
          <a-col :span="24">
            <a-card title="" :bordered="false" style="margin-top: 24px; margin-bottom: 24px">
                <a-row>
                    <a-col :span="12" :offset="6">
                        <a-steps :current="current">
                            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
                        </a-steps>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12" :offset="6">
                        <a-row>
                        <a-form v-if="steps[current].content === 'First-content'">
                            <a-form-item label="Title" placeholder="Hello">
                                <a-input
                                    placeholder="Rédigez un court titre pour la tâche"
                                ></a-input>
                            </a-form-item>
                            <a-form-item label="Équipements">
                                <a-select
                                    label-in-value
                                    style="width: 100%"
                                    v-model="newTask.machine_id"
                                >
                                    <a-select-option v-for="(el, index) in equipment" v-bind:key="index" :value="el.id">
                                        {{el.name}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item label="Type d'intervention">
                                <a-select
                                    v-decorator="[
                                    'select',
                                    { rules: [{ required: true, message: 'Selectionne type d\'intervention' }] },
                                    ]"
                                    placeholder="Selectionne type d'intervention"
                                    v-model="newTask.type"
                                >
                                    <a-select-option
                                        v-for="t in ['PREVISIONELLE', 'PERIODIQUE', 'CORRECTIVE', 'PREVENTIVE', 'CONDITIONELLE']"
                                        v-bind:key="typeIntervention[t]['TYPE']"
                                        :value="typeIntervention[t]['TYPE']"
                                    >
                                        {{ typeIntervention[t]['NAME'] }}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item label="Description">
                                <a-textarea
                                    placeholder="Saisissez les détails, les conditions de réparation et les buts de l’intervention"
                                    v-model="newTask.description"
                                ></a-textarea>
                            </a-form-item>
                        </a-form>

                        <a-form v-if="steps[current].content === 'Second-content'">
                            <a-form-item label="Date plannifiée">
                                <a-date-picker
                                    v-decorator="['date-time-picker', config]"
                                    show-time
                                    format="DD-MM-YYYYTHH:mm:ss[Z]ZZ"
                                    placeholder="DD/MM/YYYY HH:mm"
                                    v-model="newTask.start_date"
                                />
                            </a-form-item>
                            <a-form-item label="Superviseur">
                                 <a-select
                                    label-in-value
                                    style="width: 100%"
                                    v-model="newTask.supervisor"
                                >
                                    <a-select-option v-for="(el, index) in member" v-bind:key="index" :value="el.user_id['$oid']">
                                        {{el.fistName}}  {{el.lastName}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item label="Attribué">
                               <a-select
                                    label-in-value
                                    style="width: 100%"
                                    v-model="newTask.assigned"
                                >
                                    <a-select-option v-for="(el, index) in member" v-bind:key="index" :value="el.user_id['$oid']">
                                        {{el.fistName}}  {{el.lastName}}
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item label="Immobilisation">
                                <a-select
                                    v-decorator="[
                                    'select',
                                    { rules: [{ required: true, message: 'Selectionner une réponse' }] },
                                    ]"
                                    placeholder="Selectionner une réponse"
                                    v-model="newTask.immobilised"
                                >
                                    <a-select-option :value="true">
                                        Oui
                                    </a-select-option>
                                    <a-select-option :value="false">
                                        Non
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                        </a-form>
                        <div v-if="steps[current].content === 'Last-content'">
                            <a-result
                                status="success"
                                title="Intervention plannifiée"
                                sub-title="numéro de ticket: #1233"
                            ></a-result>
                            <a-descriptions title="Tiket Info" layout="vertical">
                                <a-descriptions-item label="Équipement:">
                                Siemens Prechauf
                                </a-descriptions-item>
                                <a-descriptions-item label="Responsable:">
                                Adrien Deleclos
                                </a-descriptions-item>
                                <a-descriptions-item label="Type d’intervention:">
                                Correctif
                                </a-descriptions-item>
                                <a-descriptions-item label="Détails" span="2">
                                Immobilisation: requise
                                Il faut faire ci, faire ça etc etc
                                </a-descriptions-item>
                                <a-descriptions-item label="Remarque">
                                empty
                                </a-descriptions-item>
                            </a-descriptions>
                        </div>
                        </a-row>
                        <a-row type="flex" align="middle">
                            <a-col :span="24" align="middle">
                            <a-button v-if="current < steps.length - 2" type="primary" @click="next">
                                Continue
                            </a-button>
                            <a-button
                                v-if="current == steps.length - 2"
                                type="primary"
                                @click="onChange"
                            >
                                Terminer et plannifier
                            </a-button>
                            <a-button v-if="current > 0 && current <= steps.length - 2" style="margin-left: 8px" @click="prev">
                                Previous
                            </a-button>
                            <button
                                v-if="current > steps.length - 2"
                                type="primary"
                                align="middle"
                            >
                                Voir le planning
                            </button>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </a-card>
          </a-col>
        </a-row>
    </a-layout-content>
</template>

<script>
import { mapState } from 'vuex';

const typeIntervention = {
    PREVISIONELLE: {
        NAME: "Prévisionelle",
        TYPE: 0
    },
    PERIODIQUE: {
        NAME: "Périodique",
        TYPE: 1
    },
    CORRECTIVE: {
        NAME: "Corrective",
        TYPE: 2
    },
    PREVENTIVE: {
        NAME: "Préventive",
        TYPE: 3
    },
    CONDITIONELLE: {
        NAME: "Conditionelle",
        TYPE: 4
    },
}

export default {
    name: "Planifier une intervention",
    data() {
        return {
            current: 0,
            steps: [
                {
                    title: 'Informations',
                    content: 'First-content',
                },
                {
                    title: 'Date et options',
                    content: 'Second-content',
                },
                {
                    title: 'Confirmation',
                    content: 'Last-content',
                },
            ],
            config: {
                rules: [{ type: 'object', required: true, message: 'Please select time!' }],
            },
            newTask: {
                type: Number,
                description: '',
                start_date: '',
                isClosed: false,
                end_date: null,
                immobilised: Boolean,
                machine_id: '',
                account_id: '',
                supervisor: '',
                assigned: ''
            },
            typeIntervention
        };
    },
    computed: mapState({
        equipment: state => state.equipment.equipments,
        member: state => state.member.members
    }),
    beforeMount() {
        this.$store.dispatch('app/loadRoute', this.$router.currentRoute.name);
    },
    methods: {
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        onChange() {
            this.$message.success('Processing complete!')
            // console.log(this.newTask)
            // console.log(this.newTask.start_date.format() + 'Z' + this.newTask.start_date.format("ZZ"))
            // console.log(this.newTask.assigned.key)
            this.current++
            const task_data = {
                type: this.newTask.type,
                description: this.newTask.description,
                start_date: this.newTask.start_date.format("YYYY-MM-DDTHH:mm:ss") + 'Z' + this.newTask.start_date.format("ZZ"),
                isClosed: false,
                end_date: null,
                immobilised: this.newTask.immobilised,
                machine_id: this.newTask.machine_id.key,
                account_id: this.$store.getters['account/accountId'],
                supervisor: this.newTask.supervisor.key,
                assigned: this.newTask.assigned.key
            }
            // console.log(task_data)
            const hide = this.$message.loading('Creating...', 0);
            setTimeout(hide, 500);
            this.sleep(500).then(() => {
                this.$message.success('Task added', 4);
                this.$store.dispatch('task/addTask', {task_data: task_data})
            })
        },
        next() {
        this.current++;
        },
        prev() {
        this.current--;
        },

    },
}
</script>

<style scoped>

</style>