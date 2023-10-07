import { createContext, ReactNode, useState, useEffect } from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import {useNavigate} from "react-router-dom"
import { api } from '../api/authApiClient'
import { UserType } from '../util/variableTypes';

interface AuthContextData {
  currentUser: UserType | undefined | null;
  isAuthenticated: boolean;
  login: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUpProps) => Promise<void>;
  logoutUser: () => Promise<void>;
  writeData : (userName:string, role:string, id:string, address:string) => Promise<void>;
  updatemail : (email:string) => void;
  updatePass : (pass:string) => void;
  updateRoleInBase : (role:string, id:string) => void;
  updateUserInBase : (userName:string, id:string, address:string) => Promise<void>;
  updateAddressInBase: (userName:string, caddress:string, address:string, id:string) => Promise<void>;
  addressToName:(address: string) => Promise<void>;  
}

// interface UserProps {
//   id: string;
//   name: string;
//   email: string;
//   endereco: string | null;
//   subscriptions?: SubscriptionProps | null;
// }

interface SubscriptionProps {
  id: string;
  status: string;
}

type AuthProviderProps = {
  children: ReactNode;
} 

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps{
  name: string;
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextData)


export function signOut(){
  console.log("ERORR LOGOUT");
  try{
    destroyCookie(null, '@barber.token', { path: '/' })
    useNavigate.call('/login');
  }catch(err){
    console.log("Error ao sair")
  }
}

export function AuthProvider({ children }: AuthProviderProps){
  const [currentUser, setCurrentUser] = useState<UserType>()
  const isAuthenticated = !!currentUser;

  useEffect(() => {
    const { '@barber.token': token } = parseCookies();

    if(token){
      api.get('/me').then(response => {
        const { userName, userPassword, role, userEmail, uid, waddress} = response.data;
        setCurrentUser({    
          userName,
          userPassword,
          role,
          userEmail,
          uid,
          waddress
        })

      })
      .catch(()=> {
        signOut()
      })

    }
  }, [])

  async function login({ email, password }: SignInProps){
    try{
      const response = await api.post("/session", {
        email,
        password,
      })

      const {userName, userPassword, role, userEmail, uid, waddress, token} = response.data;

      setCookie(undefined, '@barber.token', token, {
        maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mês
        path: '/'
      })

      setCurrentUser({
        userName,
        userPassword,
        role,
        userEmail,
        uid,
        waddress
      })

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      useNavigate.call('/dashboard')

    }catch(err){
      console.log("ERRO AO ENTRAR", err)
    }
  }


  async function signUp({ name, email, password}: SignUpProps){
    try{
      const response = await api.post('/users', {
        name,
        email,
        password
      })

      useNavigate.call('/login')

    }catch(err){
      console.log(err);
    }
  }


  async function logoutUser(){
    try{
      destroyCookie(null, '@barber.token', { path: '/' })
      useNavigate.call('/login')
      setCurrentUser(undefined);
    }catch(err){
      console.log("logoutUser error", err)
    }
}

async function writeData(userName:string, role:string, id:string, address:string) {

    // await database.ref("owners/" + address).set({
    //     username:userName
    // })
    // return database.ref( "users/" + id).set({
    //     username: userName,
    //     role: role,
    //     waddress: address
    // })
}

function updateRoleInBase(role:string, id:string) {
    // return database.ref("users/" + id).update({
    //     role:role,
    // })
}

async function updateUserInBase(userName:string, id:string, address:string) {

// await database.ref( "owners/" + address).set({
//         username:userName
//     }) 
//     return database.ref("users/" + id).update({
//         username:userName
//     })
}

async function updateAddressInBase(userName:string, caddress:string, address:string, id:string) {

//     await database.ref("owners/" + caddress).remove()
//     if(userName){
//     await database.ref("owners/" + address).set({
//         username: userName
//     }) 
// }
//     return database.ref("users/" + id).update({
//        waddress:address
//     }) 

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

async function addressToName(address:string){
    // let name =""
    // await database.ref("owners/" + address).child("username").get().then((snapshot: { exists: () => any; val: () => any; }) =>{
    //     if(snapshot.exists()){
    //     name = snapshot.val()}
    // else {
    //     name = address
    // }})
 
    try{
        const response = await api.post("/addressToName", {
          address,
        })
  
        const {userName, userPassword, role, userEmail, uid, waddress, token} = response.data;
  
        setCookie(undefined, '@barber.token', token, {
          maxAge: 60 * 60 * 24 * 30, // Expirar em 1 
          path: '/'
        })
  
        setCurrentUser({
          userName,
          userPassword,
          role,
          userEmail,
          uid,
          waddress
        })
  
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }catch(err){
        console.log("addressToName error", err) 
    }
}    

return(
    <AuthContext.Provider 
        value={{ 
            currentUser, 
            isAuthenticated, 
            login,
            signUp,
            logoutUser, 
            addressToName,  
            writeData,
            updatemail,
            updatePass,
            updateRoleInBase,
            updateUserInBase,
            updateAddressInBase,

        }}>
      {children}
    </AuthContext.Provider>
  )
}