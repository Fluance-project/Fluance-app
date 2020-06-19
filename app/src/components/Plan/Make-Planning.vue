<template>
    <a-layout-content style="margin: 0 0px">
        <a-row :gutter="10">
          <a-col :span="24">
            <a-card title="" :bordered="false" style="margin-top: 24px; margin-bottom: 24px">
                <a-row>
                    <a-col :span="12" :offset="6">
                        <!-- <a-steps v-model="current" :current="current" change="onChange">
                        <a-step title="Informations" description="This is a description." />
                        <a-step title="Date et options" description="This is a description." />
                        <a-step title="Confirmation" description="This is a description." />
                        </a-steps> -->
                        <a-steps :current="current">
                            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
                        </a-steps>
                        <!-- <div class="steps-content">
                            {{ steps[current].content === "First-content" ? "Hello" : "Hi" }}
                        </div> -->
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
                                    v-decorator="[
                                    'select',
                                    { rules: [{ required: true, message: 'Selectionne équipement' }] },
                                    ]"
                                    placeholder="Selectionne équipement"
                                >
                                </a-select>
                            </a-form-item>
                            <a-form-item label="Type d'intervention">
                                <a-select
                                    v-decorator="[
                                    'select',
                                    { rules: [{ required: true, message: 'Selectionne type d\'intervention' }] },
                                    ]"
                                    placeholder="Selectionne type d'intervention"
                                >
                                    <a-select-option value="préventive">
                                    Préventive
                                    </a-select-option>
                                    <a-select-option value="prévisionelle">
                                    Prévisionelle
                                    </a-select-option>
                                    <a-select-option value="périodique">
                                    Périodique
                                    </a-select-option>
                                    <a-select-option value="corrective">
                                    Corrective
                                    </a-select-option>
                                    <a-select-option value="conditionelle">
                                    Conditionelle
                                    </a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item label="Description">
                                <a-textarea
                                    placeholder="Saisissez les détails, les conditions de réparation et les buts de l’intervention"
                                ></a-textarea>
                            </a-form-item>
                        </a-form>

                        <a-form v-if="steps[current].content === 'Second-content'">
                            <a-form-item label="Date plannifiée">
                                <a-date-picker
                                    v-decorator="['date-time-picker', config]"
                                    show-time
                                    format="DD/MM/YYYY HH:mm"
                                    placeholder="DD/MM/YYYY HH:mm"
                                />
                            </a-form-item>
                            <a-form-item label="Supperviseur">
                                <a-select
                                    v-decorator="[
                                    'select',
                                    { rules: [{ required: true, message: 'Choisissez un superviseur' }] },
                                    ]"
                                    placeholder="Choisissez un superviseur"
                                >
                                </a-select>
                            </a-form-item>
                            <a-form-item label="Attribué">
                                <a-select
                                    v-decorator="[
                                    'select',
                                    { rules: [{ required: true, message: 'Choisissez un technicien attribué' }] },
                                    ]"
                                    placeholder="Choisissez un technicien attribué"
                                >
                                </a-select>
                            </a-form-item>
                            <a-form-item label="Immobilisation">
                                <a-select
                                    v-decorator="[
                                    'select',
                                    { rules: [{ required: true, message: 'Selectionner une réponse' }] },
                                    ]"
                                    placeholder="Selectionner une réponse"
                                >
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
export default {
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
        };
  },
  methods: {
    onChange() {
        this.$message.success('Processing complete!')
        this.current++
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