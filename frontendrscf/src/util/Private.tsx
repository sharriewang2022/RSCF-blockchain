import { Navigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import {ReactNode,FC} from 'react'

interface Iprops{
  children?:ReactNode
}

// permission control function
// define a funciton Private is FC type, and instruction generics is Iprops
// props is parameter from father component，chilren is Nested Type
// interface FC<P> {props:P}
// FC uses real type IProps
const Private:FC<Iprops>=(props)=> {
   var token= sessionStorage.getItem("token");
  //  useLocation creates a location object, including path property
   const location = useLocation();
   if(token){
    return <>{props.children}</>
   }else{
    // fail，go to redirect url
    // Navigate component is from react-router-dom for redirection and link
    return <Navigate to={'/?redirect='+location.pathname}></Navigate>
   }
}

export default Private;