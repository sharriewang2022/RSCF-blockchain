import request from "../util/request";
import { AxiosResponse } from 'axios';
import { UserType} from "../util/variableTypes";

// log in api
interface ReType{
  code:number
  msg?:string
  token:string,
  user:any
}

// return type is Promise with AxiosResponse<ReType>
export function login(data:UserType):Promise<AxiosResponse<ReType>>{
  // result
  return request.post("/api/login",data)
}

// get user menu
export function getUserMenu(){
  return request.get("/api/yp/user_permission")
}

/* get user list */
export const getUserList = (searchName: string) =>
  request<UserType>({
    url: `/api/search/users?q=${searchName}`,
    method: 'get',
  });
// login({name:"abc",password:"des"})
// .then(res=>{
//   res.data.
// })