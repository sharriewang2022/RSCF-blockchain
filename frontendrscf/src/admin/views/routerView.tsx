import { useRoutes } from 'react-router-dom'
import baseRouter from '../router/baseRouter'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/adminStore";
  

function RouterView() {

  const routes = useSelector((state:RootState)=>state.auth.routes)
  //if routes change, update baseRouter then change all the routes
  useEffect(()=>{
    baseRouter[1].children =routes
  },[routes])
  // create routes
  const element = useRoutes(baseRouter);
  return ( <>{element}</> );
}
 
export default RouterView;