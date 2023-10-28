import request from "../util/request";
import { AxiosResponse } from 'axios';
import { DocumentType} from "../util/variableTypes";
import { ChangeEvent } from "react";

// file api
interface resultDocumentType{
  code:number
  msg?:string
  token:string,
  documentInfo:any
}

var config = {
    onUploadProgress: function(progressEvent: { loaded: number; total: number; }) {
      var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
    }
  };


/* get all document list */
export const getDocumentList = () => request.post("/file/allDocuments")


export async function uploadFileService(documentParam: DocumentType,config: (e: ProgressEvent<EventTarget>) => void){
 
  return await request.post("/file/upload",documentParam, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
   });   
}