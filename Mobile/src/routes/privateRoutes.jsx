import { useContext } from "react"
import { AuthContext } from "../context/authContext"

export const PrivateRoutes = () => {
    const{segned} = useContext(AuthContext)

    return segned ? <Outlet/> : <Navigare to= "Signin"/>
}