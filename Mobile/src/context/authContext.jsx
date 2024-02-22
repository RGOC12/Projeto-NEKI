import { createContext, useEffect, useState } from "react";
import {api} from '../services/api'
export const AuthContext = createContext()

export const AutheProvider = ({Clidren}) => {
    const [user,setUser] = useState(null);

    useEffect(() => {
        const loadingStorageData = async () => {
            const storageUser = localStorage.setItem("@Auth:user",user);
            const storageToken = localStorage.setItem("@Auth:token",token);
    
            if(storageUser && storageToken){
                setUser(storageUser) 
            }
        }
        loadingStorageData();
    },[])


    const signIn = async ({login, password}) => {
        const response = await api.post(/auth/login,{
            login,
            password
        })
        if(response.data.error){
            alert(response.data.error)
        }else{
            setUser(response.data)
            api.defaults.headers.common[
                "Authorization"
            ] = `Beara ${response.data.token}`
            localStorage.setItem("@Auth:token",token)
            localStorage.setItem("@Auth:user",user)
        }
        
    }
    return(
        <AuthContext.Provider value={{
            user,
            segned : !! user,
            signIn,
        }}>
            {Clidren}
        </AuthContext.Provider>
    )
}