import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenError } from '../util/authError'
import { signOut } from '../contexts/authContext'
import { SERVER_BASE_URL } from "../config/sysConfig";

export function setupAPIClient(ctx = undefined){
  let cookies = parseCookies(ctx);

  const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_URL,
    baseURL: SERVER_BASE_URL,
    headers:{
      Authorization: `Bearer ${cookies['@barber.token']}`
    }
  })

  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if(error.response?.status === 401){
      if(typeof window !== undefined){
        signOut();
    
      }else{
        return Promise.reject(new AuthTokenError())
      }
    }

    return Promise.reject(error);

  })


  return api;
}