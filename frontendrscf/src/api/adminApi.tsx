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

// return: Promise with AxiosResponse<UserType>
export function login(data:UserType):Promise<AxiosResponse<ReType>>{
  return request.post("/user/login",data)
}

// get user menu
// "/menu/getSomeMenu/<string:userId>"
export function getUserMenu(userID: string){
  return request.get("/menu/getSomeMenu/"+userID)
}

/* get user list */
export const getUserList = () =>
  // request<UserType>({
    // url: '/api/search/users?q=${searchName}',
    // method: 'get',
    request.post("/user/allUsers")
  // });


// login({name:"abc",password:"des"})
// .then(res=>{
//   res.data.
// })


export function addUser(userParam: UserType){
  return request.post("/user/register",userParam)
}
// export const AddUser = (userValue: UserType) =>
//   request<UserType>({
//     url: '/api/user/addUser?q=${userValue}',
//     method: 'post',
//   });