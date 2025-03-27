import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";



export default function ProtectedRouteAdmin(){

    const navigate = useNavigate();
    const [role,setRole] = useState(null)

    useEffect(()=>{
        const checkRole = async(e) =>{
            try {
                const response = await fetch('http://localhost:8080/users/me',{
                    credentials:'include'
                })

                const userRole = await response.json();
                if(userRole.role === "ADMIN"){
                    setRole(true)
                }else{
                    setRole(false)
                }
            } catch (error) {
                console.log(error)
            }
        }

        checkRole();
    })

    if(role === null){
        return <div>Loading.....</div>;
    }

    return role ? <Outlet/> : <Navigate to="/home"/>
    
}