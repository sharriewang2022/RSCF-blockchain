import  React from "react";
import { SET_MENU, SET_ROUTES, SET_TOKEN, SET_USER} from '../../util/constant';
import { getUserMenu, login as loginApi } from "../../api/adminApi";
import type {Dispatch} from 'redux'
import type { AxiosResponse } from 'axios';
import type { UserType, LoginResponseType} from '../../util/variableTypes';
import LazyLoad from '../../util/LazyLoad';
import { 
  UserOutlined,
  LaptopOutlined, 
  VideoCameraOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  ShopOutlined,
  CloudOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

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
      if(res.data !== undefined ){
        if(res.data.code===200){     
          // run local storage
          sessionStorage.setItem("token",res.data.token);
          sessionStorage.setItem("userInfo",JSON.stringify(res.data.loginInfo));
          sessionStorage.setItem("userName", res.data.loginInfo.userName);
          // run reducer 
          dispatch({type:SET_TOKEN,payload:res.data.token})
          dispatch({type:SET_USER,payload:res.data.loginInfo})
          // navigate
          if(callback){
            callback()
          };
          // login success then get menus
          dispatch(getMenus(data.userName))
        }else{
          console.log("The user information is" + res.data.msg);  
        }       
      }else{
        console.log("The user could not login");
      }
    }) 
  }
  
}
// menu type definition
// interface MenuItemType {
//   label:string
//   key:string
//   icon?: React.ReactNode
//   children?:Array<MenuItemType>
// }

// menu type definition
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

// api return menu data and type 
interface OriginMenuItemType {
  path:string
  name:string
  icon?: React.ReactNode
  component?:string
  children?:Array<OriginMenuItemType>
}
 
function formaterMenu(list:Array<OriginMenuItemType>):Array<MenuItem>{
  //return data type temp
  var temp:Array<MenuItem>= [];
  var menuIconArray = [UserOutlined, AppstoreOutlined, DesktopOutlined, 
    ShopOutlined, UploadOutlined, CloudOutlined,
    LaptopOutlined, ContainerOutlined ]

  list.forEach((element, index) => {
    // var item:MenuItem= {key:element.path,label:element.name,icon:React.createElement(menuIconArray[index])}
    if(element.children){        
      var item:MenuItem= getItem(
        element.name,
        element.path,
        React.createElement(menuIconArray[index]),
        formaterMenu(element.children)  
      ) 
      temp.push(item);
    }else{
      var item:MenuItem= getItem(
        element.name,
        element.path,
        React.createElement(menuIconArray[index])        
      ) 
      temp.push(item);
    }
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
 
  list.forEach(element =>{
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
export function getMenus(userID: string){
  return (dispath:Dispatch)=>{
    getUserMenu(userID)
    .then(res=>{
      if(res.data!=undefined){
        console.log(res.data.list,"get menu");
        // run SET_MENU reducer and update state and then change page
        dispath({type:SET_MENU,payload:formaterMenu(res.data.list)})
        // update routes in redux
        dispath({type:SET_ROUTES,payload:foramterRoutes(res.data.list)})
      }else{
        console.log("The system can not get menus");
      }
    })
  }
}