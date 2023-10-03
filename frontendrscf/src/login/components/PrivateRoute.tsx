import React from 'react';
import {useAuth} from "../../contexts/authContext";
import {database} from "../../util/firebase";
import {Navigate, Route } from "react-router-dom"
import {Manufacturer} from "../../admin/components/manufacturer";
import {Product} from "../../product/components/product";
import {Order} from "../../order/components/order";
import Document from '../../document/components/uploadFile';
import { useLocalStorage} from "../../hooks/useLocalStorage"

export default function PrivateRoute( {...rest}){

    const roleRoute = {
        "manufacturer": <Manufacturer/>,       
        "supplier": <Order/>,
        "distributer":<Product/>,
        "customer": <Order/>,
        "retailer": <Document/>,
        "undefined":<div>Loading..</div>    
    }

    const {currentUser} = useAuth() 
    const [userRole,setUserRole] = useLocalStorage("role", " ")

    async function fetchRole(){
        if(currentUser){
        await database.ref("users/" + currentUser.uid).child("role").get().then((snapshot: ) =>{
            if(snapshot.exists()){
            setUserRole(snapshot.val())}
    })
}
    }

    React.useEffect(()=>{
        fetchRole()
    },[currentUser,userRole])
    return (
        <Route
            {...rest}
            render = {props => {
                if(window.ethereum){
                return currentUser ? roleRoute[userRole]: <Navigate to = "/login"/>}
        }
        }>    
        </Route>
    )
}