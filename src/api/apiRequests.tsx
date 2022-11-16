// import { apiClient } from "./apiClient";
import { Pa } from "../types";
import { getLogsProcessesType, getNotificationsInfoLogsType, getNotificationsMonthlyStatsLogsType, 
    getPersonIdType, getPersonTaxIdType, getPersonsLogsType, getAssociatedPaListType, getAggregationMovePaType, getAggregateParams, getAssociablePaListResponse, getAggregateResponse, addPaResponse, modifyAggregateType, createAggregateType, getUsagePlansType } from "./apiRequestTypes";
import { http as apiClient } from "./axiosClient"

/**
 * Return the person's ID depending on the input received
 * @param {getPersonIdType} data 
 */
const getPersonId = async (payload: getPersonIdType) => {
    return await apiClient.getPersonId(payload)
        .then((result) => {
            return result
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
 * Return the person's fiscal code depending on the input received
 * @param {getPersonTaxIdType} data 
 */

const getPersonTaxId = async (payload: getPersonTaxIdType) => {
    return await apiClient.getPersonTaxId(payload)
        .then((result) => {
            return result
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
 * Download the logs' archive related to a person's own activities or on a notification
 * @param {getPersonsLogsType} data 
 */
const getPersonsLogs = async (data: getPersonsLogsType) => {
    return await apiClient.getPersonsLogs(data)
        .then((result: any) => {
            return result;

        })
        .catch((error: any) => {
            throw error;
        })
}

/**
 * Download the logs' archive related to a person activities and its operators' ones
 * @param {getOperatorsLogsType} data 
 */
/*const getOperatorsLogs = async (data: getOperatorsLogsType) => {
    return await apiClient.getOperatorsLogs(data)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        })  
}*/

/**
 * Download the logs' archive containing the full info of a notification
 * @param {getNotificationsInfoLogsType} data 
 */
const getNotificationsInfoLogs = async (data: getNotificationsInfoLogsType) => {
    return await apiClient.getNotificationsInfoLogs(data)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
 * Download the logs' archive containing the notifications sent in a specific month
 * @param {getNotificationsMonthlyStatsLogsType} data 
 */
const getNotificationsMonthlyStatsLogs = async (data: getNotificationsMonthlyStatsLogsType) => {
    return await apiClient.getNotificationsMonthlyStatsLogs(data)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
 * Extract all log paths by given a specific traceId
 */
const getLogsProcesses = async (data: getLogsProcessesType) => {
    return await apiClient.getLogsProcesses(data)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
* Get a list of all the aggregations
*/

const getAggregates = async (data: getAggregateParams) => {
    return await apiClient.getAggregates(data)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
* Get the details of an aggregation
*/

const getAggregateDetails = async (id: string) => {
    return await apiClient.getAggregateDetails(id)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
* Create an aggregation
*/

const createAggregate = async (data: createAggregateType) => {
    return await apiClient.createAggregate(data)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
* Modify an aggregation
*/

const modifyAggregate = async (data: modifyAggregateType, id: string) => {
    return await apiClient.modifyAggregate(data, id)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
* Delete an aggregation
*/

const deleteAggregate = async (id: string) => {
    return await apiClient.deleteAggregate(id)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        })
}

 /**
 * Get associated PAs given an aggregation
 */
  const getAssociatedPaList = async (id: string, data?: getAssociatedPaListType) : Promise<getAssociatedPaListType> => {
    return await apiClient.getAssociatedPaList(id)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        })
}

/**
 * Move PAs to another aggregation
 */
const getAggregationMovePa = async (id: string, data?: getAggregationMovePaType) => {
    return await apiClient.getAggregationMovePa(id)
     .then((result: any) => {
         return result;
     })
     .catch((error: any) => {
         throw error;
     }) 
 }

const getAssociablePaList = async (name?: string) : Promise<getAssociablePaListResponse> => {
    return await apiClient.getAssociablePaList(name)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        }) 
}

const getAggregate = async (id: string) : Promise<getAggregateResponse> => {
    return await apiClient.getAggregate(id)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        }) 
}

const addPa = async (id: string, paSelectedList: Array<Pa>) : Promise<addPaResponse> => {
    return await apiClient.addPa(id, paSelectedList)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        }) 
}

/**
* Get the list of usage plans
*/
const getUsagePlans = async (data?: getUsagePlansType) => {
    return await apiClient.getUsagePlans(data)
        .then((result: any) => {
            return result;
        })
        .catch((error: any) => {
            throw error;
        })
}

export default {
    getPersonId, getPersonTaxId, getPersonsLogs, /*getOperatorsLogs,*/
    getNotificationsInfoLogs, getNotificationsMonthlyStatsLogs, getLogsProcesses, getAssociatedPaList, getAggregationMovePa, getAggregates, modifyAggregate, createAggregate, getAggregateDetails, deleteAggregate, getUsagePlans, addPa, getAggregate, getAssociablePaList
}
