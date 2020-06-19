// Just a test for this moment

const numMachine = 18

const numTask = 2

const tauxAvailable = 87.2

const snapShot = [
    {
        name: "Équipement",
        value: numMachine
    },
    {
        name: "Interventions plannifiées ce jour",
        value: numTask
    },
    {
        name: "Taux de disponibilité",
        value: tauxAvailable
    },
]

export function fetchSnapShot() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(snapShot)
        }, 300)
    })
}