import React from 'react';
import {useAuth} from "../../contexts/authContext";
import { Route } from "react-router-dom"
import {Manufacturer} from "../../admin/views/manageView";
import ProductView from "../../product/components/productView";
import Order from "../../order/components/orderView";
import Document from '../../drmDocument/components/uploadFile';
import { useLocalStorage} from "../../hooks/useLocalStorage"

export default function PrivateRoute( {...rest}){

    const roleRoute = {
        "manufacturer": <Manufacturer/>,       
        "supplier": <Order/>,
        "distributer":<ProductView/>,
        "customer": <Order/>,
        "retailer": <Document/>,
        "undefined":<div>Loading..</div>    
    }

    const permissions = {
        admin: ["navigation", "usermgmt", "profile"],
        user: ["profile"],
        manager: ["usermgmt"]
    }

    const {currentUser} = useAuth() 
    const [userRole,setUserRole] = useLocalStorage("role", "")

    async function fetchRole(){
        if(currentUser){
            // await database.ref("users/" + currentUser.uid).child("role").get().then((snapshot:any) =>{
            //     if(snapshot.exists()){
            //         setUserRole(snapshot.val())
            //     }
            // })
        }
    }

    React.useEffect(()=>{
        fetchRole()
    },[currentUser,userRole])

    return (
        <Route
            {...rest}
            // path = ":userRole" element = roleRoute[userRole]      
        />
    )
}