import { Router, Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/Login and Register/Login'
import Signup from "./pages/Login and Register/Signup"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Movies from "./pages/Admin/Movies/Movies"
import ProtectedRoute from "./components/Protected/ProtectedRoute"
import AdminLogin from "./pages/Admin/Login/AdminLogin"

export default function Routess() {
    return (
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />} />
            <Route path='/admin' element={<AdminLogin/>}/>
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Navbar />}>
                    <Route path="home" element={<Home />}></Route>
                </Route>
            </Route>
            <Route path="/admin/movies" element={<Movies />}></Route>
        </Routes>
    )
}