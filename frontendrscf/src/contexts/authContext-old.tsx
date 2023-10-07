import React, {ReactNode, useContext, useEffect, useState } from 'react';
import {auth, database} from "../util/firebase";
import type { UserType} from '../util/variableTypes';
import { string } from 'yup';

interface Props {
    children: JSX.Element
  }

interface loginValue {
    currentUser : UserType | undefined,
    signup : (email: any, password: any) => {},
    login : (email: any, password: any) => {},
    logout : () => {},
    writeData : (userName:string, role:string, id:string, address:string) => {},
    updatemail : (email:string) => void,
    updatePass : (pass:string) => void,
    updateRoleInBase : (role:string, id:string) => {},
    updateUserInBase : (userName:string, id:string, address:string) => {},
    updateAddressInBase: (userName:string, caddress:string, address:string, id:string) => {},
    // addressToName : (address:string)  => Promise<string>
    // addressToName : (address:string)  => {nameaddress:string},
    addressToName : (address:string)  => {},
}
const authContext = React.createContext<loginValue>({} as loginValue);

export function useAuth(){
    return useContext(authContext)
}

//This is OK!
//export function AuthProvider({children}: {children:ReactNode}) {
export function AuthProvider({children}: Props) {

    const [currentUser,setCurrentUser] = useState<UserType>();
    const [loading,setLoading] = useState(true);
 
    function signup( email:string, password:string){
        return auth.createUserWithEmailAndPassword(email,password);
    }

    function login( email:string, password:string){
        return auth.signInWithEmailAndPassword(email,password);
    }

    function logout() {
        return auth.signOut()
    }

    async function writeData(userName:string, role:string, id:string, address:string) {

        await database.ref("owners/" + address).set({
            username:userName
        })
        return database.ref( "users/" + id).set({
            username: userName,
            role: role,
            waddress: address
        })
    }

    function updateRoleInBase(role:string, id:string) {
        return database.ref("users/" + id).update({
            role:role,
        })
    }

    async function updateUserInBase(userName:string, id:string, address:string) {

    await database.ref( "owners/" + address).set({
            username:userName
        }) 
        return database.ref("users/" + id).update({
            username:userName
        })
    }

    async function updateAddressInBase(userName:string, caddress:string, address:string, id:string) {

        await database.ref("owners/" + caddress).remove()
        if(userName){
        await database.ref("owners/" + address).set({
            username: userName
        }) 
    }
        return database.ref("users/" + id).update({
           waddress:address
        }) 

    }

    async function addressToName(address:string){
        let name =""
        await database.ref("owners/" + address).child("username").get().then((snapshot: { exists: () => any; val: () => any; }) =>{
            if(snapshot.exists()){
            name = snapshot.val()}
        else {
            name = address
        }})
        return  Promise<string>
        //return {nameaddress:name}
    }

    function updatemail(emailStr: string) {
        if(currentUser != undefined){
           // setCurrentUser((prev:UserType|undefined) => ({prev}));
            setCurrentUser({ userName:currentUser.userName, 
                userPassword : currentUser.userPassword,
                waddress : currentUser.waddress,
                uid : currentUser.uid,
                role: currentUser.role,
                userEmail: emailStr});
        }
    }
   function updatePass(pass:string) {
        if(currentUser != undefined){
            setCurrentUser({ userName:currentUser.userName, 
                userPassword :  pass,
                waddress : currentUser.waddress,
                uid : currentUser.uid,
                role: currentUser.role,
                userEmail: currentUser.userEmail});
        }
   }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( (user: UserType) => {
            setCurrentUser(user)
            setLoading(false)
        } )
        return unsubscribe
    },[])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        writeData,
        updatemail,
        updatePass,
        updateRoleInBase,
        updateUserInBase,
        updateAddressInBase,
        addressToName,
    }
    return(<authContext.Provider value = {value}>
        {loading?<span>Loading...</span>:children}
    </authContext.Provider>)
}