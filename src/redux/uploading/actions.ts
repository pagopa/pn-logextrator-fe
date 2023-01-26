import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiPaperChannel} from "../../api/paperChannelApi";


export enum DOWNLOAD_ACTIONS {
  GET_FILE = 'getFile',
  GET_PRESIGNED_URL = 'getPresignedUrl'
}

interface DownloadResponse {
  url ?:string,
  uid ?: string,
  retry ?: number
}

interface DownloadRequest {
  tenderCode ?: string,
  uid?: string
}
interface PresignedUrlResponse {
  url: string,
  uid: string,
}

export const getFile = createAsyncThunk<
  DownloadResponse,
  DownloadRequest
>(
  DOWNLOAD_ACTIONS.GET_FILE,
  async (request:DownloadRequest, thunkAPI) => {
    try {
      const response = await apiPaperChannel().downloadTenderFile(request.tenderCode, request.uid);
      if (response?.data?.status){
        if (response.data.status == "UPLOADING") {
          return {
            uid: response.data?.uuid,
            retry: response.data?.retryAfter,
            url: undefined,
          }
        } else if (response.data.status === "UPLOADED"){
          return {
            uid: response.data?.uuid,
            url: response.data?.url,
            retry: undefined
          }
        }
      }
      return {
        retry: undefined,
        uid: undefined,
        url: undefined
      };
    } catch (e){
      return thunkAPI.rejectWithValue(e);
    }
  }
)

export const getPresignedUrl = createAsyncThunk<
  PresignedUrlResponse,
  Object
>(
  DOWNLOAD_ACTIONS.GET_PRESIGNED_URL,
  async (_, thunkAPI) => {
    try {
      const response = await apiPaperChannel().addTenderFromFile();
      return {
        url: response.data.presignedUrl,
        uid: response.data.uuid
      } as PresignedUrlResponse
    } catch (e){
      return thunkAPI.rejectWithValue(e);
    }
  }
)