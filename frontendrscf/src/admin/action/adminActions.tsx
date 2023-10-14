
import { SET_MENU, SET_ROUTES, SET_TOKEN, SET_USER} from '../../util/constant';
import { getUserMenu, login as loginApi } from "../../api/adminApi";
import type {Dispatch} from 'redux'
import type { AxiosResponse } from 'axios';
import type { UserType, LoginResponseType} from '../../util/variableTypes';
import LazyLoad from '../../util/LazyLoad';

// log in api
// asynchronous login action
export function login(data:UserType,callback?:Function){

  // return a dispatch function with default paramter
  return (dispatch:Dispatch<any>) => {
    // run log in
    loginApi(data)
    //return parameter is AxiosResponse with <LoginResponseType>
    // LoginResponseType is AxiosResponse'data type
    // LoginResponseType is login return type; AxiosResponse is axios turn type
    .then((res:AxiosResponse<LoginResponseType>)=>{
      if(res.data !== undefined && res.data.code===200){
     
        // run local storage
        sessionStorage.setItem("token",res.data.token);
        sessionStorage.setItem("userInfo",JSON.stringify(res.data.user))
        // run reducer 
        dispatch({type:SET_TOKEN,payload:res.data.token})
        dispatch({type:SET_USER,payload:res.data.user})
        // navigate
        if(callback){callback()};
        // login success then get menus
        dispatch(getMenus())
      }
    }) 
  }
  
}
// menu type definition
interface MenuItemType {
  label:string
  key:string
  children?:Array<MenuItemType>
}

// api return menu data and type 
interface OriginMenuItemType {
  path:string
  name:string
  component?:string,
  children?:Array<OriginMenuItemType>
}
 
function formaterMenu(list:Array<OriginMenuItemType>):Array<MenuItemType>{
  //return data type temp
  var  temp:Array<MenuItemType>= [];
 
  list.forEach((element) => {
    var obj:MenuItemType= {key:element.path,label:element.name}
    if(element.children){       
      obj.children = formaterMenu(element.children)  
    }
    temp.push(obj);
  });
  return temp;
}

interface RouteItemType {
  path:string
  // element:ReactNode
  element:any
}

// format route. send parameter is OriginMenuItemType, return parameter is RouteItemType
function foramterRoutes(list:Array<OriginMenuItemType>):Array<RouteItemType>{
  // return array
  var temp:Array<RouteItemType> = [];
 
  list.forEach(element=>{
    // if exist component
    if(element.component){
      var obj:RouteItemType = {
        path: element.path.slice(7),
        // slice4  romove .vue char
        element: LazyLoad(element.component.slice(0,-4))
      };
      // add components
      temp.push(obj);    
    }else{
      // children exist
      if(element.children){
        // recursion
         var result = foramterRoutes(element.children);
         temp = temp.concat(result);
      }
    }
    
  })
  return temp;
}
export function getMenus(){
  return (dispath:Dispatch)=>{
    getUserMenu()
    .then(res=>{
      console.log(res.data.list,"get menu");
      // run SET_MENU reducer and update state
      dispath({type:SET_MENU,payload:formaterMenu(res.data.list)})
      // update routes in redux
      dispath({type:SET_ROUTES,payload:foramterRoutes(res.data.list)})
    })
  }
}