import { Router,Routes, Route,Navigate } from "react-router-dom"
import Login from './pages/Login and Register/Login'
import Signup from "./pages/Login and Register/Signup"

export default function Routess(){
    return(
        <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
    )
}