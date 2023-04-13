import { getAggregatesResponse } from "./apiRequestTypes";

const aggregates_list: getAggregatesResponse = {
    lastEvaluatedId: "agg10",
    lastEvaluatedName: "Comuni Palermo",
    total: 13,
    items: Array.from(new Array(10), (val, index) => ({
        id: `agg_${index}`,
        name: `Comune indice ${index + 1}`,
        usagePlan: index % 2 === 0 ? "Medium" : "Large",
        createdAt: "2022-11-10 10:00:00"
    }))
}

const pa_list = {
    items: Array.from(new Array(15), (val, index) => ({
        id: `pa_1_${index}`,
        name: `Comune indice ${index + 1}`
    }))
};

const pa_list_associated = {
    items: Array.from(new Array(15), (val, index) => ({
        id: `pa_associated_1_${index}`,
        name: `Comune associato indice ${index + 1}`
    }))
};

const aggregate = {
    id: "agg1",
    name: "Comuni Lombardia",
    description: "Aggregazione dei comuni della Lombardia",
    usagePlan: {
        id: "1",
        name: "Medium",
        quota: 1000,
        rate: 1000,
        burst: 100
    },
    createdAt: "2022-11-10"
};

const search_pa = {
    lastEvaluatedKey: "1",
    items: [
        {
            id: "001",
            name: "Comune di Camposano",
        },
        {
            id: "002",
            name: "Comune di Cicciano"
        },
        {
            id: "003",
            name: "Comune di Nola"
        },
        {
            id: "004",
            name: "Comune di Napoli"
        },
        {
            id: "005",
            name: "Comune di Casamarciano"
        }
    ]
}

const api_key =
{
    items: [
        [
            {
                id: "0",
                name: "key 1",
                value: "attiva",
                groups: [
                    "gruppo key 1"
                ],
                status: "CREATED",
                pdnd: true
            }
        ]
    ],
    total: 1
}
const usage_plan_list = {
    items: [
        {
            id: "0",
            name: "Small",
            quota: 1000,
            rate: 100,
            burst: 30
        },
        {
            id: "1",
            name: "Medium",
            quota: 5000,
            rate: 1000,
            burst: 300
        },
        {
            id: "2",
            name: "Large",
            quota: 10000,
            rate: 2000,
            burst: 600
        }
    ]
};

const move_pa = {
    processed: 1,
    unprocessed: 0,
    unprocessedPA: []
}

export { pa_list, aggregate, pa_list_associated, usage_plan_list, aggregates_list, move_pa, search_pa, api_key }