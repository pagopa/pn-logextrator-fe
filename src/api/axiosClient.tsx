import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getAggregatesResponseMockPag1, getAggregatesResponseMockPag2 } from "./mockFile";
import { getLogsProcessesType, getNotificationsInfoLogsType, getNotificationsMonthlyStatsLogsType, getPersonIdType, getPersonsLogsType, getPersonTaxIdType, getAssociatedPaListType, getAggregationMovePaType, getAggregateParams, getAggregateResponse } from "./apiRequestTypes";
import { agg_list, pa_list } from "./pa_agg_response";

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "*/*",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      headers,
    });

    http.interceptors.response.use(
      (response: any) => response,
      (error: any) => {
        throw error;
      }
    );

    http.interceptors.request.use(
      (request: any) => {
        const token = sessionStorage.getItem("token")
        const accessToken = sessionStorage.getItem("accessToken")
        request.headers = {
          ...request.headers,
          Authorization: `Bearer ${token}`,
          Auth: accessToken
        }
        return request
      }
    );
    this.instance = http;
    return http;
  }

  getPersonTaxId<T = any, R = AxiosResponse<T>>(payload: getPersonTaxIdType): Promise<R> {
    return this.http.post<T, R>("/persons/v1/tax-id", payload)
  }

  getPersonId<T = any, R = AxiosResponse<T>>(payload: getPersonIdType): Promise<R> {
    return this.http.post<T, R>("/persons/v1/person-id", payload)
  }

  getPersonsLogs<T = any, R = AxiosResponse<T>>(payload: getPersonsLogsType): Promise<R> {
    return this.http.post<T, R>("logs/v1/persons", payload)
  }

  /*getOperatorsLogs<T = any, R = AxiosResponse<T>>(payload: getOperatorsLogsType): Promise<R> {
    return this.http.post<T, R>("logs/operators", payload )
  }*/

  getNotificationsInfoLogs<T = any, R = AxiosResponse<T>>(payload: getNotificationsInfoLogsType): Promise<R> {
    return this.http.post<T, R>("logs/v1/notifications/info", payload)
  }

  getNotificationsMonthlyStatsLogs<T = any, R = AxiosResponse<T>>(payload: getNotificationsMonthlyStatsLogsType): Promise<R> {
    return this.http.post<T, R>("logs/v1/notifications/monthly", payload)
  }

  getLogsProcesses<T = any, R = AxiosResponse<T>>(payload: getLogsProcessesType): Promise<R> {
    return this.http.post<T, R>("logs/v1/processes", payload)
  }

  getAggregates(payload: getAggregateParams): Promise<getAggregateResponse> {
    //return this.http.get<GetAggregateResponse>(ENHANCE_ROUTE_WITH_QUERY('aggregate', payload));
    console.log("call getAggregates with payload", payload);
    return new Promise((resolve, reject) => {
      if(payload.name === "error") {
        reject("Errore di sistema");
      } else if(payload.lastEvaluatedId === "") {
        console.log("response", getAggregatesResponseMockPag1);
        resolve(getAggregatesResponseMockPag1)
      } else if(payload.lastEvaluatedId === "agg10") {
        console.log("response", getAggregatesResponseMockPag2);
        resolve(getAggregatesResponseMockPag2)
      }  
        
    })
  } 

  deleteAggregate(id: string): Promise<string> {
    //return this.http.delete<string>("aggregate");
    return new Promise((resolve) => {
      resolve(id);
    })
  }

  getAssociatedPaList<T = any, R = AxiosResponse<T>>(id: string, payload?: getAssociatedPaListType): Promise<R> {
    /* return this.http.post<T, R>(`/aggregate/${id}/associated-pa`, payload) */
    return Promise.resolve(pa_list as unknown as R)
  }

  getAggregationMovePa<T = any, R = AxiosResponse<T>>(id: string, payload?: getAggregationMovePaType): Promise<R> {
    /* return this.http.post<T, R>(`/aggregate/${id}/move-pa`, payload) */
    return Promise.resolve({ status: 200 } as unknown as R)
  }
}

export const http = new Http();