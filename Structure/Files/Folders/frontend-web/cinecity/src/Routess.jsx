import { Router,Routes, Route,Navigate } from "react-router-dom"
import Login from './pages/Login and Register/Login'
import Signup from "./pages/Login and Register/Signup"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Movies from "./pages/Admin/Movies/Movies"

export default function Routess(){
    return(
        <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/" element={<Navbar/>}>
                <Route index element={<Navigate to="login"/>}></Route>
                <Route path="home" element={<Home/>}></Route>
            </Route>
            <Route path="/admin/movies" element={<Movies/>}></Route>
        </Routes>
    )
}