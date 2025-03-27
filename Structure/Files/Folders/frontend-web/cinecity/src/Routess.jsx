
import { Router, Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/Login and Register/Login'
import Signup from "./pages/Login and Register/Signup"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Movies from "./pages/Admin/Movies/Movies"
import Movie from "./pages/Movie/Movie"
import ProtectedRoute from "./components/Protected/ProtectedRoute"
import AdminLogin from "./pages/Admin/Login/AdminLogin"
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login and Register/Login';
import Signup from "./pages/Login and Register/Signup";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Movies from "./pages/Admin/Movies/Movies";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import PublicRoute from "./components/Protected/PublicRoute";
import AdminLogin from "./pages/Admin/Login/AdminLogin";
import SideBar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";

export default function Routess() {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<AdminLogin />} />
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Navbar />}>
                    <Route path="home" element={<Home />}></Route>
                    <Route path="movie" element = {<Movie />}></Route>
                    <Route path="home" element={<Home />} />
                </Route>
                <Route path="/admin/data" element={<SideBar />}>
                    <Route path="movies" element={<Movies />} />
                    <Route path="dashboard" element={<Dashboard/>}/>
                </Route>
            </Route>
        </Routes>
    );
}